
define ([

    'pubnub_api', 

], function () {

  //initalise pubnub
  return pubnub = PUBNUB.init({
    subscribe_key : 'sub-c-077f7902-66ad-11e3-b1d4-02ee2ddab7fe',
    publish_key: 'pub-c-8021207d-c906-4f21-ac84-7d5773c9255b'
  });

});

