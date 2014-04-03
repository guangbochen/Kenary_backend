
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/_row.html',

], function (_, Backbone, TempRowTemplate) {
    'use strict';

    var TempRowView = Backbone.View.extend({

        template: _.template(TempRowTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
            this.temp = options;
        },


        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {

            this.$el.html (this.template ({ 
              alarm : this.temp.attributes.alarm,
            }));
            return this;
        },

    });

    return TempRowView;
});
