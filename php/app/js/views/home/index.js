define ([

    'underscore',
    'backbone',
    'text!templates/home/index.html',
    'views/home/_row',
], function (_, Backbone, HomeTemplate, HomeRowView) {
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
          if(i == 2) 
            var q=-1;
          else 
            q = i;

          data ={ 
            name: 'UTS Building ' + i,
            id: 'kenari000' + i, 
            temp: i+26, 
            temp_status: q,  //0 ok, 1 warning, -1 alarm
            noise: i+26, 
            noise_status: 0,  //0 ok, 1 warning, -1 alarm
          };
          var homeRowView = new HomeRowView(data);
          this.$el.find('tbody').append(homeRowView.render().el);
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

