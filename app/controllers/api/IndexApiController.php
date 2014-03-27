<?php
namespace api;
use Input;
use View;
use JsonHandler;

class IndexApiController extends \Controller
{

  // GET: 
  public function index()
  {
    try
    {
      return JsonHandler::raiseMessage ('UTS Raspberry Pi Api is healthy', 200);
    }
    catch (Exception $e)
    {
      return JsonHandler::raiseError ($e->getMessage(), 500);
    }
  }
}

