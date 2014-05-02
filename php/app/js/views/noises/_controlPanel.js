
define ([

    'underscore',
    'backbone',
    'text!templates/noises/_controlPanel.html',
    'models/noiseConfig',
    'alertify',
    'parsley',
    'ladda',
    'spin',
    'syphon',

], function (_, Backbone, NoiseControlPanelTemplate, NoiseConfigModel, alertify, parsley, Ladda, Spin) {
    'use strict';

    var ControlPanelView = Backbone.View.extend({

        template: _.template(NoiseControlPanelTemplate),

        /**
         * constructor
         */
        initialize: function (options) {
          this.noiseConfig = new NoiseConfigModel({id: options.id});
        },

        events: {
          'submit #control-panel-form': 'SaveControlPanel',
        },

        SaveControlPanel : function (e){
          e.preventDefault();
          var data = Backbone.Syphon.serialize (this);
          var ladda = Ladda.create( document.querySelector( '.ladda-button' ) );

          //submit form
          this.noiseConfig.save(data, {
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

          this.noiseConfig.fetch({
            success: function (result){
              _this.$el.html (_this.template ({
                noise_config: result.attributes
              }));
            }
          });
          return this;
        },

        onClose: function () {
          this.noiseConfig.off ('change');
        },
    });
    return ControlPanelView;
});
