//선거구분 관련 param
var paramOpen = {
    sido: {
        id: 0,
        name: ''
    },
    gu: {
        id: 0,
        name: ''
    },
    dong: {
        id: 0,
        name: ''
    }
};

function setOpenParam(type, id, nm) {
    switch (type) {
        case "sido":
            paramOpen.sido.id = id;
            paramOpen.sido.name = nm;
            break;
        case "gu":
            paramOpen.gu.id = id;
            paramOpen.gu.name = nm;
            break;
        case "dong":
            paramOpen.dong.id = id;
            paramOpen.dong.name = nm;
            break;
    }
}

function cleanOpenParam(type) {
    switch (type) {
        case "sido":
            paramOpen.sido.id = 0;
            paramOpen.sido.name = "";
            break;
        case "gu":
            paramOpen.gu.id = 0;
            paramOpen.gu.name = "";
            break;
        case "dong":
            paramOpen.dong.id = 0;
            paramOpen.dong.name = "";
            break;
    }
}

(function ($) {
    var mapPaper = null;
    var initNum = 0;
    var raphaelDelegate = function () { };
    raphaelDelegate.prototype = {
        init: function (e) {
            voteUIMap.init();
        },
        selectShape: function (id, idx) {
            state = $areaMark.filter(':eq(' + idx + ')').attr('data-area');
            $('.area-' + current).addClass('screen-out');
            $('.area-' + state).removeClass('screen-out');
            current = state;
        }
    };

    function setRaphael() {
        mapPaper = Raphael("vote-area-map", 562, 560);
        mapPaper.setViewBox(180, 0, 440, 520);
    }
    setRaphael();
    //지도관련 js
    var voteUIMap,
        openData,
        fillData,
        $sidoList,
        $sidoItems,
        $sidoArea,
        $guItems,
        $guArea,
        $guIndex,
        guCurrent = -1,
        strHref = document.location.href;
    var $index, $apiUrl, current = 0;
    voteUIMap = {
        init: function () {
            this.list();
        },
        list: function () {
            mapPaper.clear();
            $.ajax({
                type: 'get',
                url: 'https://vote2018.imbc.com/api/GetGePyoRateList?type=S',
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    openData = data;
                    var str = [];
                    // 좌측 지도
                    mainHtml = '';
                    mainHtml += '<ul class="vote-area-list">';
                    mainHtml += '' +
                        '<li class="vote-area-items vote-area-items vote-area-items-all vote-area-items-active">' +
                        '<div class="vote-area-items-body">' +
                        '<a href="https://vote2018.imbc.com/api/GetGePyoRateList?type=g&sido=0" data-nav="0" class="btn-default area">전국</a>' +
                        '</div>' +
                        '</li>'; //전국 아이콘
                    for (i = 0; i < openData.length; i++) {
                        for (j = 0; j < mapArea.length; j++) {
                            if (mapArea[j].seq == 1 && (data[i].SIDO == mapArea[j].seq_code)) {
                                attr = {
                                    fill: data[i].JDColor,
                                    "stroke": '#d9dbdc', //테두리 컬러
                                    "stroke-width": 1, //테두리 두께
                                };
                                str[mapArea[j].eng_name] = mapPaper.path(mapArea[j].path).attr(attr);
                            }
                        }
                        if (openData[i].SIDO == 0) {
                            areaClass = 'vote-area-items-all vote-area-items-active';
                        } else {
                            areaClass = openData[i].SIDO;
                        }
                        mainHtml += '' +
                            '<li class="vote-area-items vote-area-items' + areaClass + '">' +
                            '<div class="vote-area-items-body">' +
                            '<a href="https://vote2018.imbc.com/api/GetGePyoRateList?type=g&sido=' + openData[i].SIDO + '" data-nav="' + openData[i].SIDO + '" data-nav-nm="' + openData[i].SGNAME + '" data-nav-rate="' + openData[i].GEPYO_RATE + '" class="btn-default area">' + openData[i].SDNAME + '</a>' +
                            '</div>' +
                            '</li>';
                    }
                    mainHtml += '</ul>';
                    $('.vote-area').append(mainHtml);

                    /* ~ ↓ 대선추가 ↓ ~ */
                    $('.select-do').append(mainHtml);
                    $('.select-do .vote-area-items-all').remove(); //전국 텍스트 숨김
                    $('.vote-map .vote-area-items-all').hide(); // 지도 아이콘 삭제
                    $('.vote-map .vote-area-items a').contents().unwrap().wrap('<span></span>'); // 지도 클릭 방지 처리
                    $('.select-do').on('mouseleave', function () {
                        $(this).children('.vote-area-list').hide();
                    });
                    $('.select-do .select-top').on('mouseover focus', function () {
                        $('.select-do .vote-area-list').show();
                        $('.select-dong .area-dong-body').hide();
                        $('.select-gu .area-gu-list').hide();
                    });
                    $('.select-do').on('mouseleave', function () {
                        $('.select-do .vote-area-list').hide();
                    });
                    $('.select-district .data-place .data-place-txt, .select-district .data-place .vote-area-items-body a').on('focus', function () {
                        $('.select-do .vote-area-list').hide();
                    });
                    /* ~ ↑ 대선추가 ↑ ~ */

                    $mapIcon = $('.vote-area-items-body').first(); //전국 아이콘 선택 
                    $sidoList = $('.vote-area-list');
                    $sidoItems = $sidoList.children('.vote-area-items');
                    $sidoArea = $sidoItems.find('.area');
                    $sidoArea.on('click', function (e) {
                        e.preventDefault();
                        $('.vote-area .vote-area-items-body').hide(); //시도 숨기기
                        $mapIcon.show(); //전국 아이콘만 보이게
                        $index = $(this).attr('data-nav');
                        $apiUrl = $(this).attr('href');
                        setOpenParam("sido", $(this).attr('data-nav'), $(this).attr('data-nav-nm'));
                        cleanOpenParam("gu");
                        cleanOpenParam("dong");
                        if (current == $index) {
                            return false;
                        }
                        $sidoItems.filter(':eq(' + current + ')').removeClass('vote-area-items-active');
                        $(this).parents('.vote-area-items').addClass('vote-area-items-active');
                        current = $index;
                        current = $index;

                        /* ~ ↓ 대선추가 ↓ ~ */
                        $(this).parents('.vote-area-items').siblings().removeClass('vote-area-items-active');
                        var selectDo = $(this).text();
                        $('.select-do .select-top').text(selectDo + ' ▼').append('<span>&#62;</span>');
                        var returnGu = '구·시·군 ▼<span>&#62;</span>'
                        $('.select-gu .select-top').empty().append(returnGu);
                        var returnDong = '읍·면·동 ▼'
                        $('.select-dong .select-top').empty().append(returnDong);
                        $('.select-district .data-place .vote-area-items, .select-district .data-place .vote-area-items .vote-area-items-body').show();
                        /* ~ ↑ 대선추가 ↑ ~ */

                        //전국 클릭시
                        if ($index == 0) {
                            $('.select-district .data-place .vote-area-items, .select-district .data-place .vote-area-items .vote-area-items-body').hide();
                            voteUIMap.map(); //그림만 그려줌
                            $('.vote-area .vote-area-items-body').show();
                            /*$('.select-district .data-place').addClass('changed').removeClass('vote-area-list');*/
                            $mapIcon.hide();
                            $('.area-gu-list').remove();
                            $('.area-dong-body').remove();
                            cleanOpenParam("sido");
                            cleanOpenParam("gu");
                            cleanOpenParam("dong");
                            /* ※ ↓ 투개표 진행시 주석해제 ↓ ※ */
                            /*//voteUIMap.setOpenCleanSelBoxSetting('sg');
                            getAllGePyoRate();var initHTML = '<div class="wrap-rank-tit">' + 
                                '<div class="cont-none">' +
                                '1.<span class="purple"> 좌측지도</span>에서 확인하고자 하는 <span class="purple">지역을 선택</span>해주세요.' +
                                '<br>2. 상단의 <span class="purple">선택박스</span>에서 <span class="purple">선거구분을 선택</span>한 후,' +
                                '<br><span class="purple">조회 버튼</span>을 클릭해주세요.' +
                                '</div>' +
                                '</div>';
                            $("#LOCALOPENHUBOLIST").html(initHTML);*/

                            /* ~ ↓ 대선추가 ↓ ~ */
                            $('span.data-place').text('전국');
                            var returnDo = '시·도 ▼<span>&#62;</span>'
                            $('.select-do .select-top').empty().append(returnDo);
                            var returnGu = '구·시·군 ▼<span>&#62;</span>'
                            $('.select-gu .select-top').empty().append(returnGu);
                            var returnDong = '읍·면·동 ▼'
                            $('.select-dong .select-top').empty().append(returnDong);
                            /* ~ ↑ 대선추가 ↑ ~ */

                            return false;
                        }
                        voteUIMap.setGu($apiUrl, $index);
                        /*voteUIMap.setSgTypeSelBox();*/ //지방선거 선거구분
                        setNowLocatioInfoAndGePyoRate(paramOpen.sido.name, $(this).attr('data-nav-rate'));
                    });

                }
            });
        },
        map: function () {
            mapPaper.clear();
            $.ajax({
                type: 'get',
                url: 'https://vote2018.imbc.com/api/GetGePyoRateList?type=S',
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    var str = []; // 구 이름과 해당 경로 요소를 저장하는 배열

                    // 메인 HTML 변수 초기화
                    mainHtml = '';

                    // 데이터를 반복하며 구 이름과 해당 경로 요소를 저장
                    for (i = 0; i < data.length; i++) {
                        for (j = 0; j < mapArea.length; j++) {
                            // 맵 영역 데이터와 현재 데이터의 SIDO가 일치하는 경우
                            if (mapArea[j].seq == 1 && (data[i].SIDO == mapArea[j].seq_code)) {
                                // 경로 요소의 속성을 설정
                                attr = {
                                    fill: data[i].JDColor, // 채우기 색상
                                    "stroke": '#d9dbdc', // 테두리 색상
                                    "stroke-width": 1, // 테두리 두께
                                };

                                // str 배열에 해당 구 이름을 키로 하여 경로 요소를 저장
                                str[mapArea[j].eng_name] = mapPaper.path(mapArea[j].path).attr(attr);
                            }
                        }
                    }
                }

            });
        },
        setGu: function (url, index) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    $('.area-gu-list').remove();
                    mainHtml = '';
                    mainHtml += '<ul class="area-gu-list area-gu-list-' + index + '">'
                    for (i = 0; i < data.length; i++) {
                        var wiwid = 0;
                        if (data[i].SIDO == 17) {
                            wiwid = data[i].WIWID
                        }
                        mainHtml += '' +
                            '<li class="area-gu-items area-gu-items-' + data[i].SUNGEO + '">' +
                            '<a href="https://vote2018.imbc.com/api/GetEupMyundongListForOpen?sggid=' + data[i].SGGID + '&wiwid=' + wiwid + '" data-nav="' + data[i].WIWID + '" data-nav-nm="' + data[i].SGNAME + '" data-nav-rate="' + data[i].GEPYO_RATE + '" class="area area-gu">' + data[i].SGNAME + '</a>' +
                            '</li>';
                    }
                    mainHtml += '</ul>';
                    $('.vote-area-gu').append(mainHtml);

                    /* ~ ↓ 대선추가 ↓ ~ */
                    $('.select-gu').append(mainHtml);
                    $('.vote-map .area-gu-items a').contents().unwrap().wrap('<span></span>'); // 지도 클릭 방지 처리
                    $('.select-gu .select-top').on('mouseover focus', function () {
                        $('.select-gu .area-gu-list').show();
                        $('.select-do .vote-area-list').hide();
                        $('.select-dong .area-dong-body').hide();
                    });
                    $('.select-gu').on('mouseleave', function () {
                        $(this).children('.area-gu-list').hide();
                    });
                    /* ~ ↑ 대선추가 ↑ ~ */

                    // 클릭 이벤트 핸들러를 등록
                    $guItems = $('.area-gu-items');
                    $guArea = $guItems.find('.area-gu');
                    $guArea.on('click', function (e) {
                        e.preventDefault(); // 기본 동작 방지 (링크 클릭 시 페이지 이동 방지)

                        // 현재 클릭한 지역의 인덱스를 가져옴
                        $guIndex = $guArea.index($(this));

                        // 현재 선택된 지역과 같은 지역이면 아무 동작하지 않고 종료
                        if ($guIndex == guCurrent) {
                            return false;
                        }

                        // API URL과 지역명을 가져옴
                        var $apiUrl = $(this).attr('href'),
                            $guText = $(this).text();

                        // "gu" 파라미터를 설정하고 "dong" 파라미터를 초기화
                        setOpenParam("gu", $(this).attr('data-nav'), $(this).attr('data-nav-nm'));
                        cleanOpenParam("dong");

                        // "dong" 리스트를 업데이트하고 선택한 지역을 하이라이트 표시
                        voteUIMap.setDongList($apiUrl);
                        $(this).parent().addClass('area-gu-items-active');
                        $guItems.filter(':eq(' + guCurrent + ')').removeClass('area-gu-items-active');
                        guState = true;
                        $('.area-dong-body').remove();

                        /* ~ ↓ 대선추가 ↓ ~ */
                        // 선택한 구의 이름을 화면에 표시
                        var selectGu = $(this).text();
                        $('.select-gu .select-top').text(selectGu + ' ▼').append('<span>&#62;</span>');
                        var returnDong = '읍·면·동 ▼'
                        $('.select-dong .select-top').empty().append(returnDong);
                        /* ~ ↑ 대선추가 ↑ ~ */

                        /*voteUIMap.setSgTypeSelBox();*/ //지방선거 선거구분
                        // 현재 위치 정보와 게표율을 설정
                        setNowLocatioInfoAndGePyoRate(paramOpen.sido.name + "&nbsp;>&nbsp;" + paramOpen.gu.name, $(this).attr('data-nav-rate'));
                    });

                    // 지도를 그리는 함수를 호출
                    voteUIMap.drawMap(data, index);

                }
            });
        },
        setDongList: function (url) {
            //var current = 0;
            // AJAX 요청을 통해 지역 정보를 가져옴
            $.ajax({
                type: 'get', // GET 요청
                url: url, // 지정된 URL로 요청을 보냅니다.
                dataType: 'jsonp', // 데이터 타입을 JSONP로 설정
                jsonp: 'callback', // JSONP 콜백 파라미터 이름 설정
                success: function (data) { // 요청이 성공했을 때의 콜백 함수
                    // 지역 정보를 동적으로 생성하여 HTML에 추가
                    mainHtml = '<div class="area-dong-body">';
                    mainHtml += '<ul id="emdUL">';
                    for (i = 0; i < data.length; i++) {
                        // 각 지역의 정보를 버튼으로 생성하여 리스트에 추가
                        mainHtml += '<li><button type="button" class="btn-default" data-nav="' + data[i].EMDID + '" data-nav-nm="' + data[i].EMDNMAE + '" data-nav-rate="' + data[i].GEPYO_RATE + '" >' + data[i].EMDNMAE + '</button></li>';
                    }
                    mainHtml += '</ul>';
                    mainHtml += '</div>';

                    // 대선 추가 부분: 선택된 지역 정보를 화면에 표시하고 이벤트 처리를 설정
                    $('.select-dong').append(mainHtml);
                    $('.vote-map .area-gu-items button').contents().unwrap().wrap('<span></span>'); // 지도 클릭 방지 처리
                    $('.select-dong .select-top').on('mouseover focus', function () {
                        $('.select-dong .area-dong-body').show();
                        $('.select-do .vote-area-list').hide();
                        $('.select-gu .area-gu-list').hide();
                    });
                    $('.select-dong').on('mouseleave', function () {
                        $(this).children('.area-dong-body').hide();
                    });

                    // 각 동을 클릭했을 때의 이벤트 핸들러 설정
                    $dongItems = $('.select-dong .area-dong-body .btn-default')
                    $dongItems.on('click', function () {
                        // 선택한 동의 정보를 파라미터로 설정하고 활성화 스타일을 변경
                        setOpenParam("dong", $(this).attr('data-nav'), $(this).attr('data-nav-nm'));
                        $dongItems.removeClass('active');
                        $(this).addClass('active');

                        // 대선 추가 부분: 선택한 동을 화면에 표시
                        var selectDong = $(this).text();
                        $('.select-dong .select-top').text(selectDong);

                        // 현재 위치 정보와 게표율을 설정
                        setNowLocatioInfoAndGePyoRate(paramOpen.sido.name + "&nbsp;>&nbsp;" + paramOpen.gu.name + "&nbsp;>&nbsp;" + paramOpen.dong.name, -1);
                    });
                }
            });

        },
        // drawMap 함수: 지도에 지역 경계를 그리는 함수
        drawMap: function (data, index) {
            // 이전에 그려진 지도 내용을 모두 지움
            mapPaper.clear();

            // 데이터를 기반으로 지역 경계를 그림
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < mapArea.length; j++) {
                    // 지역 정보와 매핑된 경계 정보를 확인하여 그릴 지역을 찾음
                    if (mapArea[j].seq == 2 && (data[i].SIDO == mapArea[j].seq_code) && (mapArea[j].name == data[i].SGNAME)) {
                        // 경계의 스타일 및 속성을 설정
                        attr = {
                            fill: data[i].JDColor, // 채우기 색상
                            "title": mapArea[j].name, // 툴팁으로 표시될 제목
                            "stroke": '#d9dbdc', // 테두리 컬러
                            "stroke-width": 1, // 테두리 두께
                        };
                        // 경계를 그림
                        mapPaper.path(mapArea[j].path).attr(attr);
                    }
                }
            }
        }

    }
    voteUIMap.init();
})(jQuery);