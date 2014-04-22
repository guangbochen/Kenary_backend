
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/_controlPanel.html',
    'models/tempConfig',
    'alertify',
    'parsley',
    'syphon',

], function (_, Backbone, ControlPanelTemplate, TempConfigModel, alertify, parsley) {
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
          //submit form
          this.tempConfig.save(data, {
            success: function () {
              alertify.success('You have update changes successfully');
            },
            error: function(){
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
