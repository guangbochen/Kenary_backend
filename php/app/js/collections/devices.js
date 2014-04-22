
define ([
    'backbone',
    'models/device',
    'common',
], function (Backbone, DeviceModel, Common) {

  'use strict';
  var DevicesCollection = Backbone.Collection.extend ({ 

      //define instances
      model : DeviceModel,
      url: Common.ApiUrl + '/devices',

      /**
       * constructor
       */
      initialize: function(){
      },

  });

  return DevicesCollection;
});

