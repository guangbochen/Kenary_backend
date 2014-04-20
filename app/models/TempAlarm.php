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

    //set the restaurant file dir
    $lastID = TempAlarm::orderBy( 'id', 'desc' )->firstOrFail();
    $uploadDir = 'uploads/' . ($lastID->id + 1) ;

    if ( !is_null ( $input->image ) && base64_decode ( $input->image, TRUE ) )
    {
      // Upload image
      $uploadImage = \FileHandler::upload ($uploadDir, $input->image, 'jpg');
      // asset the upload image to retrieve the proper image path
      $tempAlarm->image = asset ($uploadImage);
    } 

    $tempAlarm->temperature_id = $temperatureId;
    $tempAlarm->temperature_c  = $input->temperature_c;
    $tempAlarm->min_threshold  = $input->min_threshold;
    $tempAlarm->max_threshold  = $input->max_threshold;
    $tempAlarm->description    = $input->description;
    $tempAlarm->is_active      = $input->is_active;
    $tempAlarm->created_at     = date( 'Y-m-d H:i:s', strtotime( 'now' ) );
    $tempAlarm->updated_at     = date( 'Y-m-d H:i:s', strtotime( 'now' ) );
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
