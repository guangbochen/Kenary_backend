define ([

    'underscore',
    'backbone',
    'text!templates/home/_newDevice.html',
    'alertify',
    'parsley',
    'maskedinput',
    'syphon',
    'ladda',
    'spin',
], function (_, Backbone, NewDeviceTemplate, alertify, parsley, mask, Ladda, Spin) {
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
        var ladda = Ladda.create( document.querySelector( '.ladda-button' ) );

        var data = Backbone.Syphon.serialize (this);
        //submit form
        this.collection.create(data, {
          //trigger lodda progress bar
          beforeSend: function(){
            ladda.start();
            var progress = 0;
            var interval = setInterval( function() {
              progress = Math.min( progress + Math.random() * 0.1, 1 );
              ladda.setProgress( progress );
            }, 300 );
          },
          success: function(result) {
            ladda.stop();
            alertify.success('You have added new device successfully');
            Backbone.history.navigate ('/#', true);
          },
          error: function(){
            ladda.stop();
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

        //set masked input of input form
        this.$('.contact_number').mask('999-999-9999');
        this.$('.device_id').mask('KENARI9999');
        return this;
      },

      onClose: function () { 
        this.collection.off ('sync reset');
      }
  });

  return NewDeivceView;
});

