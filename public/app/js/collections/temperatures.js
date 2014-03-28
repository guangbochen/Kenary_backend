
define ([
    'backbone',
    'models/tempAlarm',
    'common',
], function (Backbone, TempAlarmModel, Common) {

  'use strict';
  var TemperaturesCollection = Backbone.Collection.extend ({ 

      //define instances
      model : TempAlarmModel,
      url: Common.ApiUrl + '/temperatures',

      /**
       * constructor
       */
      initialize: function(){
        this.on ('request', this.indicate, this);
        this.on ('sync', this.disindicate, this);
      },

      indicate: function () {
      },

      disindicate: function () {
      },

  });

  return TemperaturesCollection;
});

