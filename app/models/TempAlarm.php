<?php

class TempAlarm extends \Eloquent {

  public function temperature()
  {
    return $this->belongsTo('Temperature');
  }
}
