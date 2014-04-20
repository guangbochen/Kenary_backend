
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/index.html',
    'collections/temperatures',
    'views/temperatures/_row',
    'views/temperatures/_controlPanel',
    'alertify',
    'views/helpers/pubnub',
    // 'views/helpers/modal',
    'd3', 'nvd3',
    'bootstrap',

], function (_, Backbone, TemperaturesTemplate, TemperaturesCollection, TempRowView, ControlPanelView,
  alertify, Pubnub) {
  'use strict';

  var TemperaturesView = Backbone.View.extend({

    template: _.template (TemperaturesTemplate),

      /**
       * constructor
       */
      initialize: function (options) {

        _.bindAll (this, 'drawLineChart', 'render');
        this.d3 = d3.select(this.el);
        this.date = new Date().toJSON().slice(0,10);
        this.collection.on ('sync reset', this.render, this);

        // Fetch only when menus collection is empty
        if (this.collection.length == 0) {
          this.collection.fetch ();
        }

        this.listenToPubnub();
      },

      events: { 
        'click #refresh': 'refresh',
        'click .modal-dismiss': 'dismissModal',
      },

      dismissModal : function () {
        alert('123');
      },

      /**
       * this function trigger action when pubnub pushes notification
       * TODO move the function into pubnub.js file and trigger alarm event
       */
      listenToPubnub : function () {
        var _this = this;

        Pubnub.subscribe({ 
          channel : 'kenari',
          message: function(message) { 
            _this.collection.fetch();

            //notify user when the notification is a alarm
            if(message.is_alarm == 1){
              $('#modal-temp').html(message.temperature_c);
              $('#modal-desc').html(message.description);
              $('#modal-actived').html(message.is_active);
              // $('#modal-solved').html(message.is_solved);
              // $('#modal-created').html(message.created_at);
              // _this.$('#tempAlarmModal').modal('show');
              $('#abc').click();
            }
          }
        });
      },

      refresh : function () {
        this.collection.fetch();
        alertify.success('Refreshed temperatures successfully');
      },

      /**
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        this.$el.html (this.template({
          date: this.date,
        }));
        this.drawLineChart();

        var controlPanelView = new ControlPanelView();
        this.$el.find('#control-panel').append(controlPanelView.render().el);
        return this;
      },
      /**
       * this function creates the line chart for temperatures
       */
      drawLineChart: function () {
        var _this = this;
        nv.addGraph(function() {  
          var chart = nv.models.lineChart()
          .options ({
            showXAxis: false,
            showYAxis: true,
            showLegend: true,
            transitionDuration: 250,
            tooltipContent: function (key, x, y, e, graph) {

              // check whether the temp is alarm or not
              var is_alarm = '<span class="label label-success"> Normal </span>';
              if(e.point.is_alarm === 1) {
                is_alarm = '<span class="label label-danger"> Alarm </span>';
              }

              if(key != 'Temperature'){
                return '<span class="threshold">' + e.series.key + '</span>';
              }

              return '<h3><strong>' + key + '</strong> ' + is_alarm + ' </h3>' 
            + '<p>' +  y + '°C on ' + e.point.date + '</p>'
            }
          });

        chart.xAxis
          .tickFormat(function (d, i) {
            // return d;
            // switch (d) {
            //   case 1: return 'JAN';
            //   case 2: return 'FEB';
            //   case 3: return 'MAR';
            //   case 4: return 'APR';
            //   case 5: return 'MAY';
            //   case 6: return 'JUN';
            //   case 7: return 'JUL';
            //   case 8: return 'AUG';
            //   case 9: return 'SEP';
            //   case 10: return 'OCT';
            //   case 11: return 'NOV';
            //   case 12: return 'DEC';
            // }
          })
        .tickPadding(30);

        chart.yAxis
          .tickFormat(d3.format(',.2f'));

        _this.d3.select('#chartContainer').append('svg')
          .datum(_this.numberOfNewCustomer())
          .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
        });
      },

      numberOfNewCustomer: function() {
        var tempArray = [],
        maxThreshold = [],
        minThreshold = [],
        i=1;

        this.collection.each (function (temp) {

          var x_value = i++;
          // push temp value into temp array
          tempArray.push({ 
            x: x_value,
            y: temp.attributes.temperature_c, 
            date: temp.attributes.created_at,
            is_alarm: temp.attributes.is_alarm,
          });

          // push max threshold temp value into array
          maxThreshold.push({ 
            x: x_value,
            y: temp.attributes.max_threshold, 
          });

          // push min threshold temp value into array
          minThreshold.push({ 
            x: x_value, 
            y: temp.attributes.min_threshold, 
          });

          //apend temp alarm to temp alarm table
          if(temp.attributes.is_alarm === 1) {
            this.renderTempAlarms(temp);
          }
        }, this);

        return [
        {
          values: minThreshold,
            key: 'Min Threshold',
            color: '#93BCE0'
        },
        {
          values: maxThreshold,
          key: 'Max Threshold',
          color: '#FFBF01'
        },
        {
          values: tempArray,
          key: 'Temperature',
          color: "#F3441F"
        },
        ];
      },

      renderTempAlarms : function(temp) {
        var tempRowView = new TempRowView(temp);
        this.$el.find('tbody').append(tempRowView.render().el);
      },

      onClose: function () { 
        this.collection.off ('sync reset');
      }
  });

  return TemperaturesView;
});

