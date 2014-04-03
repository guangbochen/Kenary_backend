
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/index.html',
    'collections/temperatures',
    'views/temperatures/_row',
    'alertify',
    'd3', 'nvd3',
], function (_, Backbone, TemperaturesTemplate, TemperaturesCollection, TempRowView, alertify) {
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
      },

      events: { 
        'click #refresh': 'refresh',
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
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            transitionDuration: 250,
            tooltipContent: function (key, x, y, e, graph) {

              // check whether the temp is alarm or not
              var is_alarm = '<span class="label label-success"> Normal </span>';
              if(e.point.is_alarm === 1) {
                is_alarm = '<span class="label label-danger"> Alarm </span>';
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
            i=1;

        // append temp into temp array
        this.collection.each (function (temp) {
          tempArray.push({ 
            x: i++, 
            y: temp.attributes.temperature_c, 
            date: temp.attributes.created_at,
            is_alarm: temp.attributes.is_alarm,
          });

          //apend temp alarm to temp alarm table
          if(temp.attributes.is_alarm === 1) {
            this.renderTempAlarms(temp);
          }
        }, this);

        return [{
          values: tempArray,
            key: 'Temperature',
            color: "#F3441F"
        }];
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

