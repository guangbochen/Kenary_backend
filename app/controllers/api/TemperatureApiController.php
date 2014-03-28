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
      return \Temperature::find($id);
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 500);
    }
  }

  public function seed()
  {
    $input = array( 
      'temperature_c' => 62,
      'minus_threshold' => -10,
      'plus_threshold' => 40,
      'is_alarm' => 1,
      'is_active' => 1,
      'description' => ' Warning... needs fire assist immediately',
      'snapshot_url' => "http://raspberrypi.dev/uploads/snapshot3.jpg",
    );

    $input = json_decode(json_encode($input));
    return \Temperature::make(new \Temperature(), $input);
  }

}

