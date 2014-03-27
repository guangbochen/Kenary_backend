<?php

class Temperature extends \Eloquent 
{
  public function getIdAttribute ($value)
  {
    return (int) $value;
  }

  public function getIsActiveAttribute ($value)
  {
    return (boolean) $value;
  }

  public function alarms()
  {
    return $this->hasMany('TempAlarm');
  }

  // Make new temperature model
  public static function make($temperature, $input)
  {
    $temperature->temperature_c   = $input->temperature_c;
    $temperature->minus_threshold = $input->minus_threshold;
    $temperature->plus_threshold  = $input->plus_threshold;
    $temperature->isalarm         = $input->isalarm;
    $temperature->created_at      = date('Y-m-d H:i:s', strtotime('now'));
    $temperature->updated_at      = date('Y-m-d H:i:s', strtotime('now'));
    $temperature->save();

    return $temperature;
  }

  // Make new temperature model
  public static function amend($id, $input)
  {
    $temperature = Temperature::find ($id);
    $temperature->temperature_c   = $input->temperature_c;
    $temperature->minus_threshold = $input->minus_threshold;
    $temperature->plus_threshold  = $input->plus_threshold;
    $temperature->isalarm         = $input->isalarm;
    $temperature->updated_at      = date('Y-m-d H:i:s', strtotime('now'));
    $temperature->save();

    return $temperature;
  }
 
}
