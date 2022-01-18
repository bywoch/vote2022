var candiChartArray = [];
// 메인에 보여줄 대선주자 4명
var notsorted = ["윤석열", "이재명", "안철수", "심상정"];
var main_president_candidate_view = ["윤석열", "이재명", "안철수", "심상정"];

var mainMiniLastCandidateData;

function setCandidateMiniChart() {
    var chartArray = $(".president-candidate-chart");
    var chartSeries = [];

    mainMiniLastCandidateData = to_date(
        candidateApproveData2Way1[candidateApproveData2Way1.length - 1].date
    );

    var unsortedData = [];
    $.each(notsorted, function (i, d) {
        unsortedData[i] = {
            name: d,
            value: candidateApproveData2Way1[candidateApproveData2Way1.length - 1][d + "_mean"] ?
                candidateApproveData2Way1[candidateApproveData2Way1.length - 1][d + "_mean"] : candidateApproveData2Way1[candidateApproveData2Way1.length - 2][d + "_mean"],
        };
    });

    unsortedData.sort(function (a, b) {
        return b.value - a.value;
    });

    $.each(unsortedData, function (i, d) {
        main_president_candidate_view[i] = unsortedData[i].name;
    });

    $.each(main_president_candidate_view, function (i, d) {
        chartSeries.push({
            name: "",
            type: "spline",
            color: partyColor[personInfo[d].party],
            data: [],
            lineWidth: 2,
        });

        /*★$(".mini-graph.c" + i).css(
            "background-image",
            "url(http://poll-mbc.co.kr/img/person/" + d + ".png)"
        );
        $(".mini-graph.c" + i + " .name").html(d);
        $(".mini-graph.c" + i + " .percent").html("0");
        $(".mini-graph.c" + i + " .percent.counter").attr(
            "data-count",
            unsortedData[i].value
        );
        console.log(unsortedData[i].value)
        $(".mini-graph.c" + i + " .name").css(
            "color",
            partyColor[personInfo[d].party]
        );*/
        
    });

    $.each(candidateApproveData2Way1, function (i, d) {
        $.each(main_president_candidate_view, function (j, data) {
            if (d[data + "_mean"]) {
                chartSeries[j].data.push([to_date(d.date), d[data + "_mean"]]);
            }
        });
    });
    $.each(chartArray, function (i, d) {
        makeCandidateChart(i, chartSeries[i]);
    });
}

function makeCandidateChart(index, data) {
    candiChartArray[index] = Highcharts.chart(
        "president-candidate-chart-" + index, {
            title: {
                text: "",
            },
            chart: {
                spacingBottom: 0,
            },

            yAxis: {
                title: {
                    text: "Number of Employees",
                },
                min: 0,
                max: 60,
                visible: false,
            },

            xAxis: {
                type: "datetime",
                crosshair: true,

                min: mainMiniLastCandidateData - 31536000000,
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat("%y년 %m월", this.value);
                    },
                },
                events: {
                    setExtremes: syncExtremes,
                },
            },

            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
                enabled: false,
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    marker: {
                        enabled: false,
                    },
                    pointStart: 2010,
                },
            },
            tooltip: {
                formatter: function () {
                    return (
                        "" +
                        canditimeStampArray[this.x].month +
                        "월 " +
                        canditimeStampArray[this.x].week +
                        "주<br>" +
                        "지지율 : <b>" +
                        this.y +
                        "%</b>"
                    );
                },
                style: {
                    fontSize: "14px",
                },
            },

            series: [data],
            credits: {
                enabled: false,
            },
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
          },
        ],
            },
        }
    );

    /*
The purpose of this demo is to demonstrate how multiple charts on the same page
can be linked through DOM and Highcharts events and API methods. It takes a
standard Highcharts config with a small variation for each data set, and a
mouse/touch event handler to bind the charts together.
*/

    /**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
  ["mousemove", "touchmove", "touchstart"].forEach(function (eventType) {
        document
            .getElementById("charts-container")
            .addEventListener(eventType, function (e) {
                var chart, point, i, event;

                for (i = 0; i < candiChartArray.length; i = i + 1) {
                    chart = candiChartArray[i];
                    // Find coordinates within the chart
                    event = chart.pointer.normalize(e);
                    event.chartX = e.offsetX;
                    // console.log(chart.pointer);
                    // Get the hovered point
                    point = chart.series[0].searchPoint(event, true);
                    // console.log(point);
                    if (point) {
                        point.highlight(e);
                    }
                }
            });
    });

    /**
     * Override the reset function, we don't need to hide the tooltips and
     * crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    Highcharts.Point.prototype.highlight = function (event) {
        event = this.series.chart.pointer.normalize(event);
        this.onMouseOver(); // Show the hover marker
        this.series.chart.tooltip.refresh(this); // Show the tooltip
        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== "syncExtremes") {
            // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) {
                        // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                            trigger: "syncExtremes",
                        });
                    }
                }
            });
        }
    }
}
