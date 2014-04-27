
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/_controlPanel.html',
    'models/tempConfig',
    'alertify',
    'parsley',
    'ladda',
    'spin',
    'syphon',

], function (_, Backbone, ControlPanelTemplate, TempConfigModel, alertify, parsley, Ladda, Spin) {
    'use strict';

    var ControlPanelView = Backbone.View.extend({

        template: _.template(ControlPanelTemplate),

        /**
         * constructor
         */
        initialize: function () {
          this.tempConfig = new TempConfigModel({id: 1});
        },

        events: {
          'submit #control-panel-form': 'SaveControlPanel',
        },

        SaveControlPanel : function (e){
          e.preventDefault();
          var data = Backbone.Syphon.serialize (this);
          var ladda = Ladda.create( document.querySelector( '.ladda-button' ) );

          //submit form
          this.tempConfig.save(data, {
            //trigger lodda progress bar
            beforeSend: function(){
              ladda.start();
              var progress = 0;
              var interval = setInterval( function() {
                progress = Math.min( progress + Math.random() * 0.1, 1 );
                ladda.setProgress( progress );
              }, 300 );
            },
            success: function () {
              ladda.stop();
              alertify.success('You have update changes successfully');
            },
            error: function(){
              ladda.stop();
              alertify.error('Failed to update changes, Please try again');
            }
          });
        },

        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {
          var _this = this;

          this.tempConfig.fetch({
            success: function (result){
              _this.$el.html (_this.template ({
                data: result.attributes
              }));
            }
          });
          return this;
        },

        onClose: function () {
          this.tempConfig.off ('change');
        },
    });
    return ControlPanelView;
});
