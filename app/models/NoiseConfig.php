<?php

class NoiseConfig extends \Eloquent 
{
  protected $table = 'noise_configs';
  public function getIdAttribute ($value)
  {
    return (int) $value;
  }

  public function getIsActiveAttribute ($value)
  {
    return (boolean) $value;
  }

  // Make new temperature model
  public static function make($input, $device_id)
  {
    $NoiseConfig = new \NoiseConfig();
    $NoiseConfig->device_id  = $device_id;
    $NoiseConfig->threshold  = $input->threshold;
    $NoiseConfig->cycle_time = $input->cycle_time;
    $NoiseConfig->created_at = date('Y-m-d H:i:s', strtotime('now'));
    $NoiseConfig->updated_at = date('Y-m-d H:i:s', strtotime('now'));
    $NoiseConfig->save();

    return $NoiseConfig;
  }

  // Make new temperature model
  public static function amend($id, $input)
  {
    $NoiseConfig = \NoiseConfig::find ($id);
    $NoiseConfig->threshold  = $input->threshold;
    $NoiseConfig->cycle_time = $input->cycle_time;
    $NoiseConfig->updated_at = date('Y-m-d H:i:s', strtotime('now'));
    $NoiseConfig->save();

    return $NoiseConfig;
  }

}
