<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');


//create a group of routes that will belong to APIv1
Route::group(array('prefix' => 'api'), function()
{
  Route::get ('/', 'api\IndexApiController@index');

  Route::get ('temperatures/seed', 'api\TemperatureApiController@seed');

  //CRDU methods for devices
  Route::resource('devices', 'api\DevicesApiController');

  //CRDU methods for temperatures configurations
  Route::resource('temperatures/config', 'api\TempConfigApiController');

  //CRDU methods for temperatures alarms
  Route::resource('temperatures/alarms', 'api\TempAlarmsApiController');

  //CRDU methods for temperatures 
  Route::resource('temperatures', 'api\TemperatureApiController');

  //CRDU methods for temperatures configurations
  Route::resource('noises/config', 'api\NoisesConfigApiController');
});

