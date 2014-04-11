
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
            this.data = options;
            console.log(this.data.temp_status);
            if(this.data.temp_status === 1 || this.data.noise_status === 1){
              this.overall_status = 1;
            }
            else if(this.data.temp_status === -1 || this.data.noise_status === -1){
              this.overall_status = -1;
            }
            else {
              this.overall_status = 0;
            }
        },

        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {
          console.log('resutl = ' + this.overall_status);
          this.$el.html (this.template ({ 
            data : this.data,
            overall_status: this.overall_status,
          }));
          // this.renderTrendsViews();

          return this;
        },

    });

    return HomeRowView;
});
