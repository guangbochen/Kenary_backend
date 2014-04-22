
define ([
    'backbone',
    'common',

], function (Backbone, Common) {
  'use strict';

  // add temprature model
  var DeviceModel = Backbone.Model.extend ({
    urlRoot: Common.ApiUrl + '/devices',

    initialize: function(){
    },

  }); 

  return DeviceModel;
});
