
define ([

    'highcharts',
    'underscore',
    'backbone',
    'text!templates/noises/index.html',
    'highcharts_exporting',

], function (Highcharts, _, Backbone, NoisesTemplate ) {
  'use strict';

  var NoisesView = Backbone.View.extend({

    template: _.template (NoisesTemplate),

      /**
       * constructor
       */
      initialize: function () {
      },

      events: { },

      renderHighCharts : function () {
        this.$('#noise-container').highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Kenari Noise Sensor'
            },
            // subtitle: {
            //     text: 'Date: 2003'
            // },
            xAxis: {
                // title: {
                //     enabled: true,
                //     // text: 'Date'
                // },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Sound Pressure Level (dB)'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 50,
                y: 20,
                floating: true,
                backgroundColor: '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.y} dB at {point.x}'
                    }
                }
            },

            series: [{
                name: 'decibels(dB)',
                color: 'rgba(223, 83, 83, .5)',
                data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2]]
            }]
        });
      },

      /**
       * renders the view template, and updates this.el with the new HTML
       */
      render: function () {
        // Load the compiled HTML template into the Backbone
        this.$el.html (this.template());
        this.renderHighCharts();

        this.$( "text" ).last().empty();
        return this;
      },

      onClose: function () { }
  });

  return NoisesView;
});

