var mouseX;
var mouseY;

// 전 주 대통령 지지율
var prev_president_approve;
// 현재 대통령 지지율
var president_approve;

var partyApproveArray = [
  "더불어민주당",
  "국민의힘",
  "정의당",
  "국민의당2",
  "열린민주당",
];

$(document).ready(function () {
    // 대통령 여론조사 그래프
    console.log("?");
    setPresdidentLineGraph();

    // 대통령 지지율 (지난주 대비)
    setPresidentApprove();

    // 정당지지율
    setPartyApproveGraph();

    partyMiniData(partyApproveArray[getRandomInt(1, 5)]);

    setCandidateMiniChart();

    // makeSeoulMainGraph();
    // makeBusanMainGraph();

    // 바그래
    // seoulMainBar();
    // busanMainBar();

    setCandidateLineChart();
});

// 문서 로딩 완료 시 실행되는 함수
$(window).on("load", function () {
    // 모든 .counter 요소에 대해 반복문 실행
    $(".counter").each(function () {
        // 현재 요소(jQuery 객체)를 $this 변수에 저장
        var $this = $(this);

        // 해당 요소의 data-count 속성 값을 가져옴 (애니메이션의 최종 값)
        var countTo = $this.attr("data-count");

        // jQuery의 animate 함수를 이용하여 숫자를 증가시키는 애니메이션 수행
        $({
            countNum: $this.text() // 현재 표시된 숫자를 시작 값으로 설정
        }).animate({
            countNum: countTo // 최종 숫자로 설정하여 애니메이션 수행
        },
        {
            duration: 1500, // 애니메이션의 지속 시간 (밀리초 단위)
            easing: "linear", // 애니메이션의 가속도 함수 설정
            step: function () {
                // 애니메이션 중 각 단계마다 호출되는 함수
                // 현재 애니메이션의 값인 this.countNum을 내림하여 요소에 표시
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                // 애니메이션이 완료된 후 호출되는 함수
                // 최종 값으로 요소에 표시하여 애니메이션 완료
                $this.text(this.countNum);
                //alert('finished');
            },
        });
    });
});


// 현재 대통령 지지율과 전 주 대통령 지지율을 계산하고, 지지율 변화 간격을 계산하는 함수
function setPresidentApprove() {
    // 전 주 대통령 지지율
    prev_president_approve = president_data[president_data.length - 2]["positive_mean"];
    var prev_president_date = president_data[president_data.length - 2]["date"];
    
    // 현재 대통령 지지율
    president_approve = president_data[president_data.length - 1]["positive_mean"];
    var president_date = president_data[president_data.length - 1]["date"];
    
    // 지지율 변화 간격 계산 (소수점 한 자리까지 반올림)
    var interval = Math.round((president_approve - prev_president_approve) * 10) / 10;
}

// 주어진 범위 내에서 랜덤 정수를 반환하는 함수
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // 최댓값은 제외, 최솟값은 포함
}

// 타임스탬프를 날짜 형식으로 변환하는 함수
function timeStampToDate(data) {
    var date = new Date(data);
    var year = date.getFullYear().toString().slice(-2); // 연도에서 뒤 두 자리만 추출
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // 월을 0부터 시작하므로 1을 더하고 두 자리로 만듦
    var day = ("0" + date.getDate()).slice(-2); // 일을 두 자리로 만듦

    // 형식에 맞게 연도, 월, 일을 결합하여 반환
    return year + "년 " + month + "월 " + day + "일";
}
