
define ([

    'underscore',
    'backbone',
    'text!templates/home/_trends.html',

], function (_, Backbone, TempTrendsTemplate) {
    'use strict';

    var HomeTrendsView = Backbone.View.extend({

        template: _.template(TempTrendsTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
          this.trend;
          this.status;

          console.log(options);
          // this.data = options;
          if(options.trend == 0) {
            this.trend = 'Trend: <i class="fa fa-long-arrow-right"></i>';
            this.status = 'success';
          }
          else if(options.trend == 1) {
            this.trend = 'Trend: <i class="fa fa-long-arrow-up"></i>';
            this.status = 'danger';
          }
          else if(options.trend == 2) {
            this.trend = 'Trend: <i class="fa fa-long-arrow-down"></i>';
            this.status = 'warning';
          }
        },


        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {
          console.log(this.status);
          this.$el.html (this.template ({ 
            trend : this.trend,
            status : this.status,
          }));
          return this;
        },

    });

    return HomeTrendsView;
});
