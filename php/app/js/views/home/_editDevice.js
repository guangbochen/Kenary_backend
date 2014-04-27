define ([

    'underscore',
    'backbone',
    'text!templates/home/_editDevice.html',
    'models/device',
    'alertify',
    'parsley',
    'maskedinput',
    'ladda',
    'spin',
    'syphon',
], function (_, Backbone, EditDeviceTemplate, DeviceModel, alertify, parsley, mask, Ladda, Spin) {
  'use strict';

  var EditDeivceView = Backbone.View.extend({

    template: _.template (EditDeviceTemplate),

      /**
       * constructor
       */
      initialize: function (options) {

        _.bindAll (this, 'renderDevice');
        this.id = options.id;
        this.deviceModel = new DeviceModel ({id: options.id});

      },

      events: { 
        'submit #update-device-form': 'SubmitForm'
      },

      SubmitForm : function(e) {
        e.preventDefault();
        var _this = this;
        var ladda = Ladda.create( document.querySelector( '.ladda-button' ) );

        var data = Backbone.Syphon.serialize (this);
        //submit form
        this.deviceModel.save(data, {
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
            alertify.success('You have saved changes successfully');
          },
          error: function(){
            ladda.stop();
            alertify.error('Failed to save changes, Please try again');
          }
        });
      },

      renderDevice : function () {

        this.$el.html (this.template({
          device: this.deviceModel.attributes,
          temp_config: this.deviceModel.attributes.temp_config,
          noise_config: this.deviceModel.attributes.noise_config,
        }));

        //set masked input of input form
        this.$('.contact_number').mask('999-999-9999');
        this.$('.device_id').mask('KENARI9999');

      },

      /**
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        // Load the compiled HTML template into the Backbone
        if( this.collection.get(this.id) ) 
        {
          this.deviceModel = this.collection.get (this.id);
          this.renderDevice();
        } 
        else 
        {
          this.deviceModel.fetch ({ success: this.renderDevice });
        }
        return this;
      },

      onClose: function () { }
  });

  return EditDeivceView;
});

