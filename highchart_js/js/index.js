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

$(window).on("load", function () {
    $(".counter").each(function () {
        var $this = $(this),
            countTo = $this.attr("data-count");

        $({
            countNum: $this.text()
        }).animate({
                countNum: countTo,
            },

            {
                duration: 1500,
                easing: "linear",
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                },
            }
        );
    });
});

function setPresidentApprove() {
    // 전 주 대통령 지지율
    prev_president_approve =
        president_data[president_data.length - 2]["positive_mean"];
    var prev_president_date = president_data[president_data.length - 2]["date"];
    
    // 현재 대통령 지지율
    president_approve =
        president_data[president_data.length - 1]["positive_mean"];
    var president_date = president_data[president_data.length - 1]["date"];
    
    /*★$(".now-percent_date").html("11월 3주");*/
    // $(".now-percent_date").html(president_date + " 기준 ");
    /*★$(".president-percent").html(
        president_approve + "<small style='font-size:18px;'>  %</small>"
    );*/
    /*★$(".prev-percent_date").html(prev_president_date + " 기준 ");*/
    // $(".prev-president-percent").html(
    //   prev_president_approve + "<small> %p</small>"
    // );
    
    var interval =
        Math.round((president_approve - prev_president_approve) * 10) / 10;
    /*★if (interval > 0) {
        $(".updown-percent").html(
            "+ " +
            interval +
            "<small style='font-size:24px; letter-spacing:0;margin-left:10px;'> %p</small>"
        );
        $(".updown-percent").css("color", "#3347e2");
    } else {
        $(".updown-percent").html(
            "- " +
            Math.abs(interval) +
            "<small style='font-size:24px;letter-spacing:0;margin-left:10px;'> %p</small>"
        );
        $(".updown-percent").css("color", "#e23d3d");
    }*/
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function timeStampToDate(data) {
    var date = new Date(data);
    var year = date.getFullYear().toString().slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "년 " + month + "월 " + day + "일";
}
