// Raphael.js 확장 메서드 정의: drawGrid
Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
    // color 파라미터가 제공되지 않으면 기본값 "#dddee4" 사용
    color = color || "#dddee4";

    // 경로 생성을 위한 초기 위치와 기본 경로 선언
    var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5];

    // 행 높이와 열 너비 계산
    var rowHeight = h / hv,
        columnWidth = w / wv;

    // 가로 선(테이블)을 경로에 추가
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
    }

    // 세로 선(테이블)을 경로에 추가
    for (i = 1; i < wv; i++) {
        path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
    }

    // 생성한 경로를 사용하여 Raphael의 path 요소 생성 후 속성 설정
    return this.path(path.join(",")).attr({
        stroke: color // 경로의 선 색상 설정
    });
};


$(function () {
    $("#data").css({
        position: "absolute",
        left: "-9999em",
        top: "-9999em"
    });
});

// 페이지 로드 후 실행될 함수
window.onload = function () {

    /* 
    - 베지어 곡선을 중간 지점에서 분할하는 데 사용
    - 이렇게 분할된 곡선을 사용하여 데이터 포인트 간의 부드러운 곡선 연결을 생성하는 데 활용
    - 주어진 세 점 p1, p2, p3을 기반으로 베지어 곡선의 중간 지점을 계산하고, 이를 통해 곡선의 모양을 제어 
    */

    // 베지어 곡선의 중간 지점을 찾는 함수 정의
    function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
        // p1과 p2 사이의 거리의 절반을 계산하여 베지어 곡선을 나누는 지점 l1 계산
        var l1 = (p2x - p1x) / 2,
            // p2와 p3 사이의 거리의 절반을 계산하여 베지어 곡선을 나누는 지점 l2 계산
            l2 = (p3x - p2x) / 2,
            // p1에서 p2로의 각도를 계산하여 atan 함수 사용
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            // p2에서 p3로의 각도를 계산하여 atan 함수 사용
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));

        // a가 양수이면 Math.PI - a로 변경 (베지어 곡선의 회전 방향 조절)
        a = p1y < p2y ? Math.PI - a : a;
        // b가 양수이면 Math.PI - b로 변경 (베지어 곡선의 회전 방향 조절)
        b = p3y < p2y ? Math.PI - b : b;

        // 베지어 곡선의 중간 지점을 계산하여 alpha 값 설정
        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
            // 베지어 곡선의 중간 지점에서 p1 방향으로 떨어진 거리 dx1 계산
            dx1 = l1 * Math.sin(alpha + a),
            // 베지어 곡선의 중간 지점에서 p1 방향으로 떨어진 거리 dy1 계산
            dy1 = l1 * Math.cos(alpha + a),
            // 베지어 곡선의 중간 지점에서 p3 방향으로 떨어진 거리 dx2 계산
            dx2 = l2 * Math.sin(alpha + b),
            // 베지어 곡선의 중간 지점에서 p3 방향으로 떨어진 거리 dy2 계산
            dy2 = l2 * Math.cos(alpha + b);

        // 계산된 값을 객체로 반환
        return {
            x1: p2x - dx1,
            y1: p2y + dy1,
            x2: p2x + dx2,
            y2: p2y + dy2
        };
    }
    // Grab the data
    var labels = [],
        data = [];
    //테이블 x축
    $("#data tfoot th").each(function () {
        labels.push($(this).html());
    });
    //테이블 data
    $("#data tbody td").each(function () {
        data.push($(this).html());
    });

    // Draw
    var width = 924, // 전체 넓이
        height = 422, // 전체 높이
        leftgutter = 30, //left 패딩
        bottomgutter = 22, //bottom 패딩
        topgutter = 20, // top 패딩
        color = "#f2321b", //이음선 color
        r = Raphael("holder", width, height),
        txt = {
            font: '15px Nanum Gothic Bold',
            fill: "#606060"
        }, //x축 txt
        txt1 = {
            font: '10px Helvetica, Arial',
            fill: "#f2321b"
        },
        txt2 = {
            font: '12px Helvetica, Arial',
            fill: "#000"
        },
        X = (width - leftgutter) / labels.length,
        Y = (height - bottomgutter - topgutter) / 100;

    //   r.drawGrid(leftgutter + X * .5 + .5, topgutter + .5, width - leftgutter - X, height - topgutter - bottomgutter, 11, 10, "#dddee4");//테이블 선 color, 13은 x축 5은 y축

    var path = r.path().attr({
        stroke: color,
        "stroke-width": 8,
        "stroke-linejoin": "round"
    }), //이음선굵기
        bgp = r.path().attr({
            stroke: "none",
            opacity: 0,
            fill: color
        }), //이음 선과 x축 사이 bg 색 농도
        label = r.set(),
        lx = 0,
        ly = 0,
        is_label_visible = false,
        leave_timer,
        blanket = r.set();

    /* 2018 수정 텍스트 length */
    // 라벨 생성 및 설정
    for (var i = 0; i < labels.length; i++) {
        // 데이터 값을 나타내는 텍스트 라벨 생성
        label.push(r.text(0, -20, data[i]).attr(txt).attr({
            fill: color
        })); // data 텍스트
        // 라벨 숨기기 (기본적으로 숨겨진 상태)
        // label.hide();

        /* 
         - labels 배열에 저장된 각 라벨에 대해 데이터 값을 나타내는 텍스트 라벨을 생성
         - r.text(0, -20, data[i]).attr(txt).attr({ fill: color }) 부분은 위치 (0, -20)에 데이터 data[i] 값을 표시하는 Raphael.js의 text 요소를 생성하고, 이를 위해 지정된 텍스트 스타일 txt 및 색상 color를 설정

         - 또한 주석 처리된 // label.hide(); 부분은 처음에는 라벨을 숨기는 역할
         - 그러나 주석 처리되어 있으므로 현재는 라벨이 숨겨지지 않고 표시
         - 주석을 제거하면 라벨을 처음부터 숨기는 동작이 활성화
        */

    }

    /* 2018 수정 텍스트 length 끝 */

    // 호버링 시 나타나는 상자 (툴팁) 생성 및 설정
    var frame = r.popup(100, 100, label, "top").attr({
        fill: "transparent", // 배경 색상을 투명하게 설정하여 보이지 않도록 함
        stroke: "none", // 외곽선 없음
        "stroke-width": 0 // 외곽선 두께 0
    }).hide(); // 초기에는 숨겨진 상태로 설정
    //hover 박스


    var p, bgpp;

    // 데이터 포인트 및 라벨 생성 및 상호작용 효과 구현
    for (var i = 0, ii = labels.length; i < ii; i++) {
        // 데이터 포인트의 x, y 위치 계산
        var y = Math.round(height - bottomgutter - Y * data[i]),
            x = Math.round(leftgutter + X * (i + .5));

        // x축 라벨 생성
        var t = r.text(x, height - 6, labels[i]).attr(txt).toBack();

        // 첫 번째 데이터 포인트인 경우 초기 경로 설정
        if (!i) {
            p = ["M", x, y, "C", x, y];
            bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
        }

        // 중간 데이터 포인트인 경우 곡선 경로 계산
        if (i && i < ii - 1) {
            var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
                X0 = Math.round(leftgutter + X * (i - .5)),
                Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
                X2 = Math.round(leftgutter + X * (i + 1.5));

            // getAnchors 함수를 사용하여 곡선 경로의 중간 지점 계산
            var a = getAnchors(X0, Y0, x, y, X2, Y2);

            // 경로에 중간 지점 정보 추가
            p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
            bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
        }

        // 데이터 포인트를 나타내는 동그라미 생성
        var dot = r.circle(x + 1, y + .5, 4).attr({
            fill: "#fff",
            stroke: color,
            "stroke-width": 2
        });

        // 상호작용을 위한 블랭킷 생성 및 설정
        blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({
            stroke: "none",
            fill: "#fff",
            opacity: 0
        }));

        var rect = blanket[blanket.length - 1];

        // 호버링 및 상호작용 처리
        (function (x, y, data, lbl, dot) {
            var timer = 0;
            $(document).ready(function () {
                clearTimeout(leave_timer);
                var side = "top";
                // 툴팁 위치와 애니메이션 설정
                var ppp = r.popup(x, y, label, side, 1),
                    anim = Raphael.animation({
                        path: ppp.path,
                        transform: ["t", ppp.dx, ppp.dy]
                    }, 200 * is_label_visible);
                lx = label[0].transform()[0][1] + ppp.dx;
                ly = label[0].transform()[0][2] + ppp.dy;
                frame.show().stop().animate(anim);

                // 라벨 위치 조정
                label[i].attr('transform', ["t", x, y]);

                // 호버링 시 동그라미 크기 설정
                dot.attr("r", 5); //hover 동그라미크기
                is_label_visible = true;
            }); // 2018 수정 hover 콜백함수 삭제
        })(x, y, data[i], labels[i], dot);
    }

    // 마지막 데이터 포인트를 나타내는 베지어 곡선의 경로 정보를 추가
    p = p.concat([x, y, x, y]);

    // 경로를 설정하여 베지어 곡선 그리기
    path.attr({
        path: p
    });

    //bgp.attr({path: bgpp});
    //frame.toFront();
    //label[0].toFront();
    //label[1].toFront();
    //blanket.toFront();
};
