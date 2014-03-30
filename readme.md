## UTS Kenari backend 



Root API: <a href="http://kenari-printee.rhcloud.com/api">kenari-printee.rhcloud.com/api</a>

###1.0 Temperatures(GET)

/temperatures : get all the temperatures
        
/temperatures/id : get a specific temperature by id

###2.0 Temperatures(POST)

  <h5>2.1 post non-alarm temperature</h5>
  
      {
        temperature_c: 22,
        minus_threshold: -10,
        plus_threshold: 40,
        is_alarm: 0
      }

  <h5>2.2 post alarm temperature</h5>
  
      {
        temperature_c: -24,
        minus_threshold: -10,
        plus_threshold: 40,
        is_alarm: 1,
        description: "The temp. is lower than minimun temperature threshold",
        snapshot_url: "http://i3.mirror.co.uk/incoming/article1552684.ece/ALTERNATES/s2197/Warehouse+fire",
        is_active: 1
      }
      
      ## Description:
      temperature_c: int temperature calculated with celsius (°C),
      minus_threshold: int value,
      plus_threshold:  int value,
      is_alarm: always 1,
      description: string (not requried, can be empty string),
      snapshot_url: string (hash image into base64),
      is_active: 1 indicates alarm is actived, 0 indicates alarm is not actived,
      
      
      
      
