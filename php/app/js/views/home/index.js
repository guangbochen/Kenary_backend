define ([

    'underscore',
    'backbone',
    'text!templates/home/index.html',
    'views/home/_row',
    'views/home/_trends',
], function (_, Backbone, HomeTemplate, HomeRowView, HomeTrendsView) {
  'use strict';

  var HomeView = Backbone.View.extend({

    template: _.template (HomeTemplate),

      /**
       * constructor
       */
      initialize: function () {
      },

      events: { },

      /**
       * renders home table rows view
       */
      renderHomeRows : function() {

        var data = [];

        for (var i = 0; i < 3; i++) {
          data ={ 
            name: 'UTS Building ' + i,
            id: 'kenari000' + i, 
            temp: i+26, 
            trend: i, 
          };
          var homeRowView = new HomeRowView(data);
          this.$el.find('tbody').append(homeRowView.render().el);
          var homeTrendsView = new HomeTrendsView(data);
          this.$el.find('tbody').append(homeTrendsView.render().el);
        }
      },

      /**
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        // Load the compiled HTML template into the Backbone
        this.$el.html (this.template());
        this.renderHomeRows();
        return this;
      },

      onClose: function () { }
  });

  return HomeView;
});

