define ([

    'underscore',
    'backbone',
    'text!templates/home/index.html',
    'views/home/_row',
    'collections/devices'
], function (_, Backbone, HomeTemplate, HomeRowView, DevicesCollection) {
  'use strict';

  var HomeView = Backbone.View.extend({

    template: _.template (HomeTemplate),

      /**
       * constructor
       */
      initialize: function (options) {
        this.collection = options.collection;
        this.collection.on ('sync reset', this.render, this);

        if(this.collection.length == 0){
          this.collection.fetch();
        }
      },

      events: { },

      /**
       * renders home table rows view
       */
      renderHomeRows : function() {
        var _this = this;

        this.collection.each(function(device){
          var homeRowView = new HomeRowView({
            device: device,
          });
          _this.$el.find('tbody').append(homeRowView.render().el);
        });
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

      onClose: function () { 
        this.collection.off ('sync reset');
      }
  });

  return HomeView;
});

