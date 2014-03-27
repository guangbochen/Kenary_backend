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
      return \Temperature::all();
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
}

