var candidate_chart;
var dailyCandi = [];

var candidateColor = {
    심상정: "#f7cc46",
    안철수: "#ce5f2c",
    윤석열: "#d93a35",
    이재명: "#1e4d9b",
    없음: "#aaa",
};
var dailyCandiWay = ["이재명", "윤석열", "안철수", "심상정", "없음"];

var candiPlot = [
    {
        value: 1633827599000,
        zIndex: 1,
        label: {
            text: "민주당 후보 선출"
        }
    },
    {
        value: 1646820061000,
        zIndex: 1,
        label: {
            text: "20대 대선"
        }
    },
    {
        value: 1636094263000,
        zIndex: 1,
        label: {
            text: "국민의힘 후보 선출"
        }
    },
];

var lastCandidateDate = "";

function to_date(date_str) {
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(5, 7);
    var sDate = yyyyMMdd.substring(8, 10);
    //console.log(new Date(Number(sYear), Number(sMonth) - 1, Number(sDate)));
    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);

    return Date.UTC(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

$(document).ready(function () {
    setCandidateLineChart();
});

function setCandidateLineChart() {
    $.each(dailyCandiWay, function (i, cate) {
        var legendIsShow = true;
        dailyCandi.push({
            name: cate,
            data: [],
            visible: legendIsShow,
            zIndex: 1,
            lineWidth: 1.5,
            color: candidateColor[cate],
            marker: {
                fillColor: "white",
                lineWidth: 1,
                lineColor: candidateColor[cate],
            },
        });
        dailyCandi.push({
            name: cate,
            type: "arearange",
            lineWidth: 0,
            enableMouseTracking: false,
            linkedTo: ":previous",
            color: candidateColor[cate],
            data: [],
            zIndex: 0,
            fillOpacity: 0.3,
            marker: {
                enabled: false,
            },
        });
        dailyCandi.push({
            name: cate,
            data: [],
            type: "scatter",
            visible: legendIsShow,
            enableMouseTracking: false,
            linkedTo: ":previous",
            opacity: 0.2,
            color: candidateColor[cate],
        });
    });

    // dailyApprove는 아래 링크 로드
    // http://poll-mbc.co.kr/data/new/dailyApprove.js

    $.each(dailyApprove, function (j, d) {
        $.each(dailyCandiWay, function (i, data) {
            if (d["mean-" + data] != "" && d["mean_" + data]) {
                dailyCandi[i * 3].data.push([to_date(d.date), d["mean_" + data]]);
                dailyCandi[i * 3 + 1].data.push([
          to_date(d.date),
          d["lower_" + data],
          d["upper_" + data],
        ]);
            }
        });
    });

    // candidateScatter2Way1Data는 아래 링크 로드
    // http://poll-mbc.co.kr/data/candidate_scatter_two_1.js

    $.each(candidateScatter2Way1Data, function (i, d) {
        $.each(dailyCandiWay, function (i, data) {
            if (d[data] != "") {
                dailyCandi[i * 3 + 2].data.push([to_date(d.start), d[data]]);
            }
        });
    });

    // new-chart-candidate 이거 바꿔주시면 됩니다.
    candidate_chart = Highcharts.chart("new-chart-candidate", {
        title: {
            text: "",
        },
        credits: {
            enabled: false,
        },
        xAxis: {
            type: "datetime",
            plotLines: candiPlot,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat("%y년 %m월 %e일", this.value);
                },
                style: {
                    fontSize: "10px",
                },
            },
            min: lastCandidateDate - 31536000000,
            max: 1647424861000,
            verticalAlign: 'top',
        },
        chart: {
            spacingLeft: 0,
            zoomType: "x",
        },
        yAxis: {
            title: {
                text: null,
            },
            labels: {
                style: {
                    fontSize: "10px",
                },
            },
            min: 0,
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false,
                },
            },
            arearange: {
                tooltip: {
                    enabled: false,
                },
            },
            scatter: {
                marker: {
                    radius: 3,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: "rgb(100,100,100)",
                        },
                    },
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false,
                        },
                    },
                },

                tooltip: {
                    headerFormat: "<b>{point.y}</b><br>",
                    pointFormat: "{point.x} cm, {point.y} kg",
                },
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            split: true,
            useHTML: true,
            borderColor: "transparent",
            backgroundColor: "#FFFFFF",
            padding: 0,
            borderRadius: 5,
            formatter: function () {
                return [
          "<div class='hth'><b>" + yyyymmdd(this.x) + "</b></div>",
        ].concat(
                    this.points ?
                    this.points.map(function (point) {
                        return (
                            "<div class='ht candi' style='border-color:" +
                            point.series.color +
                            "'><span><img src = 'http://poll-mbc.co.kr/img/person/" +
                            point.series.name +
                            ".png' class='tooltip-img'><span>" +
                            point.series.name +
                            "</span></span><span style='font-weight:500; color:" +
                            point.series.color +
                            "'>" +
                            point.y +
                            "%</span></div>"
                        );
                    }) : []
                );
            },
            style: {
                fontSize: "14px",
            },
            /*positioner: function (labelWidth, labelHeight, point) {
                return {
                    x: point.plotX + 50,
                    y: point.plotY + 50,
                }
            },*/
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        series: dailyCandi,
    });

    candidate_chart.xAxis[0].update({
            min: 1631491200000, //날짜 9월3주 시작 (9월 13일)
            max: 1647424861000,
        }, // 3월 16일까지
        true
    );
    //pointer 남기기
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };
}

function yyyymmdd(timestamp) {
    var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
        dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
        ampm = "AM",
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = "PM";
    } else if (hh === 12) {
        h = 12;
        ampm = "PM";
    } else if (hh == 0) {
        h = 12;
    }

    time = yyyy + "년 " + mm + "월 " + dd + "일";

    return time;
}
