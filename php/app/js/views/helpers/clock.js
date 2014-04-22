
define ([

    'flipclock', 

], function (Flipclock) {

  //set clock at the title
  var dt = new Date();
  var time = (dt.getHours()*60 +  dt.getMinutes())*60 + dt.getSeconds();
  if(time>43200) time = time - 43200;
  var clock = new FlipClock($('.clock'), time, {
  });

});

