var lastPresidentDateValue;

function setPresdidentLineGraph(type) {
    timeStampDayMatching();
    // 반복문: presidentAttitude의 각 카테고리에 대한 처리
$.each(presidentAttitude, function (i, cate) {
  // 시리즈 데이터에 현재 카테고리에 관한 정보 추가

  // 라인 차트 시리즈 추가
  seriesData.push({
      name: cate,
      data: [], // 라인 차트 데이터 배열

      zIndex: 1,
      lineWidth: 1.5,
      color: colorArray[cate], // 시리즈 색상
      marker: {
          fillColor: "white",
          lineWidth: 1,
          lineColor: colorArray[cate],
          enabled: false,
      },
  });

  // 영역 범위 차트 시리즈 추가
  seriesData.push({
      name: cate,
      type: "arearange", // 영역 범위 차트 유형
      lineWidth: 0, // 라인 굵기 설정
      enableMouseTracking: false,
      linkedTo: ":previous", // 이전 시리즈에 연결
      color: colorArray[cate], // 시리즈 색상
      data: [], // 데이터 배열

      zIndex: 0,
      fillOpacity: 0.3, // 채우기 영역의 투명도
      marker: {
          enabled: false,
      },
  });

  // 산점도 차트 시리즈 추가
  seriesData.push({
      name: cate,
      data: [], // 산점도 데이터 배열
      type: "scatter", // 산점도 차트 유형
      enableMouseTracking: false,
      linkedTo: ":previous", // 이전 시리즈에 연결
      opacity: 0.2, // 산점도 투명도
      color: colorArray[cate], // 시리즈 색상
  });
});

// 반복문: president_data의 각 데이터에 대한 처리
$.each(president_data, function (i, d) {
  // 각 시리즈 데이터 배열에 데이터 추가

  // 부정적 의견 시리즈 데이터 추가
  seriesData[0].data.push([to_date(d.date), d.negative_mean]);

  // 중립적 의견 시리즈 데이터 추가
  seriesData[3].data.push([to_date(d.date), d.dk_mean]);

  // 긍정적 의견 시리즈 데이터 추가
  seriesData[6].data.push([to_date(d.date), d.positive_mean]);

  // 부정적 의견의 하한, 상한 값 시리즈 데이터 추가
  seriesData[1].data.push([
      to_date(d.date),
      d.negative_lower,
      d.negative_upper,
  ]);

  // 중립적 의견의 하한, 상한 값 시리즈 데이터 추가
  seriesData[4].data.push([
      to_date(d.date),
      d.dk_lower,
      d.dk_upper,
  ]);

  // 긍정적 의견의 하한, 상한 값 시리즈 데이터 추가
  seriesData[7].data.push([
      to_date(d.date),
      d.positive_lower,
      d.positive_upper,
  ]);
});

// 마지막 데이터의 날짜 값을 저장
lastPresidentDateValue = seriesData[0].data[seriesData[0].data.length - 1][0];

    
}

// 함수: 날짜 문자열을 날짜 객체로 변환
function to_date(date_str) {
  var yyyyMMdd = String(date_str);
  var sYear = yyyyMMdd.substring(0, 4);
  var sMonth = yyyyMMdd.substring(5, 7);
  var sDate = yyyyMMdd.substring(8, 10);
  // UTC 시간을 사용하여 날짜 객체 생성
  return Date.UTC(Number(sYear), Number(sMonth) - 1, Number(sDate));
}

// 배열: 날짜별 데이터의 정보를 저장하기 위한 배열
var timeStampArray = [];

// 함수: 날짜와 데이터 정보를 매칭하여 배열에 저장
function timeStampDayMatching() {
  // president_data 배열의 각 데이터에 대한 처리
  $.each(president_data, function (i, d) {
      // 날짜를 날짜 객체로 변환하여 timeStampArray에 저장
      timeStampArray[to_date(d.date)] = {
          year: d.year,
          month: d.month,
          week: d.week,
          week2: d.week2,
      };
  });
}

