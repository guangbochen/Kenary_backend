<?php

class TempAlarm extends \Eloquent {

  public function temperature()
  {
    return $this->belongsTo('Temperature');
  }

  // Make new temperature alarm
  public static function make( $input, $temperatureId )
  {
    $tempAlarm = new \TempAlarm();
    $tempAlarm->temperature_id  = $temperatureId;
    $tempAlarm->temperature_c   = $input->temperature_c;
    $tempAlarm->minus_threshold = $input->minus_threshold;
    $tempAlarm->plus_threshold  = $input->plus_threshold;
    $tempAlarm->description     = $input->description;
    $tempAlarm->snapshot_url    = $input->snapshot_url;
    $tempAlarm->is_active       = $input->is_active;
    $tempAlarm->created_at      = date( 'Y-m-d H:i:s', strtotime( 'now' ) );
    $tempAlarm->updated_at      = date( 'Y-m-d H:i:s', strtotime( 'now' ) );
    $tempAlarm->save();

    return $tempAlarm;
  }

  // Update a temperature alarm
  public static function amend( $input )
  {
    $tempAlarm = TempAlarm::find( $input->id );

    $tempAlarm->description = $input->description;
    $tempAlarm->is_active   = $input->is_active;
    $tempAlarm->is_solved   = $input->is_solved;
    $tempAlarm->updated_at  = date( 'Y-m-d H:i:s', strtotime( 'now' ) );
    $tempAlarm->save();

    return $tempAlarm;
  }
}
