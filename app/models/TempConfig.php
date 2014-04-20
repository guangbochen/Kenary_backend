<?php

class TempConfig extends \Eloquent 
{
  public function getIdAttribute ($value)
  {
    return (int) $value;
  }

  public function getIsActiveAttribute ($value)
  {
    return (boolean) $value;
  }

  // Make new temperature model
  public static function make($tempConfig, $input)
  {
    $tempConfig->max_threshold = $input->max_threshold;
    $tempConfig->min_threshold = $input->min_threshold;
    $tempConfig->cycle_time    = $input->cycle_time;
    $tempConfig->created_at    = date('Y-m-d H:i:s', strtotime('now'));
    $tempConfig->updated_at    = date('Y-m-d H:i:s', strtotime('now'));
    $tempConfig->save();

    return $tempConfig;
  }

  // Make new temperature model
  public static function amend($id, $input)
  {
    $tempConfig = TempConfig::find ($id);
    $tempConfig->max_threshold = $input->max_threshold;
    $tempConfig->min_threshold = $input->min_threshold;
    $tempConfig->cycle_time    = $input->cycle_time;
    $tempConfig->updated_at    = date('Y-m-d H:i:s', strtotime('now'));
    $tempConfig->save();

    return $tempConfig;
  }

}
