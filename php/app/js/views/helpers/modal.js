
define ([

    'underscore',
    'backbone',
    'text!templates/helpers/modal.html',

], function ( _, Backbone, ModalTemp) {
  'use strict';

  var BaseModalView = Backbone.View.extend({

      id: 'base-modal',
      className: 'modal fade hide',
      template: _.template (ModalTemp),

      /**
       * constructor
       */
      initialize: function () {
        // _(this).bindAll();
        this.render();
      },

      events: {
        'hidden': 'teardown'
      },

      show: function() {
        this.$el.modal('show');
      },

      teardown: function() {
        this.$el.data('modal', null);
        this.remove();
      },

      render: function () {
        this.$el.html(this.template());
        this.$el.modal({show:false}); // dont show modal on instantiation
        return this;
      }

  });

  return BaseModalView;
});

