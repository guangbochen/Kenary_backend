<?php
namespace api;
use Input;
use View;
use JsonHandler;

class TemperatureApiController extends \Controller
{
  // GET: temperatures
  public function index()
  {
    try
    {
      return \Temperature::with('alarm')->get();
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 500);
    }
  }

  // GET api/temperatures/{id}
  public function show($id)
  {
    try
    {
      /* return \Temperature::find($id); */
      return \Temperature::with('alarm')->where('id', '=', $id)->get();
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 500);
    }
  }

	/**
	 * Store a newly created resource in storage.
   *
   * @return Response
   */
  public function store()
  {
    $input = json_decode(json_encode(Input::all()));
    //if it is alarm then get image value of base 64
    if( (int)$input->is_alarm === 1 )
    {
      $input->image = preg_replace('#^data:image/[^;]+;base64,#', '', Input::get ('image'));
    }
    $pubnub = new \Pubnub;
    $channel = 'kenari';
    $pubnub::sendMessage(Input::all(), $channel );
    return \Temperature::make(new \Temperature(), $input);
  }

  public function seed()
  {
    /* $temp = rand(-20, 70); */
    $temp = rand(-30, -50);
    $input = array();

    if($temp<40 && $temp > -10){
      $input = array( 
        'temperature_c' => $temp,
        'min_threshold' => -10,
        'max_threshold' => 40,
        'is_alarm' => 0,
      );
    }
    else{
      $input = array( 
        'temperature_c' => $temp,
        'min_threshold' => -10,
        'max_threshold' => 40,
        'is_alarm' => 1,
        'is_active' => 1,
        'description' => 'Warning... needs temperature assist immediately',
        'image' => '',
      );
    }

    $pubnub = new \Pubnub;
    $channel = 'kenari';
    $pubnub::sendMessage($input, $channel);
    $input = json_decode(json_encode($input));
    if( (int)$input->is_alarm === 1 )
    {
      $input->image = preg_replace('#^data:image/[^;]+;base64,#', '', $input->image);
    }
    return \Temperature::make(new \Temperature(), $input);
  }

}

