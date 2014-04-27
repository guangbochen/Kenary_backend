
define ([

    'underscore',
    'backbone',
    'models/temperature',
    'text!templates/temperatures/_editAlarm.html',
    'alertify',
    'ladda',
    'spin',
    'switch',
    'syphon',

], function ( _, Backbone, TemperatureModel, EditTempAlarmTemplate, alertify, Ladda, Spin) {
  'use strict';

  var RestaurantView = Backbone.View.extend({

    template: _.template (EditTempAlarmTemplate),

      /**
       * constructor
       */
      initialize: function (options) {

        this.id = options.id;
        this.temperature = new TemperatureModel ({id: options.id});

        this.temperature.on ('change', this.render, this);
      },

      events: {
        'submit #tempAlarm-form': 'submitForm',
      },

      submitForm : function (e) {
        e.preventDefault();
        var _this = this;
        var ladda = Ladda.create( document.querySelector( '.ladda-button' ) );

        var $tempAlarm = Backbone.Syphon.serialize (this);

        //submit form
        this.temperature.save($tempAlarm, {
          //trigger lodda progress bar
          beforeSend: function(){
            ladda.start();
            var progress = 0;
            var interval = setInterval( function() {
              progress = Math.min( progress + Math.random() * 0.1, 1 );
              ladda.setProgress( progress );
            }, 300 );
          },
          success: function (tempAlarm) {
            ladda.stop();
            alertify.success('You have saved changes successfully');
            _this.collection.fetch ();
          },
          error: function(){
            ladda.stop();
            alertify.error('Failed to save changes, Please try again');
          }
        });

      },

      /**
       * render loads the view template view and fetches model from server 
       * if the collection is not fetched
       */
      render: function () {

        var _this = this;
        this.temperature.fetch ({ 
          success : function(model) {

            // Load the compiled HTML template into the Backbone
            _this.$el.html (_this.template({
              id: _this.id,
              alarm: model.attributes,
            }));

            //init bootstrap swith by class name
            $('.switch').bootstrapSwitch();
            $('.switch-left').html('Yes');
            $('.switch-right').html('No');
          }
        });

        return this;
      },

      onClose: function () {
        this.temperature.off ('change');
      },
  });

  return RestaurantView;
});

