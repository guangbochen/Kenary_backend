<?php
class Pubnub
{

  protected static $pubnub;

  /* constructor */
  public function __construct()
  {
    //initlise PubNub Push API
    self::$pubnub = new \Pubnub\Pubnub(
      "pub-c-8021207d-c906-4f21-ac84-7d5773c9255b",  ## PUBLISH_KEY
      "sub-c-077f7902-66ad-11e3-b1d4-02ee2ddab7fe",  ## SUBSCRIBE_KEY
      "sec-c-Y2RjNDExZWQtMTk1YS00M2I2LWFlYmUtMzg3NjEyMjEwYTRi",  ## SECRET_KEY
      false   ## SSL_ON?
    );
  }

  static function sendMessage ($message)
  {
    //send broadcast notification
    self::$pubnub->publish(array(
      'channel' => 'kenari', ## REQUIRED Channel to Send
      'message' => $message   ## REQUIRED Notification String/Array
    ));
  }
}
