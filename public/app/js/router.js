define ([

    'jquery',
    'underscore',
    'backbone',
    'collections/temperatures',
    'views/home/index',
    'views/temperatures/index',
    'views/temperatures/_editAlarm',
    'views/noises/index',
    'views/airs/index',

], function ($, _, Backbone, TemperaturesCollection, 
  HomeView, TemperaturesView, EditTempAlarmView, NoisesView, AirsView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        //define router url
        routes: {
            ''            : 'index',
            'temperatures' : 'temperatures',
            'temperatures/alarms/:id/edit': 'editTempAlarm',
            'noises'      : 'noises',
            'airs'        : 'airs',
        },

        /**
         * constructor
         */
        initialize: function () {
          this.temperaturesCollection = new TemperaturesCollection();
        },

        index: function () {
          this.showView (new HomeView ());
          this.activeSidebar($('#view-index'));
        },

        temperatures: function () {
          this.showView (new TemperaturesView ({
            collection: this.temperaturesCollection,
          }));
          this.activeSidebar($('#view-temperatures'));
        },

        editTempAlarm: function (id) {
          this.showView (new EditTempAlarmView ({
            id: id,
            collection: this.temperaturesCollection,
          }));
          this.activeSidebar($('#view-temperatures'));
        },

        noises: function () {
          this.showView (new NoisesView ());
          this.activeSidebar($('#view-noises'));
        },

        airs: function () {
          this.showView (new AirsView ());
          this.activeSidebar($('#view-airs'));
        },

        // Clean previous view and open current view
        showView:function (view) {

          if (this.currentView) this.currentView.close();
          this.currentView = view;

          //render template to the view
          $('#page-content').html(view.render().el);
          return view;

        },

        activeSidebar: function (selector) {
          selector.addClass ('active');
          selector.siblings().removeClass ('active');
        },

    });

    return AppRouter;
  });

