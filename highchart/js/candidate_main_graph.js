var candidate_chart;
var canditimeStampArray = [];
var candidateSeriesData = [];
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
var candiPlot = [
  { value: 1633827599000, zIndex: 1, label: { text: "민주당 후보 선출"} },
  { value: 1646820061000, zIndex: 1, label: { text: "20대 대선" } },
  { value: 1636094263000, zIndex: 1, label: { text: "국민의힘 후보 선출" } },
];
var lastCandidateDate = "";
var nowtype = "all";
var nowshowType = "jmsy";
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
  // 후보자 데이터를 시각화하는 Highcharts 차트 생성
candidate_chart = Highcharts.chart("candidate-container", {
  // 차트 제목 설정
  title: {
    text: "",
  },
  // 크레딧 표시 비활성화
  credits: {
    enabled: false,
  },
  // x축 설정
  xAxis: {
    type: "datetime",
    plotLines: candiPlot, // 플롯 라인 설정 (아마도 세로로 선을 그리는 역할)
    labels: {
      // x축 라벨 포맷 설정
      formatter: function () {
        return Highcharts.dateFormat("%y년 %m월 %e일", this.value);
      },
    },
    min: lastCandidateDate - 31536000000, // x축 최소값 설정
    max: 1647424861000, // x축 최대값 설정
  },

  // 차트 전체 설정
  chart: {
    spacingLeft: 0, // 왼쪽 간격 설정
  },
  // y축 설정
  yAxis: {
    title: {
      text: null, // y축 제목 설정 없음
    },
    min: 0, // y축 최소값 설정
  },
  // plotOptions 설정
  plotOptions: {
    // line 시리즈 옵션 설정
    line: {
      marker: {
        enabled: false, // 마커 비활성화
      },
    },
    // arearange 시리즈 옵션 설정
    arearange: {
      tooltip: {
        enabled: false, // 툴팁 비활성화
      },
    },
    // scatter 시리즈 옵션 설정
    scatter: {
      marker: {
        radius: 3, // 마커 반경 설정
        states: {
          hover: {
            enabled: true, // 호버 시 마커 활성화
            lineColor: "rgb(100,100,100)", // 호버 시 마커 테두리 색상 설정
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false, // 호버 시 마커 비활성화
          },
        },
      },
      tooltip: {
        // 툴팁 포맷 설정
        headerFormat: "<b>{point.y}</b><br>",
        pointFormat: "{point.x} cm, {point.y} kg",
      },
    },
  },

  // 전체 툴팁 설정
  tooltip: {
    crosshairs: true, // 십자선 표시
    shared: true, // 공유된 툴팁 사용
    split: true, // 분할된 툴팁 사용
    useHTML: true, // HTML 사용
    borderColor: "transparent", // 툴팁 테두리 색상 투명 설정
    backgroundColor: "#FFFFFF", // 툴팁 배경색 설정
    padding: 0, // 툴팁 패딩 설정
    borderRadius: 5, // 툴팁 테두리 반경 설정
    formatter: function () {
      // 툴팁 컨텐츠 포맷 설정
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
                "'><span><img src = '/img/person/" +
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
      fontSize: "14px", // 툴팁 폰트 크기 설정
    },
  },

  // 시리즈 데이터 설정
  series: candidateSeriesData,
});

  makeCandiWayChart(candidateSeriesData2Way1);
  // candidate_chart의 xAxis[0]에서 최소값(min)을 업데이트
candidate_chart.xAxis[0].update(
  {
    min: null, // 최소값을 null로 설정하여 자동으로 계산하도록 함
  },
  true // 애니메이션 효과 적용
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

function canditimeStampDayMatching() {
  // candidateApproveData 배열의 각 요소에 대해 반복
  $.each(candidateApproveData, function (i, d) {
    // to_date 함수를 사용하여 날짜를 변환하여 canditimeStampArray에 매칭
    canditimeStampArray[to_date(d.date)] = {
      year: d.year, // 연도 정보
      month: d.month, // 월 정보
      week: d.week, // 주 정보
      week2: d.week2, // 두 번째 주 정보
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
    // 후보자 시리즈 데이터 구성 (라인 차트와 빈 영역 차트)
    candidateSeriesData.push({
      name: cate,
      data: [], // 라인 차트 데이터
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
      linkedTo: ":previous", // 이전 시리즈와 연결
      color: candidateColor[cate],
      data: [], // 빈 영역 차트 데이터
      zIndex: 0,
      fillOpacity: 0.3,
      marker: {
        enabled: false,
      },
    });
  });

  // 후보자 승인 데이터를 반복하면서 차트 데이터 구성
  $.each(candidateApproveData, function (j, d) {
    $.each(candidateArray, function (i, data) {
      if (d[data + "_mean"] != "" && d[data + "_mean"]) {
        // 라인 차트 데이터 추가
        candidateSeriesData[i * 3].data.push([
          to_date(d.date),
          d[data + "_mean"],
        ]);
        // 빈 영역 차트 데이터 추가
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

  // 후보자 산포 데이터를 반복하면서 차트 데이터 구성
  $.each(candidateScatterData, function (i, d) {
    $.each(candidateArray, function (i, data) {
      if (d[data] != "") {
        // 산포 차트 데이터 추가
        candidateSeriesData[i * 3 + 2].data.push([to_date(d.date), d[data]]);
      }
    });
  });
}


function candi2Way1() {
  var candidateName2Way1 = ["이재명", "윤석열", "안철수", "심상정", "김동연", "없음"];
  // 후보자 2-way 차트 시리즈 데이터 구성
  $.each(candidateName2Way1, function (i, cate) {
    var legendIsShow = true;
    // 라인 차트 데이터 추가
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
    // 빈 영역 차트 데이터 추가
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
    // 산포 차트 데이터 추가
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

  // 후보자 승인 데이터를 반복하면서 2-way 차트 데이터 구성
  $.each(candidateApproveData2Way1, function (j, d) {
    $.each(candidateName2Way1, function (i, data) {
      if (d[data + "_mean"] != "" && d[data + "_mean"]) {
        // 라인 차트 데이터 추가
        candidateSeriesData2Way1[i * 3].data.push([
          to_date(d.date),
          d[data + "_mean"],
        ]);
        // 빈 영역 차트 데이터 추가
        candidateSeriesData2Way1[i * 3 + 1].data.push([
          to_date(d.date),
          d[data + "_lower"],
          d[data + "_upper"],
        ]);
      }
    });

    if (j === candidateApproveData2Way1 - 1) {
      lastCandidateDate = to_date(candidateApproveData2Way1[j].date);
    }
  });

  // 후보자 산포 데이터를 반복하면서 2-way 차트 데이터 구성
  $.each(candidateScatter2Way1Data, function (i, d) {
    $.each(candidateName2Way1, function (i, data) {
      if (d[data] != "") {
        // 산포 차트 데이터 추가
        candidateSeriesData2Way1[i * 3 + 2].data.push([
          to_date(d.start),
          d[data],
        ]);
      }
    });
  });

  // 클릭 이벤트 핸들러
  $(".jmsy").on("click", function () {
    $(this).addClass("active");
    var seriesLength = candidate_chart.series.length;
    // 2-way 차트 생성 및 보기 설정
    makeCandiWayChart(candidateSeriesData2Way1);
    nowshowType = "2way1";
    candidateQuote(nowshowType);
    // x축 업데이트
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
  // 후보자 2-way 차트 시리즈 데이터 구성
  $.each(candidateName2Way1, function (i, cate) {
    var legendIsShow = true;
    // 라인 차트 데이터 추가
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
    // 빈 영역 차트 데이터 추가
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
    // 산포 차트 데이터 추가
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

  // 후보자 승인 데이터를 반복하면서 2-way 차트 데이터 구성
  $.each(candidateApproveData2Way2, function (j, d) {
    $.each(candidateName2Way1, function (i, data) {
      if (d[data + "_mean"] != "" && d[data + "_mean"]) {
        // 라인 차트 데이터 추가
        candidateSeriesData2Way2[i * 3].data.push([
          to_date(d.date),
          d[data + "_mean"],
        ]);
        // 빈 영역 차트 데이터 추가
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

  // 후보자 산포 데이터를 반복하면서 2-way 차트 데이터 구성
  $.each(candidateScatter2Way2Data, function (i, d) {
    $.each(candidateName2Way1, function (i, data) {
      if (d[data] != "") {
        // 산포 차트 데이터 추가
        candidateSeriesData2Way2[i * 3 + 2].data.push([
          to_date(d.start),
          d[data],
        ]);
      }
    });
  });

  // 클릭 이벤트 핸들러
  $(".jmjp").on("click", function () {
    $(this).addClass("active");
    console.log("ddd");
    // 2-way 차트 생성 및 보기 설정
    makeCandiWayChart(candidateSeriesData2Way2);
    nowshowType = "2way2";
    candidateQuote(nowshowType);
    // x축 업데이트
    candidate_chart.xAxis[0].update(
      {
        min: null,
      },
      true
    );
  });
}


// 함수: makeCandiWayChart
// 설명: 후보자 2-way 차트를 생성하고 설정하는 함수
// 매개변수: seriesData - 차트에 표시될 데이터 시리즈
function makeCandiWayChart(seriesData) {
  // Highcharts 라이브러리를 사용하여 'candidate-container' 요소에 차트를 생성
  candidate_chart = Highcharts.chart("candidate-container", {
    title: {
      text: "", // 차트 제목은 빈 문자열로 설정
    },
    credits: {
      enabled: false, // 크레딧 텍스트를 비활성화
    },
    xAxis: {
      type: "datetime", // x축 타입을 날짜/시간 형식으로 설정
      plotLines: candiPlot, // x축에 추가로 그릴 세로 선을 설정 (candiPlot 변수로 전달된 값)
      labels: {
        formatter: function () {
          // x축 레이블 형식을 설정하는 함수
          return Highcharts.dateFormat("%y년 %m월 %e일", this.value); // 날짜 형식을 지정하여 반환
        },
      },
      min: lastCandidateDate - 31536000000, // x축 최소값 설정 (1년 전)
      max: lastCandidateDate + 584000000, // x축 최대값 설정 (9일 후)
    },

    chart: {
      spacingLeft: 0, // 차트 좌측 간격을 0으로 설정
    },
    yAxis: {
      title: {
        text: null, // y축 제목을 비활성화
      },
      min: 0, // y축 최소값을 0으로 설정
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false, // 라인 차트의 마커 비활성화
        },
      },
      arearange: {
        tooltip: {
          enabled: false, // 영역 범위 차트의 툴팁 비활성화
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
      crosshairs: true, // 교차선 형태의 crosshair 표시
      shared: true, // 동시에 여러 시리즈의 데이터를 표시하는 공유 툴팁
      split: true, // 분리된 형태의 툴팁 사용
      useHTML: true, // HTML 형식의 툴팁 사용
      borderColor: "transparent", // 툴팁 테두리 색상을 투명하게 설정
      backgroundColor: "#FFFFFF", // 툴팁 배경색을 흰색으로 설정
      padding: 0, // 툴팁의 패딩을 0으로 설정
      borderRadius: 5, // 툴팁의 둥근 모서리 반경을 설정
      formatter: function () {
        // 툴팁 내용을 포맷하는 함수
        // 첫 번째 반환 항목은 헤더, 그 다음 항목은 각 데이터 포인트
        return [
          "<div class='hth'><b>" +
            canditimeStampArray[this.x].month +
            "월 " +
            canditimeStampArray[this.x].week +
            "주</b></div>",
        ].concat(
          this.points
            ? this.points.map(function (point) {
                // 데이터 포인트마다 툴팁 내용을 설정
                return (
                  "<div class='ht candi' style='width:150px; border-color:" +
                  point.series.color +
                  "'><span><img src='/img/person/" +
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
        fontSize: "14px", // 툴팁 폰트 크기 설정
      },
    },

    series: seriesData, // 시리즈 데이터 설정
  });

  // 클릭 이벤트에 따라 x축 범위 업데이트
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

