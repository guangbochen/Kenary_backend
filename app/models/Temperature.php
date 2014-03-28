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

  public function alarm()
  {
    return $this->hasOne('TempAlarm');
  }

  // Make new temperature model
  public static function make($temperature, $input)
  {
    $temperature->temperature_c   = $input->temperature_c;
    $temperature->minus_threshold = $input->minus_threshold;
    $temperature->plus_threshold  = $input->plus_threshold;
    $temperature->is_alarm         = $input->is_alarm;
    $temperature->created_at      = date('Y-m-d H:i:s', strtotime('now'));
    $temperature->updated_at      = date('Y-m-d H:i:s', strtotime('now'));
    $temperature->save();

    //if is alarm make new temp alarm
    if($input->is_alarm === 1)
    {
      \TempAlarm::make($input, $temperature->id);
    }

    return $temperature;
  }

  // Make new temperature model
  public static function amend($id, $input)
  {
    $temperature = Temperature::find ($id);
    $temperature->temperature_c   = $input->temperature_c;
    $temperature->minus_threshold = $input->minus_threshold;
    $temperature->plus_threshold  = $input->plus_threshold;
    $temperature->is_alarm         = $input->is_alarm;
    $temperature->updated_at      = date('Y-m-d H:i:s', strtotime('now'));
    $temperature->save();

    return $temperature;
  }
 
}
