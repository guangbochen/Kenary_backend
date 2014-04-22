define ([

    'underscore',
    'backbone',
    'text!templates/home/_newDevice.html',
    'alertify',
    'parsley',
    'syphon',
], function (_, Backbone, NewDeviceTemplate, alertify, parsley) {
  'use strict';

  var NewDeivceView = Backbone.View.extend({

    template: _.template (NewDeviceTemplate),

      /**
       * constructor
       */
      initialize: function (options) {

        this.collection = options.collection;
        this.collection.on ('sync reset', this.render, this);

        if(this.collection.length == 0){
          this.collection.fetch();
        }
      },

      events: { 
        'submit #new-device-form': 'SubmitAddNewForm'
      },

      SubmitAddNewForm : function(e) {
        e.preventDefault();
        var _this = this;

        var data = Backbone.Syphon.serialize (this);
        //submit form
        this.collection.create(data, {
          success: function(result) {
            alertify.success('You have added new device successfully');
            Backbone.history.navigate ('/#', true);
          },
          error: function(){
            alertify.error('Failed to add new device, Please try again');
          }
        });
      },

      /**
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        // Load the compiled HTML template into the Backbone
        this.$el.html (this.template());
        return this;
      },

      onClose: function () { 
        this.collection.off ('sync reset');
      }
  });

  return NewDeivceView;
});

