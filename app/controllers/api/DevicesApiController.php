<?php
namespace api;
use Input;
use View;
use JsonHandler;
use Device;

class DevicesApiController extends \Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
    try
    {
      return Device::with('tempConfig')->with('noiseConfig')->get();
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 500);
    }
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
    try
    {
      return Device::with('tempConfig')->with('noiseConfig')->where('id', '=', $id)->first();
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
    try
    {
      $input = json_decode(json_encode(Input::all()));
      return Device::make($input);
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 404);
    }
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
    try
    {
      $input = json_decode(json_encode(Input::all()));
      $pubnub = new \Pubnub;
      $channel = 'kenari-config';
      $pubnub::sendMessage(Input::all(), $channel);

      return \Device::amend($id, $input);
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 404);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return Response
   */
  public function destroy($id)
  {
    //
  }
}

