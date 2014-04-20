## UTS Kenari backend 



Root API: <a href="http://kenari-printee.rhcloud.com/api">kenari-printee.rhcloud.com/api</a>

###1.0 Temperatures(GET)

/temperatures : get all the temperatures
        
/temperatures/id : get a specific temperature by id

###2.0 Temperatures(POST)

  <h5>2.1 post non-alarm temperature</h5>
  
      {
        temperature_c: 22,
        max_threshold: 40,
        min_threshold: -10,
        is_alarm: 0
      }

  <h5>2.2 post alarm temperature</h5>
  
      {
        temperature_c: -24,
        max_threshold: 40,
        min_threshold: -10,
        is_alarm: 1,
        description: "The temp. is lower than minimun temperature threshold",
        snapshot_url: "http://i3.mirror.co.uk/incoming/article1552684.ece/ALTERNATES/s2197/Warehouse+fire",
        is_active: 1
      }
      
      ## Description:
      temperature_c: int temperature calculated with celsius (°C),
      max_threshold:  int value,
      min_threshold: int value,
      is_alarm: always 1,
      description: string (not requried, can be empty string),
      snapshot_url: string (hash image into base64),
      is_active: 1 indicates alarm is actived, 0 indicates alarm is not actived,
      
###3.0 Temperature configurations

  <h5>3.1 configurations api</h5>
      /api/temperatures/config/1 - call the url to get temperature configuration
      #cycle_time(int), indicates how often the Kenari will send data to the server.

  <h5>3.2 Pubub settings</h5>
      Channel: kenari-config
      subscribe_key : 'sub-c-077f7902-66ad-11e3-b1d4-02ee2ddab7fe',
      publish_key: 'pub-c-8021207d-c906-4f21-ac84-7d5773c9255b'




