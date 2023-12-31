var info = [{
        "code": 1,
        "name": "서울",
        "point": "106.901,150.866 110.273,139.627 131.627,139.627 141.742,160.981 136.123,173.344 122.635,176.716 109.149,173.344 102.405,167.724 92.291,148.618 "
    },
    {
        "code": 2,
        "name": "부산",
        "point": "250.322,467.166 266.057,452.555 279.544,452.555 291.906,437.944 305.394,435.696 314.071,423.188 318.88,430.077 331.243,433.448 279.544,476.157 270.552,470.537 253.693,475.033"
    },
    {
        "code": 3,
        "name": "대구",
        "point": "262.125,345.052 253.134,349.548 247.514,356.292 237.398,356.292 237.398,382.142 229.531,393.38 262.125,394.505 271.116,377.646 266.612,370.916 276.735,356.292"
    },
    {
        "code": 4,
        "name": "인천",
        "point": "63.069,114.901 79.928,123.893 81.051,132.883 76.556,140.751 81.051,148.619 92.291,148.619 102.406,167.725 88.919,181.211 81.051,176.715 66.441,180.087 36.095,147.495 40.591,129.512 "
    },
    {
        "code": 5,
        "name": "광주",
        "point": "96.875,436.918 113.733,436.918 119.352,445.909 126.096,449.281 115.981,467.264 104.742,463.892 95.75,468.388 86.759,461.644 86.759,444.785"
    },
    {
        "code": 6,
        "name": "대전",
        "point": "144.923,271.105 135.676,275.346 129.189,277.85 124.437,284.337 118.817,287.709 122.561,304.338 142.777,316.463 142.882,301.506 153.25,284.75 "
    },
    {
        "code": 7,
        "name": "울산",
        "point": "344.605,390.74 327.871,386.245 321.148,391.095 311.013,379.501 298.65,397.483 296.402,409.847 303.146,418.838 314.071,423.188 319.142,430.148 331.243,433.448 "
    },
    {
        "code": 9,
        "name": "경기도",
        "point": "123.76,67.697 141.742,89.051 155.229,87.927 169.84,117.149 164.22,127.264 175.459,151.989 187.823,151.989 192.318,163.229 184.45,173.344 187.823,204.813 178.831,214.928 165.344,217.176 146.238,235.158 105.778,236.282 100.158,228.416 85.547,228.416 76.556,220.548 83.3,205.938 77.68,200.318 88.919,181.211 102.406,167.724 108.113,172.48 122.636,176.716 136.123,173.344 141.742,160.981 131.627,139.627 110.273,139.627 106.902,150.866 92.291,148.618 81.052,148.618 76.556,140.751 81.052,132.884 79.928,123.893 88.919,119.397 90.043,107.033 100.158,98.042 99.034,82.309 "
    },
    {
        "code": 10,
        "name": "강원도",
        "point": "140.618,57.582 161.972,57.582 187.822,42.972 195.689,27.237 206.929,20.494 221.539,20.494 226.035,13.75 237.273,24.989 282.229,94.671 305.832,160.981 324.938,183.459 305.832,212.681 290.098,210.433 270.991,211.557 265.371,219.424 237.273,218.3 230.53,205.937 217.044,199.194 206.929,207.061 187.822,204.813 184.45,173.344 192.317,163.229 187.822,151.99 175.459,151.99 164.22,127.264 169.84,117.149 155.229,87.928 141.742,89.051 123.76,67.697 "
    },
    {
        "code": 11,
        "name": "충청북도",
        "point": "265.387,219.461 247.404,244.188 220.432,241.939 193.457,276.779 200.201,283.523 196.829,294.763 191.209,298.134 191.209,307.125 213.688,313.869 210.316,334.099 197.953,345.338 172.665,343.652 173.227,334.099 142.741,316.115 142.882,301.506 152.997,284.648 145.13,271.161 151.873,259.921 151.873,252.054 146.254,246.436 146.254,235.195 165.36,217.213 178.163,215.08 187.838,204.852 206.945,207.098 217.061,199.23 230.547,205.975 237.289,218.337 "
    },
    {
        "code": 12,
        "name": "충청남도(세종)",
        "point": "146.239,235.034 105.778,236.282 100.158,228.416 85.547,228.416 76.556,220.548 54.078,222.672 31.6,264.256 51.83,274.371 43.963,292.354 55.202,312.584 69.813,311.46 78.804,328.317 73.184,338.434 86.671,344.053 86.671,349.673 100.158,347.425 112.521,328.317 122.636,330.567 122.637,341.806 133.875,346.301 137.247,338.434 152.981,342.929 155.229,353.044 172.088,353.044 173.211,334.364 122.636,304.717 119.265,287.858 124.884,284.485 129.379,277.743 145.13,271.161 151.873,259.921 151.873,252.054 146.254,245.683 "
    },
    {
        "code": 13,
        "name": "전라북도",
        "point": "72.061,338.434 72.061,359.787 79.929,365.407 77.681,382.266 66.441,391.257 57.451,412.611 59.698,429.47 77.681,432.841 90.042,428.346 90.042,421.603 104.654,413.735 132.751,433.965 148.485,433.965 156.354,437.337 169.84,436.213 176.583,426.098 176.583,405.867 181.08,394.629 176.583,378.894 197.938,362.035 197.938,345.177 173.211,342.929 172.087,353.044 155.229,353.044 152.981,342.929 137.248,338.434 133.875,346.301 122.637,341.806 122.637,330.566 112.521,328.318 100.159,347.425 86.671,349.673 86.671,344.053 "
    },
    {
        "code": 14,
        "name": "전라남도",
        "point": "86.759,461.644 95.75,468.388 104.742,463.892 115.981,467.264 126.096,449.281 119.352,445.909 113.733,436.918 96.875,436.918 86.947,444.639 76.888,432.692 90.042,428.346 89.952,421.25 104.654,413.735 132.751,433.965 149.528,433.448 156.354,437.337 169.749,435.86 177.616,444.852 185.483,467.33 184.359,488.684 197.5,510.998 194.475,520.153 182.111,528.021 175.368,524.648 165.253,530.269 170.872,547.127 157.386,551.622 146.147,547.127 131.536,556.118 128.165,563.985 104.563,568.48 94.447,566.233 77.588,565.109 68.598,553.87 46.12,557.242 41.625,570.729 16.898,580.844 5.66,567.356 22.518,539.26 7.908,515.657 29.262,485.313 19.146,471.825 27.014,453.843 39.376,453.843 59.698,429.47 76.556,432.63 86.759,444.785"
    },
    {
        "code": 15,
        "name": "경상북도",
        "point": "324.938,183.459 305.832,212.681 290.098,210.433 270.991,211.557 247.404,244.188 220.54,241.654 193.457,276.779 200.31,283.238 196.829,294.763 191.209,298.134 191.318,306.839 213.688,313.869 210.425,333.813 197.953,345.338 198.063,361.911 209.301,381.017 222.788,393.38 229.531,393.38 237.398,382.142 237.398,356.292 247.514,356.292 253.134,349.548 262.125,345.052 276.735,356.292 266.612,370.916 271.116,377.646 262.125,394.505 275.611,400.124 287.975,394.505 298.65,397.483 311.013,379.501 321.148,391.095 327.871,386.245 344.169,391.132 350.913,329.318 335.178,340.558 332.931,283.238 339.674,248.398 "
    },
    {
        "code": 16,
        "name": "경상남도",
        "point": "169.402,436.82 177.269,444.688 185.136,467.166 184.012,488.52 197.5,510.998 205.367,509.874 210.986,514.369 225.598,510.998 228.969,503.131 241.332,500.883 258.189,506.502 281.791,485.148 279.545,476.157 270.553,470.537 253.693,475.033 250.322,467.166 266.057,452.555 279.545,452.555 291.906,437.944 305.395,435.696 314.385,423.333 303.146,418.838 296.402,409.847 298.65,397.483 287.412,394.112 275.047,399.731 260.613,394.079 222.225,392.988 208.738,380.625 197.5,361.519 176.145,378.377 180.641,394.112 176.145,405.351 176.145,425.581 169.402,435.696 "
    },
    {
        "code": 17,
        "name": "제주도",
        "point": "46.772,614.817 87.232,603.578 99.595,594.587 119.826,614.817 116.455,639.543 87.232,653.03 45.648,653.03 33.286,633.924 "
    }
]
var party_color = [
    {
        "name": "개표율",
        "code": "party_0",
        "bg": "#009fa5",
        "txt": "#009fa5",
        "image": "",
        "ci": "",
        "bgImg": ""
    },
    {
        "name": "더불어민주당",
        "code": "party_1",
        "bg": "#0C69B4",
        "txt": "#0C69B4",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_party_1.gif"
    },
    {
        "name": "자유한국당",
        "code": "party_2",
        "bg": "#C9171E",
        "txt": "#C9171E",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_party_2.gif"
    },
    {
        "name": "국민의당",
        "code": "party_3",
        "bg": "#015F3F",
        "txt": "#015F3F",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_party_3.gif"
    },
    {
        "name": "바른정당",
        "code": "party_4",
        "bg": "#00B1EB",
        "txt": "#1693d4",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_party_4.gif"
    },
    {
        "name": "정의당",
        "code": "party_5",
        "bg": "#FFCB05",
        "txt": "#333333",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_party_5.gif"
    },
    {
        "name": "기타",
        "code": "etc",
        "bg": "#86725c",
        "txt": "#86725c",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_etc.gif"
    },
    {
        "name": "무소속",
        "code": "empty",
        "bg": "#666666",
        "txt": "#666666",
        "bgImg": "http://vote2017.imbc.com/images/vote/bg_empty.gif"
    }
]

var mapSet = mapSet || {};
var adv_bol = false;
var party;
mapSet = {
    init: function () {
        $map = $('#svg-wrap');
        $txt = $('#area-txt');
        if (adv_bol) {
            party_num = party.split("_");
        }
        svg_cnt = svg.length;
        map_cnt = info.length;
        party_cnt = party_color.length;
        this.mapdrow();
        this.txtset();
        this.dataMaching();
    },
    mapdrow: function () {
        var svg_arr = [];
        var group_fill = "";
        var group_per = "";
        var code = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="324px" height="546px" viewBox="0 0 399 660" enable-background="new 0 0 399 660" xml:space="preserve">' +
            '<defs>';
        for (var i = 1; i < party_cnt; i++) {
            code += '<pattern id="party_' + i + '" patternUnits="userSpaceOnUse" width="100" height="100">' +
                '<image xlink:href="' + party_color[i].bgImg + '" x="0" y="0" width="200" height="200" />' +
                '</pattern>'
        }
        code += '</defs>' +
            '<g id="map_svg">';

        for (var j = 1; j <= map_cnt; j++) {
            var code_num = info[j - 1].code;
            var per = 1;
            code += '<polygon  class="area_' + info[j - 1].code + '" name="' + info[j - 1].name + '" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="' + info[j - 1].point + '"/>'
        }
        code += '<polygon class="area_15" name="울릉도" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="360.904,157.172 369.895,157.172 372.143,167.287 368.771,176.277 363.15,176.277 359.779,169.535 358.656,162.792 "/>' +
            '<polygon class="area_15" name="독도" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="380.01,168.411 382.258,167.287 	384.506,168.411 384.506,172.907 381.133,176.278 378.887,174.03 378.887,168.411 "/>' +
            '</g>' +
            '</svg>';
        if (adv_bol) {
            code += '<div class="color-chip"><img src="http://vote2017.imbc.com/images/vote/color_' + party_num[1] + '.gif" alt="칼라농도가이드" /></div>';
        }
        $map.html(code);
    },
    txtset: function () {
        var code = "";
        for (var j = 1; j <= map_cnt; j++) {
            code += '<span class="area_' + info[j - 1].code + '"><em>' + info[j - 1].name + '</em><strong>0%</strong></span>'

        }
        $txt.html(code);
    },
    dataMaching: function () {
        $txt.removeAttr('class');
        $('#area-txt > span').addClass("empty");
        for (var i = 0; i < svg_cnt; i++) {
            var cls = svg[i].cls;
            var area_num = cls.split("_");
            var data = svg[i].percent;
            var party_no = svg[i].party.split("_");
            var fill = "url(#" + svg[i].party + ")";
            if (Number(party_no[1]) > 5) {
                fill = "url(#party_6)";
                if (Number(party_no[1]) == 15) {
                    fill = "url(#party_7)";
                }
            }
            if (data == "100.0") {
                data = "100"
            }
            if (adv_bol) {
                var per = ((Math.round(Math.floor(parseInt(data)) / 10) + 10) * 5) * 0.01;
                fill = party_color[party_num[1]].bg;
                $('#svg-wrap').find('.' + cls).attr({
                    'fill': fill
                }).css({
                    'opacity': per
                });
                $txt.addClass(party);
            } else {
                $('#svg-wrap').find('.' + cls).attr({
                    'fill': fill
                });
            }
            $('#area-txt').find('.' + cls).removeClass("empty");
            $('#area-txt').find('.' + cls + ' strong').text(data + "%");
        }
    }

}

$(function () {
    if (!$('html').hasClass('low-browser')) {
        $('.map-btn a').each(function (index) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.candy-map a').show();
                if (index == 0) {
                    adv_bol = false;
                    $('.candy-map a').removeClass('on');
                    $('.candy-map').removeClass('sup');
                    mapSet.init();
                } else if (index == 1) {
                    adv_bol = true;
                    if (!$(this).hasClass('on')) {
                        $('.candy-map a:eq(0)').click();
                    }
                } else {
                    adv_bol = true;
                    party = "party_0";
                    $('.candy-map a').removeClass('on');
                    $('.candy-map a').hide();
                    mapSet.init();
                }
                $('.map-btn a').removeClass('on');
                $(this).addClass('on');
            });
        });
        $('.candy-map a').each(function (index) {
            $(this).on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass('on')) {
                    adv_bol = true;
                    party = $(this).attr('class');
                    $('.candy-map a').removeClass('on');
                    $(this).addClass('on');
                    $('.candy-map').addClass('sup');
                    if (!$('.map-navi-2').hasClass('on')) {
                        $('.map-btn a').removeClass('on');
                        $('.map-navi-2').addClass('on');
                    }
                    mapSet.init();
                }
            });
        });
        mapSet.init();
    }
});
