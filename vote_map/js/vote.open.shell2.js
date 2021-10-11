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
    var raphaelDelegate = function () {};
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
                    /* ↓ 대선추가 ↓ */
                    $('.select-do').append(mainHtml);
                    $('.select-bx .vote-area-items-all').remove();
                    /* ↑ 대선추가 ↑ */
                    $mapIcon = $('.select-do .vote-area-items-body').first(); //전국 아이콘 선택 
                    $sidoList = $('.select-do .vote-area-list');
                    $sidoItems = $sidoList.children('.vote-area-items');
                    $sidoArea = $sidoItems.find('.area');
                    $sidoArea.on('click', function (e) {
                        e.preventDefault();
                        $('.vote-area .vote-area-items-body').hide(); //시도 숨기기
                        $mapIcon.show(); //전국 아이콘만 보이게
                        sidotitle = '';
                        sidotitle += '<strong class="border">구·시·군</strong><span>(구·시·군을 선택해주세요)</span>';
                        $('.now-map-h4').html(sidotitle);
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
                        /* ↓ 대선추가 ↓ */
                        var selectDo = $(this).text();
                        $('.select-do > li').text(selectDo);
                        var returnGu = '구·시·군 ▼<span>&#62;</span>'
                        $('.select-gu > li').empty().append(returnGu);
                        var returnDong = '읍·면·동 ▼'
                        $('.select-dong > li').empty().append(returnDong);
                        /* ↑ 대선추가 ↑ */
                        //전국 아이콘 클릭시
                        if ($index == 0) {
                            voteUIMap.map(); //그림만 그려줌
                            $('.vote-area .vote-area-items-body').show();
                            sidotitle = '';
                            sidotitle += '<strong class="border">시·도</strong><span>(시·도를 선택해주세요)</span>';
                            $('.now-map-h4').html(sidotitle);
                            $mapIcon.hide();
                            $('.area-gu-list').remove();
                            $('.area-dong-body').remove();
                            cleanOpenParam("sido");
                            cleanOpenParam("gu");
                            cleanOpenParam("dong");
                            //voteUIMap.setOpenCleanSelBoxSetting('sg');
                            getAllGePyoRate();
                            /* ※ ↓ 투개표 진행시 주석해제 ↓ ※ */
                            /*var initHTML = '<div class="wrap-rank-tit">' + 
                                '<div class="cont-none">' +
                                '1.<span class="purple"> 좌측지도</span>에서 확인하고자 하는 <span class="purple">지역을 선택</span>해주세요.' +
                                '<br>2. 상단의 <span class="purple">선택박스</span>에서 <span class="purple">선거구분을 선택</span>한 후,' +
                                '<br><span class="purple">조회 버튼</span>을 클릭해주세요.' +
                                '</div>' +
                                '</div>';
                            $("#LOCALOPENHUBOLIST").html(initHTML);*/
                            $('span.data-place').text('전국');

                            /* ↓ 대선추가 ↓ */
                            var returnDo = '시·도 ▼<span>&#62;</span>'
                            $('.select-do > li').empty().append(returnDo);
                            var returnGu = '구·시·군 ▼<span>&#62;</span>'
                            $('.select-gu > li').empty().append(returnGu);
                            var returnDong = '읍·면·동 ▼'
                            $('.select-dong > li').empty().append(returnDong);
                            /* ↑ 대선추가 ↑ */
                            return false;
                        }
                        voteUIMap.setGu($apiUrl, $index);
                        /*voteUIMap.setSgTypeSelBox();*/ //지방선거 선거구분
                        setNowLocatioInfoAndGePyoRate(paramOpen.sido.name, $(this).attr('data-nav-rate'));
                    });
                    /* ↓ 대선추가 ↓ */
                    $('.vote-map .vote-area-items').click(function (e) {
                        e.preventDefault();
                    });
                    $('.select-district .data-place').on('click', function (e) {
                        e.preventDefault();
                        $mapIcon.hide();
                        voteUIMap.map(); //그림만 그려줌
                        $('.vote-area-items-body').show();
                        $('.vote-area-items-all').hide();
                        //$('.vote-area-list').remove();
                        $('.area-gu-list').remove();
                        $('.area-dong-body').remove();

                        var returnDo = '시·도 ▼<span>&#62;</span>'
                        $('.select-do > li').empty().append(returnDo);
                        var returnGu = '구·시·군 ▼<span>&#62;</span>'
                        $('.select-gu > li').empty().append(returnGu);
                        var returnDong = '읍·면·동 ▼'
                        $('.select-dong > li').empty().append(returnDong);

                    });
                    $('.select-do .vote-area-list').hide();
                    $('.select-do .select-top').mouseenter(function () {
                        $('.select-do .vote-area-list').show();
                    });
                    $('.select-do').mouseleave(function () {
                        $(this).children('.vote-area-list').hide();
                    });
                    /* ↑ 대선추가 ↑ */
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
                    var str = [];
                    mainHtml = '';
                    for (i = 0; i < data.length; i++) {
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
                    /* ↓ 대선추가 ↓ */
                    $('.select-gu').append(mainHtml);
                    /* ↑ 대선추가 ↑ */
                    $guItems = $('.select-gu .area-gu-items');
                    $guArea = $guItems.find('.area-gu');
                    $guArea.on('click', function (e) {
                        e.preventDefault();
                        $guIndex = $guArea.index($(this));
                        if ($guIndex == guCurrent) {
                            return false;
                        }
                        var $apiUrl = $(this).attr('href'),
                            $guText = $(this).text();
                        setOpenParam("gu", $(this).attr('data-nav'), $(this).attr('data-nav-nm'));
                        cleanOpenParam("dong");
                        voteUIMap.setDongList($apiUrl);
                        $(this).parent().addClass('area-gu-items-active');
                        $guItems.filter(':eq(' + guCurrent + ')').removeClass('area-gu-items-active');
                        guState = true;
                        $('.area-dong-body').remove();
                        /* ↓ 대선추가 ↓ */
                        var selectGu = $(this).text();
                        $('.select-gu > li').text(selectGu);
                        var returnDong = '읍·면·동 ▼'
                        $('.select-dong > li').empty().append(returnDong);
                        /* ↑ 대선추가 ↑ */
                        /*voteUIMap.setSgTypeSelBox();*/ //지방선거 선거구분
                        setNowLocatioInfoAndGePyoRate(paramOpen.sido.name + "&nbsp;>&nbsp;" + paramOpen.gu.name, $(this).attr('data-nav-rate'));
                    });
                    /* ↓ 대선추가 ↓ */
                    $('.vote-map .area-gu-list').click(function (e) {
                        e.preventDefault();
                    });
                    $('.select-gu .area-gu-list').hide();
                    $('.select-gu .select-top').mouseenter(function () {
                        $('.select-gu .area-gu-list').show();
                    });
                    $('.select-gu').mouseleave(function () {
                        $(this).children('.area-gu-list').hide();
                    });
                    /* ↑ 대선추가 ↑ */
                    voteUIMap.drawMap(data, index);
                }
            });
        },
        setDongList: function (url) {
            //var current = 0;
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    mainHtml = '<div class="area-dong-body"><h4><strong class="border">읍·면·동</strong></h4>';
                    mainHtml += '<ul id="emdUL">';
                    for (i = 0; i < data.length; i++) {
                        mainHtml += '<li><button type="button" class="btn-default" data-nav="' + data[i].EMDID + '" data-nav-nm="' + data[i].EMDNMAE + '" data-nav-rate="' + data[i].GEPYO_RATE + '" >' + data[i].EMDNMAE + '</button></li>';
                    }
                    mainHtml += '	</ul>';
                    mainHtml += '</div>';
                    //$('.vote-area-dong').append(mainHtml); //지방선거 지도 하단 읍·면·동 표시
                    /* ↓ 대선추가 ↓ */
                    $('.select-dong').append(mainHtml);
                    $('.select-dong .area-dong-body h4').remove();
                    /* ↑ 대선추가 ↑ */
                    $dongItems = $('.select-dong .area-dong-body .btn-default')
                    $dongItems.on('click', function () {
                        /*$index = $dongItems.index($(this));
                        if ($index == current) {
                            return false;
                        }*/
                        setOpenParam("dong", $(this).attr('data-nav'), $(this).attr('data-nav-nm'));
                        $dongItems.removeClass('active');
                        $(this).addClass('active');
                        $dongItems.filter(':eq(' + current + ')').removeClass('active');
                        current = $index;
                        /* ↓ 대선추가 ↓ */
                        var selectDong = $(this).text();
                        $('.select-dong > li').text(selectDong);
                        /* ↑ 대선추가 ↑ */
                        /*voteUIMap.setSgTypeSelBox();*/ //지방선거 선거구분
                        setNowLocatioInfoAndGePyoRate(paramOpen.sido.name + "&nbsp;>&nbsp;" + paramOpen.gu.name + "&nbsp;>&nbsp;" + paramOpen.dong.name, -1);
                    });
                    /* ↓ 대선추가 ↓ */
                    $('.vote-map .area-dong-body .btn-default').click(function (e) {
                        e.preventDefault();
                    });
                    $('.select-dong .area-dong-body').hide();
                    $('.select-dong .select-top').mouseenter(function () {
                        $('.select-dong .area-dong-body').show();
                    });
                    $('.select-dong').mouseleave(function () {
                        $(this).children('.area-dong-body').hide();
                    });
                    /* ↑ 대선추가 ↑ */
                }
            });
        },
        drawMap: function (data, index) {
            mapPaper.clear();
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < mapArea.length; j++) {
                    if (mapArea[j].seq == 2 && (data[i].SIDO == mapArea[j].seq_code) && (mapArea[j].name == data[i].SGNAME)) {
                        attr = {
                            fill: data[i].JDColor,
                            "title": mapArea[j].name,
                            "stroke": '#d9dbdc', //테두리 컬러
                            "stroke-width": 1, //테두리 두께
                        };
                        mapPaper.path(mapArea[j].path).attr(attr);
                    }
                }
            }
        },
        /* ↓ 지방선거 선거구분 ↓ */
        /*setSgTypeSelBox: function () {
            $.ajax({
                type: 'get',
                url: 'https://vote2018.imbc.com/api/GetSgTypeList',
                dataType: 'jsonp',
                data: {
                    sidonm: paramOpen.sido.name,
                    wiwnm: paramOpen.gu.name,
                    emdid: paramOpen.dong.id
                },
                jsonp: 'callback',
                success: function (data) {

                    //voteUIMap.setOpenCleanSelBoxSetting('sg');

                    var szHtml = [];

                    if (data.length == 0) {
                        szHtml.push("<li><button type=\"button\" class=\"button button-item\">해당 선거 정보가 없습니다</button></li>");
                    } else {
                        if (data[0].SGTYPECODE == 2) {
                            for (var i = 1; i < data.length + 1; i++) {
                                if (i == data.length) {
                                    szHtml.push("<li><button type=\"button\" class=\"button button-item\" data-set=\"" + data[0].SGTYPECODE + "\">" + voteUIMap.setSgTypeName(data[0].SGTYPECODE) + "</button></li>");
                                } else {
                                    szHtml.push("<li><button type=\"button\" class=\"button button-item\" data-set=\"" + data[i].SGTYPECODE + "\">" + voteUIMap.setSgTypeName(data[i].SGTYPECODE) + "</button></li>");
                                }
                            }
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                szHtml.push("<li><button type=\"button\" class=\"button button-item\" data-set=\"" + data[i].SGTYPECODE + "\">" + voteUIMap.setSgTypeName(data[i].SGTYPECODE) + "</button></li>");
                            }
                        }

                    }

                    $("#sgList").html('');
                    $('#sgList').append(szHtml.join(''));

                    $('.dropdown.sg').unbind().removeData();
                    $('.dropdown.sg').Dropdown();
                }
            });
        },*/
        /*setSgTypeName: function (code) {
            var name = "";
            switch (code) {
                case 2:
                    name = "국회의원";
                    break;
                case 3:
                    name = "광역단체장";
                    break;
                case 4:
                    name = "기초단체장";
                    break;
                case 5:
                    name = "광역의원";
                    break;
                case 6:
                    name = "기초의원";
                    break;
                case 10:
                    name = "교육의원";
                    break;
                case 11:
                    name = "교육감";
                    break;
            }
            return name;
        },*/
        /*setOpenCleanSelBoxSetting: function (id) {
            $("#" + id + "List").parent().removeClass('attached');
            $("#" + id + "List").parent().attr('aria-hidden', 'true');
            $("#" + id + "List").parent().prevAll('.button-choose').text('선택');
            $("#" + id + "List").parent().prevAll('.button-choose').attr('data-set', '');
            $("#" + id + "List").parent().prevAll('.button-choose').removeClass('attached');
            $("#" + id + "List").parent().prevAll('.button-choose').attr('aria-hidden', 'true');
            $("#" + id + "List").html('');
        }*/
    }
    voteUIMap.init();
})(jQuery);
