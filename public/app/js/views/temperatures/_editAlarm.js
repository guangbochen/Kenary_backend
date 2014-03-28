
define ([

    'jquery',
    'underscore',
    'backbone',
    'models/tempAlarm',
    'text!templates/temperatures/_editAlarm.html',
    'alertify',
    'switch',
    'syphon',
    // 'ladda',
    // 'spin',

], function ($, _, Backbone, TempAlarmModel, EditTempAlarmTemplate, alertify) {
  'use strict';

  var RestaurantView = Backbone.View.extend({

    template: _.template (EditTempAlarmTemplate),

      /**
       * constructor
       */
      initialize: function (options) {

        this.tempAlarmId = options.id;
        this.tempAlarmModel = new TempAlarmModel ({id: options.id});

        this.tempAlarmModel.on ('change', this.render, this);
      },

      events: {
        'submit #tempAlarm-form': 'submitForm',
      },

      submitForm : function (e) {
        e.preventDefault();
        var _this = this;

        var $tempAlarm = Backbone.Syphon.serialize (this);
        console.log($tempAlarm);

        //submit form
        this.tempAlarmModel.save($tempAlarm, {
          success: function (tempAlarm) {
            alertify.success('You have saved temperature alarm successfully');
            _this.collection.fetch ();
          },
          error: function(){
            alertify.error('Failed to save temperature alarm, Please try again');
          }
        });

      },

      /**
       * render loads the view template view and fetches model from server 
       * if the collection is not fetched
       */
      render: function () {

        var _this = this;
        this.tempAlarmModel.fetch ({ 
          success : function(model) {

            // Load the compiled HTML template into the Backbone
            _this.$el.html (_this.template({
              id: _this.tempAlarmId,
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
        this.tempAlarmModel.off ('change');
      },
  });

  return RestaurantView;
});

