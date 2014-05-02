
define ([
    'backbone',
    'common',

], function (Backbone, Common) {
  'use strict';

  // add temprature model
  var TempConfigModel = Backbone.Model.extend ({
    urlRoot: Common.ApiUrl + '/noises/config',

    initialize: function(){
    },
  }); 

  return TempConfigModel;
});
