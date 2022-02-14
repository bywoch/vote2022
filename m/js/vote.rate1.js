$(function () {
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /*, thisp */ ) {
            "use strict";
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();
            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t))
                        res.push(val);
                }
            }
            return res;
        };
    }
    "use strict";
    Highcharts.chart('container', {
        chart: {
            type: 'line',
            events: {
                load: function (chart) {
                    var thisChart = chart.target;
                    var data = thisChart.series[0].data;
                    var filterData = data.filter(function (data) {
                        return data.isNull == false;
                    });
                    var v20 = thisChart.series[0].data[filterData.length - 1];
                    var v19 = thisChart.series[1].data[filterData.length - 1];
                    var v18 = thisChart.series[2].data[filterData.length - 1];
                    setTimeout(function () {
                        if (v18.y === null && v19.y === null) {
                            thisChart.tooltip.refresh([v20]);
                        } else if (v18.y === null) {
                            thisChart.tooltip.refresh([v20, v19]);
                        } else {
                            thisChart.tooltip.refresh([v20, v19, v18]);
                        }
                        thisChart.xAxis[0].drawCrosshair(null, data[filterData.length - 1]);
                        //if(v20.y !== null){
                        //  $('.highcharts-tooltip span span:nth-child(1)').addClass('bold');
                        //}
                    }, 500);
                    thisChart.xAxis[0].labelGroup.element.childNodes[filterData.length - 1].classList.add('active');
                }
            },
        },
        title: {
            text: ''
        },
        xAxis: {
            crosshair: {
                width: 20,
                color: '#f7f7f9'
            },
            categories: ['7', '9', '11', '12', '13', '14', '15', '16', '17', '18', '19', '19:30', '20']
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            max: 100
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            useHTML: true,
            padding: 0,
            borderRadius: 5,
            formatter: function () {
                var s = '';
                s += "<div class='tooltips'>";
                $.each(this.points, function (i, point) {
                    s += "<span>" + point.series.name + '&nbsp;' + point.y + "%</span>&nbsp;&nbsp;";
                });
                s += '</div>';
                return s;

            },
            style: {
                fontSize: "20px"
            },
            positioner: function (labelWidth, labelHeight, point) {

                /* BWC */
                $('.highcharts-tooltip .tooltips span:contains("20대")').each(function () {
                    $(this).css('font-weight', 'bold');
                });

                var LabelThird = $('.highcharts-axis-labels text').eq(3).prevAll().hasClass('active');
                var LabelList9 = $('.highcharts-axis-labels text').eq(9).nextAll().hasClass('active');


                if (LabelThird === true) {
                    return {
                        x: point.plotX - labelWidth / 3 + 70,
                        //y: 0
                    }
                } else if (LabelList9 === true) {
                    return {
                        x: point.plotX - labelWidth + 75,
                    }
                } else {
                    return {
                        x: point.plotX - labelWidth / 3,
                    }
                }
                return {
                    y: 0
                }

            }
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        mouseOver: function () {
                            $(this.series.chart.xAxis[0].labelGroup.element.childNodes[this.x]).addClass('active');
                        },
                        mouseOut: function () {
                            $(this.series.chart.xAxis[0].labelGroup.element.childNodes[this.x]).removeClass('active');
                        }
                    }
                },
                marker: {
                    lineWidth: 0,
                    radius: 6
                },
                connectNulls: true
            }
        },
        series: [{
                showInLegend: false,
                name: '20대',
                //data: [3.9, 4.2, 15.7, 19.5, 23.9, 37.2, 49.0, 70.1, 73.7, 78.2, null, null],
                data: [3.9, 4.2, 15.7, 19.5, 23.9, 37.2, 49.0, 70.1, 73.7, 78.2, 80.5, 78.2, null],
                zIndex: 1,
                lineWidth: 3,
                color: '#eb6100',
                marker: {
                    symbol: 'circle',
                    radius: 5,
                    states: {
                        hover: {
                            fillColor: '#FFFFFF',
                            lineColor: '#eb6100',
                            lineWidth: 4,
                        }
                    }
                },
    }, {
                showInLegend: false,
                name: '19대',
                data: [2.5, 9.4, 19.4, 24.5, 55.5, 59.9, 63.7, 67.1, 70.1, 72.7, 75.1, null, 77.2],
                zIndex: 0,
                fillOpacity: 1,
                color: '#bab9e3'
    },
            {
                showInLegend: false,
                name: '18대',
                data: [2.8, 11.6, 26.4, 34.9, 45.3, 52.6, 59.3, 65.2, 70.1, 75.8, null, null, null],
                zIndex: 0,
                fillOpacity: 1,
                color: '#e7e7e7'
    }]
    });
    //pointer 남기기
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

});
