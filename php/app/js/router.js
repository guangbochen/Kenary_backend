define ([

    'jquery',
    'underscore',
    'backbone',
    'collections/temperatures',
    'collections/devices',
    'views/home/index',
    'views/temperatures/index',
    'views/temperatures/_editAlarm',
    'views/noises/index',
    'views/airs/index',
    'views/home/_newDevice',
    'views/home/_editDevice',

], function ($, _, Backbone, TemperaturesCollection, DevicesCollection, HomeView, TemperaturesView, 
  EditTempAlarmView, NoisesView, AirsView, NewDeviceView, EditDeviceView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        //define router url
        routes: {
            ''            : 'index',
            'temperatures' : 'temperatures',
            'temperatures/alarms/:id/edit': 'editTempAlarm',
            'noises'      : 'noises',
            'airs'        : 'airs',
            'devices/new': 'addNewDevice',
            'devices/:id/setting': 'editDevice',
        },

        /**
         * constructor
         */
        initialize: function () {
          this.temperaturesCollection = new TemperaturesCollection();
          this.devicesCollection = new DevicesCollection();
        },

        index: function () {
          this.showView (new HomeView ({
            collection: this.devicesCollection,
          }));
          this.activeSidebar($('#view-index'));
        },

        addNewDevice: function () {
          this.showView (new NewDeviceView ({
            collection: this.devicesCollection,
          }));
          this.activeSidebar($('#view-index'));
        },

        editDevice: function (id) {
          this.showView (new EditDeviceView ({
            id: id,
            collection: this.devicesCollection,
          }));
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

