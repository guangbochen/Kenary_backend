define ([

    'underscore',
    'backbone',
    'text!templates/home/index.html',
], function (_, Backbone, HomeTemplate) {
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
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        // Load the compiled HTML template into the Backbone
        this.$el.html (this.template({ }));
        return this;
      },

      onClose: function () { }
  });

  return HomeView;
});

