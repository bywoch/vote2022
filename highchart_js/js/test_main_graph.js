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

// 날짜 문자열을 타임스탬프로 변환하는 함수
function to_date(date_str) {
    // 날짜 문자열을 yyyy-MM-dd 형식으로 받아옴
    var yyyyMMdd = String(date_str);

    // 날짜 문자열에서 연도, 월, 일을 추출하여 변수에 저장
    var sYear = yyyyMMdd.substring(0, 4);    // 연도 추출
    var sMonth = yyyyMMdd.substring(5, 7);   // 월 추출
    var sDate = yyyyMMdd.substring(8, 10);   // 일 추출

    // 추출한 연도, 월, 일을 이용하여 Date.UTC 함수를 이용하여 타임스탬프로 변환하여 반환
    // Date.UTC 함수는 연도, 월, 일을 입력받아 해당 날짜의 타임스탬프를 반환하는 내장 함수
    return Date.UTC(Number(sYear), Number(sMonth) - 1, Number(sDate));
}


// 후보자 데이터와 타임스탬프 데이터를 매칭하는 함수
function canditimeStampDayMatching() {
    // candidateApproveData 배열을 반복하며 각 데이터의 정보를 타임스탬프 배열에 추가
    $.each(candidateApproveData, function (i, d) {
        // to_date 함수를 통해 날짜 문자열을 타임스탬프로 변환하여 사용
        // 변환된 타임스탬프를 이용하여 타임스탬프 배열에 연도, 월, 주 등의 정보를 매칭
        canditimeStampArray[to_date(d.date)] = {
            year: d.year,       // 해당 데이터의 연도
            month: d.month,     // 해당 데이터의 월
            week: d.week,       // 해당 데이터의 주
            week2: d.week2,     // 해당 데이터의 두 번째 주
        };
    });
}


function candi2Way1() {
    // 후보자 이름 배열 선언
    var candidateName2Way1 = ["이재명", "윤석열", "안철수", "심상정"];

    // 각 후보자별로 시리즈 데이터를 생성하고 설정하는 반복문
    $.each(candidateName2Way1, function (i, cate) {
        var legendIsShow = true;

        // 해당 후보자의 선 그래프 시리즈 데이터 생성
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

        // 해당 후보자의 에리어 레인지 그래프 시리즈 데이터 생성
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

    // 후보자별 데이터를 반복하며 시리즈 데이터에 추가하는 반복문
    $.each(candidateApproveData2Way1, function (j, d) {
        // 각 데이터에서 각 후보자의 값을 확인하며 시리즈 데이터에 추가
        $.each(candidateName2Way1, function (i, data) {
            if (d[data + "_mean"] != "" && d[data + "_mean"]) {
                // 해당 후보자의 선 그래프 데이터 추가
                candidateSeriesData2Way1[i * 2].data.push([
                    to_date(d.date),
                    d[data + "_mean"],
                ]);

                // 해당 후보자의 에리어 레인지 그래프 데이터 추가
                candidateSeriesData2Way1[i * 2 + 1].data.push([
                    to_date(d.date),
                    d[data + "_lower"],
                    d[data + "_upper"],
                ]);
            }
        });

        // 마지막 데이터의 날짜를 기록하여 후보자 차트의 x축 범위 설정에 사용
        if (j === candidateApproveData2Way1.length - 1) {
            lastCandidateDate = to_date(d.date);
        }
    });
}


/**
 * 함수: 후보자 차트 생성 및 설정
 * @param {array} seriesData - 차트에 표시할 시리즈 데이터
 */
function makeCandiWayChart(seriesData) {
    // 후보자 차트를 "candidate-container" 요소에 생성하고 설정합니다.
    candidate_chart = Highcharts.chart("candidate-container", {
        title: {
            text: "", // 차트에 제목은 없음
        },
        credits: {
            enabled: false, // 크레딧(차트 소유자 정보) 표시 안 함
        },
        xAxis: {
            type: "datetime", // x축 타입은 날짜와 시간
            plotLines: candiPlot, // x축에 그릴 추가적인 선들
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat("%y년 %m월 %e일", this.value); // x축 레이블 형식 설정
                },
            },
            // x축 범위 설정: 최소값과 최대값을 설정하여 기본 범위를 제한합니다.
            min: lastCandidateDate - 31536000000,
            max: lastCandidateDate + 584000000,
        },
        chart: {
            spacingLeft: 0, // 차트 왼쪽 여백 조정
        },
        yAxis: {
            title: {
                text: null, // y축에 제목은 없음
            },
            min: 0, // y축 최소값 설정
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false, // 라인 그래프의 마커(포인트) 비활성화
                },
            },
            arearange: {
                tooltip: {
                    enabled: false, // 에리어레인지 그래프의 툴팁 비활성화
                },
            },
        },
        tooltip: {
            crosshairs: true, // 십자선 표시
            shared: true, // 동일한 x값에 대한 다중 데이터의 툴팁을 공유
            split: true, // 동일한 x값에 대한 다중 데이터를 분할해서 표시
            useHTML: true, // 툴팁을 HTML 형식으로 사용
            borderColor: "transparent", // 툴팁 테두리 색상을 투명하게 설정
            backgroundColor: "#FFFFFF", // 툴팁 배경색 설정
            padding: 0, // 툴팁 패딩 설정
            borderRadius: 5, // 툴팁 모서리 둥글기 설정
            // 툴팁 내용 포맷 설정
            formatter: function () {
                // 툴팁 헤더와 데이터 포인트 정보를 표시
                return [
                    "<div class='hth'><b>" +
                    canditimeStampArray[this.x].month +
                    "월 " +
                    canditimeStampArray[this.x].week +
                    "주</b></div>",
                ].concat(
                    this.points ?
                        this.points.map(function (point) {
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
                        }) : []
                );
            },
            style: {
                fontSize: "14px", // 툴팁 폰트 크기 설정
            },
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false, // 내보내기 버튼 비활성화
                }
            }
        },
        series: seriesData, // 차트에 표시할 시리즈 데이터 설정
    });

    // 확대 기능 설정
    if ($(this).attr("type") == "all") {
        // "type"이 "all"일 경우 전체 기간으로 확대
        candidate_chart.xAxis[0].update({
            min: null,
            max: lastCandidateDate + 584000000
        }, true);
    } else if ($(this).attr("type") == "recent") {
        // "type"이 "recent"일 경우 최근 1년 기간으로 확대
        candidate_chart.xAxis[0].update({
            min: lastCandidateDate - 31536000000,
            max: lastCandidateDate + 584000000,
        }, true);
    } else {
        // "type"이 "all"이나 "recent"가 아닐 경우 특정 기간으로 확대
        candidate_chart.xAxis[0].update({
            min: lastCandidateDate - 31536000000,
            max: 1647424861000
        }, true);
    }

    // 포인터 리셋 함수 재정의
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };
}

