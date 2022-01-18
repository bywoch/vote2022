var candidate_chart;
var candidateSeriesData = [];
var nowshowType = "jmsy";
var candidateArray = [
  "김동연",
  "박용진",
  "심상정",
  "안철수",
  "원희룡",
  "유승민",
  "윤석열",
  "이낙연",
  "이재명",
  "최재형",
  "추미애",
  "하태경",
  "홍준표",
  "황교안",
  "없음",
];

var candidateColor = {
  김동연: "#666",
  김두관: "#1e4d9b",
  박용진: "#1e4d9b",
  심상정: "#f7cc46",
  안철수: "#ce5f2c",
  오세훈: "#d93a35",
  원희룡: "#d93a35",
  유승민: "#d93a35",
  윤석열: "#d93a35",
  윤희숙: "#d93a35",
  이낙연: "#1e4d9b",
  이재명: "#1e4d9b",
  정세균: "#1e4d9b",
  최재형: "#d93a35",
  추미애: "#1e4d9b",
  하태경: "#d93a35",
  홍준표: "#d93a35",
  황교안: "#d93a35",
  없음: "#aaa",
  기타: "#7742cc",
};

var candidateSeriesData2Way1 = [];
var candidateSeriesData2Way2 = [];
var nowtype = "all";

var candiPlot = [
  { value: 1633827599000, zIndex: 1, label: { text: "민주당 후보 선출"} },
  { value: 1646820061000, zIndex: 1, label: { text: "20대 대선" } },
  { value: 1636094263000, zIndex: 1, label: { text: "국민의힘 후보 선출" } },
];

var lastCandidateDate = "";
var legendShow = ["윤석열, 이재명", "없음"];

function setCandidateLineChart() {
  $(".candi-party-chart .toggle-item").on("click", function () {
    $(".candi-party-chart .toggle-item").removeClass("active");
    $(this).addClass("active");
  });
  canditimeStampDayMatching();
  candimulti();
  candi2Way1();
  candi2Way2();
  $(".candiall").on("click", function () {
    $(this).addClass("active");
    console.log("ddd");
    makeCandiWayChart(candidateSeriesData);
  });
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
      max: 1647424861000,
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
        // The first returned item is the header, subsequent items are the
        // points
        return [
          "<div class='hth'><b>" +
            canditimeStampArray[this.x].month +
            "월 " +
            canditimeStampArray[this.x].week +
            "주</b></div>",
        ].concat(
          this.points
            ? this.points.map(function (point) {
                return (
                  "<div class='ht candi' style='width:150px; border-color:" +
                  point.series.color +
                  "'><span><img src = 'http://poll-mbc.co.kr/img/person/" +
                  point.series.name +
                  ".png' class='tooltip-img'><span>" +
                  point.series.name +
                  "</span></span><b style='color:" +
                  point.series.color +
                  "'>" +
                  point.y +
                  "%</b></div>"
                );
              })
            : []
        );
      },
      style: {
        fontSize: "14px",
      },
    },

    series: candidateSeriesData,
  });
  makeCandiWayChart(candidateSeriesData2Way1);
  candidate_chart.xAxis[0].update(
    {
      min: null,
    },
    true
  );

  $(".party-chart .toggle-item").on("click", function () {
    $(".party-chart .toggle-item").removeClass("active");
    nowtype = $(this).attr("type");
    $(this).addClass("active");
    if ($(this).attr("type") == "all") {
      candidate_chart.xAxis[0].update(
        { min: null, max: lastCandidateDate + 584000000 },
        true
      );
    } else if ($(this).attr("type") == "recent") {
      candidate_chart.xAxis[0].update(
        {
          min: lastCandidateDate - 31536000000,
          max: lastCandidateDate + 584000000,
        },
        true
      );
    } else {
      candidate_chart.xAxis[0].update({ min: null, max: 1647424861000 }, true);
    }
  });
}

var canditimeStampArray = [];
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

function candimulti() {
  $.each(candidateArray, function (i, cate) {
    var legendIsShow = false;
    if (
      cate == "윤석열" ||
      cate == "이재명" ||
      cate == "홍준표" ||
      cate == "유승민" ||
      cate == "원희룡"
    ) {
      legendIsShow = true;
    }
    candidateSeriesData.push({
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
    candidateSeriesData.push({
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
    candidateSeriesData.push({
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
  $.each(candidateApproveData, function (j, d) {
    $.each(candidateArray, function (i, data) {
      //   console.log(d);
      if (d[data + "_mean"] != "" && d[data + "_mean"]) {
        candidateSeriesData[i * 3].data.push([
          to_date(d.date),
          d[data + "_mean"],
        ]);
        candidateSeriesData[i * 3 + 1].data.push([
          to_date(d.date),
          d[data + "_lower"],
          d[data + "_upper"],
        ]);
      }
    });

    if (j === candidateApproveData.length - 1) {
      lastCandidateDate = to_date(candidateApproveData[j].date);
    }
  });
  $.each(candidateScatterData, function (i, d) {
    $.each(candidateArray, function (i, data) {
      if (d[data] != "") {
        candidateSeriesData[i * 3 + 2].data.push([to_date(d.date), d[data]]);
      }
    });
  });
}

function candi2Way1() {
  var candidateName2Way1 = ["이재명", "윤석열", "안철수", "심상정", "김동연", "없음"];
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
    candidateSeriesData2Way1.push({
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
  $.each(candidateApproveData2Way1, function (j, d) {
    $.each(candidateName2Way1, function (i, data) {
      //   console.log(d);
      if (d[data + "_mean"] != "" && d[data + "_mean"]) {
        candidateSeriesData2Way1[i * 3].data.push([
          to_date(d.date),
          d[data + "_mean"],
        ]);
        candidateSeriesData2Way1[i * 3 + 1].data.push([
          to_date(d.date),
          d[data + "_lower"],
          d[data + "_upper"],
        ]);
      }
    });

    if (j === candidateSeriesData2Way1 - 1) {
      lastCandidateDate = to_date(candidateSeriesData2Way1[j].date);
    }
  });
  $.each(candidateScatter2Way1Data, function (i, d) {
    $.each(candidateName2Way1, function (i, data) {
      if (d[data] != "") {
        candidateSeriesData2Way1[i * 3 + 2].data.push([
          to_date(d.start),
          d[data],
        ]);
      }
    });
  });
  $(".jmsy").on("click", function () {
    $(this).addClass("active");
    var seriesLength = candidate_chart.series.length;
    makeCandiWayChart(candidateSeriesData2Way1);
    nowshowType = "2way1";
    candidateQuote(nowshowType);
    candidate_chart.xAxis[0].update(
      {
        min: null,
      },
      true
    );
  });
}

function candi2Way2() {
  var candidateName2Way1 = ["이재명", "홍준표", "안철수", "심상정", "김동연", "없음"];
  $.each(candidateName2Way1, function (i, cate) {
    var legendIsShow = true;

    candidateSeriesData2Way2.push({
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
    candidateSeriesData2Way2.push({
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
    candidateSeriesData2Way2.push({
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
  $.each(candidateApproveData2Way2, function (j, d) {
    $.each(candidateName2Way1, function (i, data) {
      //   console.log(d);
      if (d[data + "_mean"] != "" && d[data + "_mean"]) {
        candidateSeriesData2Way2[i * 3].data.push([
          to_date(d.date),
          d[data + "_mean"],
        ]);
        candidateSeriesData2Way2[i * 3 + 1].data.push([
          to_date(d.date),
          d[data + "_lower"],
          d[data + "_upper"],
        ]);
      }
    });

    if (j === candidateSeriesData2Way2 - 1) {
      lastCandidateDate = to_date(candidateSeriesData2Way2[j].date);
    }
  });
  $.each(candidateScatter2Way2Data, function (i, d) {
    $.each(candidateName2Way1, function (i, data) {
      if (d[data] != "") {
        candidateSeriesData2Way2[i * 3 + 2].data.push([
          to_date(d.start),
          d[data],
        ]);
      }
    });
  });
  $(".jmjp").on("click", function () {
    $(this).addClass("active");
    console.log("ddd");
    makeCandiWayChart(candidateSeriesData2Way2);
    nowshowType = "2way2";
    candidateQuote(nowshowType);
    candidate_chart.xAxis[0].update(
      {
        min: null,
      },
      true
    );
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
        // The first returned item is the header, subsequent items are the
        // points
        return [
          "<div class='hth'><b>" +
            canditimeStampArray[this.x].month +
            "월 " +
            canditimeStampArray[this.x].week +
            "주</b></div>",
        ].concat(
          this.points
            ? this.points.map(function (point) {
                return (
                  "<div class='ht candi' style='width:150px; border-color:" +
                  point.series.color +
                  "'><span><img src = 'http://poll-mbc.co.kr/img/person/" +
                  point.series.name +
                  ".png' class='tooltip-img'><span>" +
                  point.series.name +
                  "</span></span><b style='color:" +
                  point.series.color +
                  "'>" +
                  point.y +
                  "%</b></div>"
                );
              })
            : []
        );
      },
      style: {
        fontSize: "14px",
      },
    },

    series: seriesData,
  });
  if ($(this).attr("type") == "all") {
    candidate_chart.xAxis[0].update(
      { min: null, max: lastCandidateDate + 584000000 },
      true
    );
  } else if ($(this).attr("type") == "recent") {
    candidate_chart.xAxis[0].update(
      {
        min: lastCandidateDate - 31536000000,
        max: lastCandidateDate + 584000000,
      },
      true
    );
  } else {
    candidate_chart.xAxis[0].update(
      { min: lastCandidateDate - 31536000000, max: 1647424861000 },
      true
    );
  }
}
