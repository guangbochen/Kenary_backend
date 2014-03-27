
define ([

    'underscore',
    'backbone',
    'text!templates/noises/index.html',
], function (_, Backbone, NoisesTemplate) {
  'use strict';

  var NoisesView = Backbone.View.extend({

    template: _.template (NoisesTemplate),

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

  return NoisesView;
});

