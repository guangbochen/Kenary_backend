<?php

class Device extends \Eloquent 
{
  protected $table = 'devices';

  public function getIdAttribute ($value)
  {
    return (int) $value;
  }

  public function getIsActiveAttribute ($value)
  {
    return (boolean) $value;
  }

  public function tempConfig()
  {
    return $this->hasOne('TempConfig');
  }

  public function noiseConfig()
  {
    return $this->hasOne('NoiseConfig');
  }

  // Make new device model
  public static function make($input)
  {
    $device = new Device();
    $device->device_id      = $input->device_id;
    $device->address        = $input->address;
    $device->suburb         = $input->suburb;
    $device->city           = $input->city;
    $device->state          = $input->state;
    $device->country        = $input->country;
    $device->position       = $input->position;
    $device->postcode       = (int)$input->postcode;
    $device->manager_email  = $input->manager_email;
    $device->contact_number = $input->contact_number;
    $device->created_at     = date('Y-m-d H:i:s', strtotime('now'));
    $device->updated_at     = date('Y-m-d H:i:s', strtotime('now'));
    $device->save();

    \TempConfig::make($input->temp_config, $device->id);
    \NoiseConfig::make($input->noise_config, $device->id);

    return $device;
  }

  // Make new device model
  public static function amend($id, $input)
  {
    $device = Device::find ($id);
    $device->device_id      = $input->device_id;
    $device->address        = $input->address;
    $device->suburb         = $input->suburb;
    $device->city           = $input->city;
    $device->state          = $input->state;
    $device->country        = $input->country;
    $device->position       = $input->position;
    $device->postcode       = (int)$input->postcode;
    $device->manager_email  = $input->manager_email;
    $device->contact_number = $input->contact_number;
    $device->updated_at     = date('Y-m-d H:i:s', strtotime('now'));

    //update associated models
    \TempConfig::amend($input->temp_config->id, $input->temp_config);
    \NoiseConfig::amend($input->noise_config->id, $input->noise_config);

    $device->save();
    return $device;
  }

}
