var partyMiniArray = [
  "더불어민주당",
  "국민의힘",
  "정의당",
  "국민의당",
  "열린민주당",
];

var partyApprove = [
  {
    party: "더불어민주당",
  },
  {
    party: "국민의힘",
  },
  {
    party: "정의당",
  },
  {
    party: "국민의당",
  },
  {
    party: "열린민주당",
  },
];

function setPartyApproveGraph() {
  var partyApproveHtml = "";
  $.each(partyMiniArray, function (i, d) {
    if (d == "국민의당") {
      d = "국민의당2";
    }
  });
    
  /*$.each(partyApprove, function (i, d) {
    if (d.party == "국민의당") {
      d.party = "국민의당2";
    }
    partyApproveHtml += "<div class='bar-container'>";
    partyApproveHtml +=
      "<img class='party-thumb' src='http://poll-mbc.co.kr/img/party/" +
      d.party +
      "_thumb.png' style='width:30px;height:30px; margin-left:10px;'>";
    partyApproveHtml +=
      "<div class='party-approve-bar' party='" +
      d.party +
      "' value='" +
      partyApproveChartData[partyApproveChartData.length - 1][
        d.party + "_mean"
      ] +
      "' style='width:" +
      partyApproveChartData[partyApproveChartData.length - 1][
        d.party + "_mean"
      ] +
      "%;background-color:" +
      partyColor[d.party] +
      "'>";
    partyApproveHtml += "</div>";
    partyApproveHtml +=
      "<div class='text-shadow' style='margin-left:10px; font-weight:bold; color:" +
      partyColor[d.party] +
      "'>" +
      partyApproveChartData[partyApproveChartData.length - 1][
        d.party + "_mean"
      ] +
      "%";
    partyApproveHtml += "</div>";
    partyApproveHtml += "</div>";
  });
  $(".party-approve-container").html(partyApproveHtml);
  $(".party-approve-bar").on("mouseover", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    openPartyApproveModal($(this).attr("party"), $(this).attr("value"));
  });
  $(".party-approve-bar").on("mouseleave", function (event) {});
  $(".party-approve-bar").on("click", function () {
    partyMiniData($(this).attr("party"));
    closePartyApproveModal();
  });*/
}
function openPartyApproveModal(party, approve) {
  $(".party-approve-modal").fadeIn();
  $(".party-approve-modal").css("top", mouseY - 10);
  $(".party-approve-modal").css("left", mouseX + 20);
  $(".party-text").html(party);
  $(".party-approve").html(" " + approve + "%");
}
function closePartyApproveModal() {
  $(".party-approve-modal").fadeOut();
}

/*정당 지지도*/
function partyMiniData(party) {
  /*var partyMiniSeries = [
    {
      name:"",
      type: "spline",
      color: partyColor[party],
      data: [],
      marker: {
        enabled: false,
      },
    },
  ];*/
    
  /*$.each(partyApproveChartData, function (i, d) {
    if (d[party + "_mean"]) {
      partyMiniSeries[0].data.push([to_date(d.date), d[party + "_mean"]]);
    }
  });
  Highcharts.chart("party-approve-mini-chart", {
    title: {
      text: "",
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
      min: 0,

      visible: false,
    },

    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%y년 %m월", this.value);
        },
      },
    },

    tooltip: {
      formatter: function () {
        return (
          timeStampToDate(this.x) + "<br>  지지율 : <b>" + this.y + "%</b>"
        );
      },
      style: {
        fontSize: "14px",
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
        pointStart: 2010,
      },
    },

    series: partyMiniSeries,
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
  });
  if (party == "국민의당2") {
    $(".party-approve-name").html("국민의당");
  } else {
    $(".party-approve-name").html(party);
  }
  $(".party-approve-img").attr("src", "http://poll-mbc.co.kr/img/party/" + party + "_thumb.png");
  $(".party-approve-name").css("color", partyColor[party]);*/
}
