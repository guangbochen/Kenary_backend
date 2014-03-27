
define ([

    'underscore',
    'backbone',
    'text!templates/airs/index.html',
], function (_, Backbone, AirsTemplate) {
  'use strict';

  var AirsView = Backbone.View.extend({

    template: _.template (AirsTemplate),

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

  return AirsView;
});

