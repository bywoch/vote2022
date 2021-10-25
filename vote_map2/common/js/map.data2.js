var info = [{
        "code": 1,
        "name": "서울",
        "point": "86.8,127.5 89.5,118.4 106.9,118.4 115.1,135.8 110.5,145.8 99.6,148.5 88.6,145.8 83.2,141.2    74.9,125.7  "
    },
    {
        "code": 2,
        "name": "부산",
        "point": "203.3,384.4 216,372.5 227,372.5 237,360.7 248,358.8 255,348.7 258.9,354.3 269,357 227,391.7    219.7,387.1 206,390.8  "
    },
    {
        "code": 3,
        "name": "대구",
        "point": "212.9,285.2 205.6,288.9 201,294.3 192.8,294.3 192.8,315.3 186.4,324.5 212.9,325.4 220.2,311.7    216.5,306.2 224.7,294.3  "
    },
    {
        "code": 4,
        "name": "인천",
        "point": "51.2,98.3 64.9,105.6 65.8,112.9 62.2,119.3 65.8,125.7 74.9,125.7 83.2,141.2 72.2,152.2 65.8,148.5    54,151.3 29.3,124.8 33,110.2  "
    },
    {
        "code": 5,
        "name": "광주",
        "point": "78.7,359.8 92.4,359.8 96.9,367.1 102.4,369.9 94.2,384.5 85.1,381.7 77.8,385.4 70.5,379.9    70.5,366.2  "
    },
    {
        "code": 6,
        "name": "대전",
        "point": "117.7,225.2 110.2,228.6 104.9,230.7 101,235.9 96.5,238.7 99.5,252.2 115.9,262 116,249.9    124.4,236.3  "
    },
    {
        "code": 7,
        "name": "울산",
        "point": "279.8,322.3 266.2,318.7 260.8,322.6 252.6,313.2 242.5,327.8 240.7,337.8 246.2,345.1 255,348.7    259.2,354.3 269,357  "
    },
    {
        "code": 9,
        "name": "경기도",
        "point": "100.5,60 115.1,77.3 126.1,76.4 137.9,100.2 133.4,108.4 142.5,128.4 152.5,128.4 156.2,137.6    149.8,145.8 152.5,171.3 145.2,179.6 134.3,181.4 118.7,196 85.9,196.9 81.3,190.5 69.5,190.5 62.2,184.1 67.6,172.3 63.1,167.7    72.2,152.2 83.2,141.2 87.8,145.1 99.6,148.5 110.5,145.8 115.1,135.8 106.9,118.4 89.5,118.4 86.8,127.5 74.9,125.7 65.8,125.7    62.2,119.3 65.8,112.9 64.9,105.6 72.2,102 73.1,91.9 81.3,84.6 80.4,71.9  "
    },
    {
        "code": 10,
        "name": "강원도",
        "point": "114.2,51.8 131.5,51.8 152.5,39.9 158.9,27.1 168,21.7 179.9,21.7 183.5,16.2 192.7,25.3 229.2,81.9    248.3,135.8 263.9,154 248.3,177.7 235.6,175.9 220.1,176.8 215.5,183.2 192.7,182.3 187.2,172.3 176.2,166.8 168,173.2    152.5,171.3 149.8,145.8 156.2,137.6 152.5,128.5 142.5,128.5 133.4,108.4 137.9,100.2 126.1,76.4 115.1,77.3 100.5,60  "
    },
    {
        "code": 11,
        "name": "충청북도",
        "point": "215.5,183.2 200.9,203.3 179,201.5 157.1,229.8 162.6,235.3 159.8,244.4 155.3,247.1 155.3,254.4    173.5,259.9 170.8,276.3 160.7,285.5 140.2,284.1 140.7,276.3 115.9,261.7 116,249.9 124.2,236.2 117.8,225.2 123.3,216.1    123.3,209.7 118.8,205.1 118.8,196 134.3,181.4 144.7,179.7 152.5,171.4 168,173.2 176.3,166.8 187.2,172.3 192.7,182.3  "
    },
    {
        "code": 12,
        "name": "충청남도",
        "point": "104.4,196.3 85.9,196.9 81.3,190.5 69.5,190.5 62.2,184.1 43.9,185.8 25.7,219.6 42.1,227.8    35.7,242.4 44.8,258.9 56.7,257.9 64,271.6 59.4,279.8 70.4,284.4 70.4,289 81.3,287.1 91.4,271.6 99.6,273.5 99.6,282.6    108.7,286.2 111.4,279.8 124.2,283.5 126.1,291.7 139.7,291.7 140.7,276.5 99.6,252.5 96.8,238.8 101.4,236 105.1,230.6    110.9,228.1 108,225.2 108.6,220.1 106.4,212.5  "
    },
    {
        "code": 13,
        "name": "전라북도",
        "point": "58.5,279.8 58.5,297.2 64.9,301.8 63.1,315.4 54,322.7 46.7,340.1 48.5,353.8 63.1,356.5 73.1,352.9    73.1,347.4 85,341 107.8,357.4 120.6,357.4 127,360.2 137.9,359.2 143.4,351 143.4,334.6 147,325.5 143.4,312.7 160.7,299    160.7,285.3 140.7,283.5 139.7,291.7 126.1,291.7 124.2,283.5 111.4,279.8 108.7,286.2 99.6,282.6 99.6,273.5 91.4,271.6    81.3,287.1 70.4,289 70.4,284.4  "
    },
    {
        "code": 14,
        "name": "전라남도",
        "point": "70.5,379.9 77.8,385.4 85.1,381.7 94.2,384.5 102.4,369.9 96.9,367.1 92.4,359.8 78.7,359.8    70.6,366.1 62.4,356.4 73.1,352.9 73,347.1 85,341 107.8,357.4 121.4,357 127,360.2 137.8,359 144.2,366.3 150.6,384.5    149.7,401.9 160.4,420 157.9,427.4 147.9,433.8 142.4,431.1 134.2,435.6 138.8,449.3 127.8,453 118.7,449.3 106.8,456.6 104.1,463    84.9,466.7 76.7,464.8 63,463.9 55.7,454.8 37.5,457.5 33.8,468.5 13.7,476.7 4.6,465.7 18.3,442.9 6.4,423.8 23.8,399.1    15.5,388.2 21.9,373.6 32,373.6 48.5,353.8 62.2,356.3 70.5,366.2  "
    },
    {
        "code": 15,
        "name": "경상북도",
        "point": "263.9,154 248.3,177.7 235.6,175.9 220.1,176.8 200.9,203.3 179.1,201.3 157.1,229.8 162.7,235    159.8,244.4 155.3,247.1 155.4,254.2 173.5,259.9 170.9,276.1 160.7,285.5 160.8,298.9 170,314.4 180.9,324.5 186.4,324.5    192.8,315.3 192.8,294.3 201,294.3 205.6,288.9 212.9,285.2 224.7,294.3 216.5,306.2 220.2,311.7 212.9,325.4 223.8,329.9    233.8,325.4 242.5,327.8 252.6,313.2 260.8,322.6 266.2,318.7 279.5,322.6 285,272.4 272.2,281.6 270.3,235 275.8,206.7  "
    },
    {
        "code": 16,
        "name": "경상남도",
        "point": "137.6,359.7 143.9,366.1 150.3,384.4 149.4,401.7 160.4,420 166.8,419.1 171.3,422.7 183.2,420    185.9,413.6 196,411.8 209.7,416.3 228.8,399 227,391.7 219.7,387.1 206,390.8 203.3,384.4 216,372.5 227,372.5 237,360.7    248,358.8 255.3,348.8 246.2,345.1 240.7,337.8 242.5,327.8 233.4,325.1 223.3,329.6 211.6,325 180.5,324.1 169.5,314.1    160.4,298.6 143,312.3 146.7,325.1 143,334.2 143,350.6 137.6,358.8  "
    },
    {
        "code": 17,
        "name": "제주도",
        "point": "38,504.3 70.8,495.2 80.9,487.9 97.3,504.3 94.6,524.4 70.8,535.3 37.1,535.3 27,519.8  "
    },
    {
        "code": 18,
        "name": "세종시",
        "point": "104.4,196.3 106.4,212.3 108.6,220.1 108,225.2 110.9,228.3 117.8,225.2 123.3,216.1 123.3,209.7   118.8,205.1 118.7,196 "
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
        var code = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="324px" height="546px" viewBox="0 0 324 546" enable-background="new 0 0 399 660" xml:space="preserve">' +
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
        code += '<polygon class="area_15" name="울릉도" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="308.6,141.8 310.4,140.9 312.2,141.8 312.2,145.4 309.5,148.2 307.7,146.3 307.7,141.8   "/>' +
            '<polygon class="area_15" name="독도" fill="#ddd" stroke="#FFFFFF" stroke-miterlimit="10" points="293.1,132.7 300.4,132.7 302.2,140.9 299.5,148.2 294.9,148.2 292.2,142.7 291.2,137.2   "/>' +
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
