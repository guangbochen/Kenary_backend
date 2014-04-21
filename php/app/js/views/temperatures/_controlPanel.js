
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/_controlPanel.html',
    'models/tempConfig',
    'alertify',
    'syphon',
    // 'parsley'

], function (_, Backbone, ControlPanelTemplate, TempConfigModel, alertify) {
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
          'submit ': 'SaveControlPanel',
        },

        SaveControlPanel : function (e){
          e.preventDefault();
          if($('#control-panel-form').parsley().validationResult) { 
            var data = Backbone.Syphon.serialize (this);
            //submit form
            this.tempConfig.save(data, {
              success: function () {
                alertify.success('You have update changes successfully');
              },
              error: function(){
                alertify.error('Failed to update changes, Please try again');
              }
            });
          };
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
