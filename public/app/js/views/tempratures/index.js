
define ([

    'underscore',
    'backbone',
    'text!templates/tempratures/index.html',
], function (_, Backbone, TempraturesTemplate) {
  'use strict';

  var TempraturesView = Backbone.View.extend({

    template: _.template (TempraturesTemplate),

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

  return TempraturesView;
});

