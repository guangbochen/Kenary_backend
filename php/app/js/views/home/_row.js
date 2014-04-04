
define ([

    'underscore',
    'backbone',
    'text!templates/home/_row.html',
    'views/home/_trends',

], function (_, Backbone, TempRowTemplate, HomeTrendsView) {
    'use strict';

    var HomeRowView = Backbone.View.extend({

        template: _.template(TempRowTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
            this.data = options;
        },

        // renderTrendsViews : function () {

        //   for (var i = 0; i < 4; i++) {
        //     var homeTrendsView = new HomeTrendsView();
        //     console.log(homeTrendsView.render().el);
        //     this.$el.find('tbody').append(homeTrendsView.render().el);
        //   }
        // },

        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {
          this.$el.html (this.template ({ 
            data : this.data
          }));
          // this.renderTrendsViews();

          return this;
        },

    });

    return HomeRowView;
});
