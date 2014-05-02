<?php
namespace api;
use Input;
use View;
use JsonHandler;

class NoisesConfigApiController extends \Controller
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
      return \NoiseConfig::all();
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
      return \NoiseConfig::make($input);
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 404);
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
      return \NoiseConfig::find($id);
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 500);
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

      return \NoiseConfig::amend($id, $input);
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
