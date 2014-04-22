
define ([

    'underscore',
    'backbone',
    'text!templates/home/_row.html',

], function (_, Backbone, TempRowTemplate) {
    'use strict';

    var HomeRowView = Backbone.View.extend({

        template: _.template(TempRowTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
            this.device = options.device;
            // if(this.device.temp_status === 1 || this.device.noise_status === 1){
            //   this.overall_status = 1;
            // }
            // else if(this.device.temp_status === -1 || this.device.noise_status === -1){
            //   this.overall_status = -1;
            // }
            // else {
              this.overall_status = 0;
            // }
        },

        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {
          this.$el.html (this.template ({ 
            device : this.device.attributes,
            overall_status: this.overall_status,
          }));
          return this;
        },

    });

    return HomeRowView;
});
