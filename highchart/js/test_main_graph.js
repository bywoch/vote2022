var candidate_chart;
var canditimeStampArray = [];
var candidateSeriesData2Way1 = [];
var candidateColor = {
    이재명: "#1e4d9b",
    윤석열: "#d93a35",
    안철수: "#ce5f2c",
    심상정: "#f7cc46",
};
var candiPlot = [{
    value: 1633827599000,
    zIndex: 1,
    label: {
        text: "민주당 후보 선출"
    }
}, {
    value: 1636094263000,
    zIndex: 1,
    label: {
        text: "국민의힘 후보 선출"
    }
},];
var lastCandidateDate = "";

function to_date(date_str) {
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(5, 7);
    var sDate = yyyyMMdd.substring(8, 10);
    return Date.UTC(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

function canditimeStampDayMatching() {
    $.each(candidateApproveData, function (i, d) {
        console.log();
        canditimeStampArray[to_date(d.date)] = {
            year: d.year,
            month: d.month,
            week: d.week,
            week2: d.week2,
        };
    });
}

function candi2Way1() {
    var candidateName2Way1 = ["이재명", "윤석열", "안철수", "심상정"];
    $.each(candidateName2Way1, function (i, cate) {
        var legendIsShow = true;
        candidateSeriesData2Way1.push({
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
        candidateSeriesData2Way1.push({
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
    });
    $.each(candidateApproveData2Way1, function (j, d) {
        $.each(candidateName2Way1, function (i, data) {
            if (d[data + "_mean"] != "" && d[data + "_mean"]) {
                candidateSeriesData2Way1[i * 2].data.push([to_date(d.date), d[data + "_mean"],]);
                candidateSeriesData2Way1[i * 2 + 1].data.push([to_date(d.date), d[data + "_lower"], d[data + "_upper"],]);
            }
        });
        if (j === -1) {
            lastCandidateDate = to_date(candidateSeriesData2Way1[j].date);
        }
    });
}

function makeCandiWayChart(seriesData) {
    candidate_chart = Highcharts.chart("candidate-container", {
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
            },
            min: lastCandidateDate - 31536000000,
            max: lastCandidateDate + 584000000,
        },
        chart: {
            spacingLeft: 0,
        },
        yAxis: {
            title: {
                text: null,
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
                // The first returned item is the header, subsequent items are the
                // points
                return ["<div class='hth'><b>" + canditimeStampArray[this.x].month + "월 " + canditimeStampArray[this.x].week + "주</b></div>",].concat(
                    this.points ?
                        this.points.map(function (point) {
                            return ("<div class='ht candi' style='width:150px; border-color:" + point.series.color + "'><span><img src = 'http://poll-mbc.co.kr/img/person/" + point.series.name + ".png' class='tooltip-img'><span>" + point.series.name + "</span></span><b style='color:" + point.series.color + "'>" + point.y + "%</b></div>");
                        }) : []
                );
            },
            style: {
                fontSize: "14px",
            },
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        series: seriesData,
    });
    if ($(this).attr("type") == "all") {
        candidate_chart.xAxis[0].update({
            min: null,
            max: lastCandidateDate + 584000000
        }, true);
    } else if ($(this).attr("type") == "recent") {
        candidate_chart.xAxis[0].update({
            min: lastCandidateDate - 31536000000,
            max: lastCandidateDate + 584000000,
        }, true);
    } else {
        candidate_chart.xAxis[0].update({
            min: lastCandidateDate - 31536000000,
            max: 1647424861000
        }, true);
    }
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };
}
