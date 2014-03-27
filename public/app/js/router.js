define ([

    'jquery',
    'underscore',
    'backbone',
    // 'collections/reservations',
    'views/home/index',
    'views/tempratures/index',
    'views/noises/index',
    'views/airs/index',

], function ($, _, Backbone, HomeView, TempraturesView, NoisesView, AirsView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        //define router url
        routes: {
            ''            : 'index',
            'tempratures' : 'tempratures',
            'noises'      : 'noises',
            'airs'        : 'airs',
        },

        /**
         * constructor
         */
        initialize: function () {
          // this.restaurantsCollection = new RestaurantsCollection();
          // this.reservationsCollection = new ReservationsCollection();
        },

        index: function () {
          this.showView (new HomeView ());
          this.activeSidebar($('#view-index'));
        },

        tempratures: function () {
          this.showView (new TempraturesView ());
          this.activeSidebar($('#view-tempratures'));
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

