var lastPresidentDateValue;

function setPresdidentLineGraph(type) {
    timeStampDayMatching();
    $.each(presidentAttitude, function (i, cate) {
        seriesData.push({
            name: cate,
            data: [],

            zIndex: 1,
            lineWidth: 1.5,
            color: colorArray[cate],
            marker: {
                fillColor: "white",
                lineWidth: 1,
                lineColor: colorArray[cate],
                enabled: false,
            },
        });
        seriesData.push({
            name: cate,
            type: "arearange",
            lineWidth: 0,
            enableMouseTracking: false,
            linkedTo: ":previous",
            color: colorArray[cate],
            data: [],
            zIndex: 0,
            fillOpacity: 0.3,
            marker: {
                enabled: false,
            },
        });
        seriesData.push({
            name: cate,
            data: [],
            type: "scatter",
            enableMouseTracking: false,
            linkedTo: ":previous",
            opacity: 0.2,
            color: colorArray[cate],
        });
    });
    $.each(president_data, function (i, d) {
        seriesData[0].data.push([to_date(d.date), d.negative_mean]);
        seriesData[3].data.push([to_date(d.date), d.dk_mean]);
        seriesData[6].data.push([to_date(d.date), d.positive_mean]);

        seriesData[1].data.push([
      to_date(d.date),
      d.negative_lower,
      d.negative_upper,
    ]);
        seriesData[4].data.push([to_date(d.date), d.dk_lower, d.dk_upper]);
        seriesData[7].data.push([
      to_date(d.date),
      d.positive_lower,
      d.positive_upper,
    ]);
    });
    lastPresidentDateValue = seriesData[0].data[seriesData[0].data.length - 1][0];
    /*★$.each(president_scatter_data, function (i, d) {
        seriesData[2].data.push([to_date(d.date), d.부정]);
        seriesData[5].data.push([to_date(d.date), d.모름]);
        seriesData[8].data.push([to_date(d.date), d.긍정]);
    });*/
    
    /*대통령 국정수행평가 추이*/
    /*★president_chart = Highcharts.chart("president-container", {
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: [
        {
          max: 1652140799000,
          type: "datetime",
          labels: {
            formatter: function () {
              return Highcharts.dateFormat("%y년 %m월 %e일", this.value);
            },
          },
        },
      ],

      yAxis: {
        title: {
          text: null,
        },
        min: 0,
        max: 100,
      },
      plotOptions: {
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

        borderColor: "transparent",
        backgroundColor: "#FFFFFF",
        padding: 0,
        borderRadius: 5,
        useHTML: true,
        split: true,
        formatter: function () {
          // The first returned item is the header, subsequent items are the
          // points
          return [
            "<div class='hth'><b>" +
              timeStampArray[this.x].month +
              "월 " +
              timeStampArray[this.x].week +
              "주</b></div>",
          ].concat(
            this.points
              ? this.points.map(function (point) {
                  return (
                    "<div class='ht' style='border-color:" +
                    point.series.color +
                    "'><span>" +
                    point.series.name +
                    "</span><b style='color:" +
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
    $(".president-chart .toggle-item").on("click", function () {
      $(".president-chart .toggle-item").removeClass("active");
      $(this).addClass("active");
      if ($(this).attr("type") == "now") {
        president_chart.xAxis[0].update({ min: null }, true);
        president_chart.xAxis[0].update({ max: null }, true);
      } else if ($(this).attr("type") == "year") {
        president_chart.xAxis[0].update({ max: null }, true);
        president_chart.xAxis[0].update(
          { min: lastPresidentDateValue - 31536000000 },
          true
        );
      } else {
        president_chart.xAxis[0].update({ min: null }, true);
        president_chart.xAxis[0].update({ max: 1652140799000 }, true);
      }
    });*/
}

function to_date(date_str) {
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(5, 7);
    var sDate = yyyyMMdd.substring(8, 10);
    //console.log(new Date(Number(sYear), Number(sMonth) - 1, Number(sDate)));
    //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
    return Date.UTC(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

var timeStampArray = [];

function timeStampDayMatching() {
    $.each(president_data, function (i, d) {
        timeStampArray[to_date(d.date)] = {
            year: d.year,
            month: d.month,
            week: d.week,
            week2: d.week2,
        };
    });
}
