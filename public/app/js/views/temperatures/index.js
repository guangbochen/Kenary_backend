
define ([

    'underscore',
    'backbone',
    'text!templates/temperatures/index.html',
    'collections/temperatures',
    'd3', 'nvd3'
], function (_, Backbone, TemperaturesTemplate, TemperaturesCollection) {
  'use strict';

  var TemperaturesView = Backbone.View.extend({

    template: _.template (TemperaturesTemplate),

      /**
       * constructor
       */
      initialize: function () {
        _.bindAll (this, 'drawLineChart', 'render');
        this.d3 = d3.select(this.el);
        this.date = new Date().toJSON().slice(0,10);

        this.collection.on ('sync reset', this.render, this);

        // Fetch only when menus collection is empty
        if (this.collection.length == 0) 
          this.collection.fetch ();
      },

      events: { },

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

      drawLineChart: function () {
        var _this = this;
        // console.log(this.collection.models);
        nv.addGraph(function() {  
          var chart = nv.models.lineChart()
          .options ({
            showXAxis: false,
            showYAxis: true,
            showLegend: false,
            transitionDuration: 250,
            tooltipContent: function (key, x, temp, e, graph) {

              if (x === 'JAN') x = 'January';
              else if (x === 'FEB') x ='Feburary';
              else if (x === 'MAR') x ='March';
              else if (x === 'APR') x ='April';
              else if (x === 'MAY') x ='May';
              else if (x === 'JUN') x ='June';
              else if (x === 'JUL') x ='July';
              else if (x === 'AUG') x ='August';
              else if (x === 'SEP') x ='September';
              else if (x === 'NOV') x ='November';
              else if (x === 'DEC') x ='December';

              return '<h3><strong>' + key + '</strong></h3>' +
            '<p>' +  temp + '°C on ' + x + '</p>'
            }
          });

        chart.xAxis
          .tickFormat(function (d, i) {
            // while(i<24) {
            //   return i;
            // }
            switch (d) {
              case 1: return 'JAN';
              case 2: return 'FEB';
              case 3: return 'MAR';
              case 4: return 'APR';
              case 5: return 'MAY';
              case 6: return 'JUN';
              case 7: return 'JUL';
              case 8: return 'AUG';
              case 9: return 'SEP';
              case 10: return 'OCT';
              case 11: return 'NOV';
              case 12: return 'DEC';
            }
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
          console.log(temp.attributes);
          tempArray.push({ x: i++, temp: temp.attributes.temperature_c  });
          // var menuView = new MenuView({ model: menu });
          // this.$('#menus table tbody').append (menuView.render().el);
        }, this);
        // for (var i = 1; i <= 12; i++) 
        //   temp.push({ x: i, y: Math.random() * (1000 - 1) + 1 });

        return [{
          values: tempArray,
            key: 'Temperature',
            color: "#F3441F"
        }];
      },

      onClose: function () { }
  });

  return TemperaturesView;
});

