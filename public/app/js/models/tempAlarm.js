
define ([
    'backbone',
    'common',

], function (Backbone, Common) {
  'use strict';

  // add temprature model
  var TempAlarmModel = Backbone.Model.extend ({
    urlRoot: Common.ApiUrl + '/temperatures/alarms',

    initialize: function(){
      this.on ('request', this.indicate, this);
      this.on ('sync', this.disindicate, this);
    },

    indicate: function () {
    },

    disindicate: function () {
    },
  }); 

  return TempAlarmModel;
});
