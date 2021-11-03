Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
    color = color || "#dddee4";
    var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5],
        rowHeight = h / hv,
        columnWidth = w / wv;
    //가로 선(테이블)
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
    }
    //세로 선(테이블)
    for (i = 1; i < wv; i++) {
        path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
    }
    return this.path(path.join(",")).attr({
        stroke: color
    });
};

$(function () {
    $("#data").css({
        position: "absolute",
        left: "-9999em",
        top: "-9999em"
    });
});

window.onload = function () {
    function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
        var l1 = (p2x - p1x) / 2,
            l2 = (p3x - p2x) / 2,
            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
        a = p1y < p2y ? Math.PI - a : a;
        b = p3y < p2y ? Math.PI - b : b;
        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
            dx1 = l1 * Math.sin(alpha + a),
            dy1 = l1 * Math.cos(alpha + a),
            dx2 = l2 * Math.sin(alpha + b),
            dy2 = l2 * Math.cos(alpha + b);
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
    for (var i = 0; i < labels.length; i++) {
        label.push(r.text(0, -20, data[i]).attr(txt).attr({
            fill: color
        })); // data 텍스트
        // label.hide();
    }
    /* 2018 수정 텍스트 length 끝 */

    var frame = r.popup(100, 100, label, "top").attr({
        fill: "transparent",
        stroke: "none",
        "stroke-width": 0
    }).hide(); //hover 박스

    var p, bgpp;

    for (var i = 0, ii = labels.length; i < ii; i++) {
        var y = Math.round(height - bottomgutter - Y * data[i]),
            x = Math.round(leftgutter + X * (i + .5)),
            t = r.text(x, height - 6, labels[i]).attr(txt).toBack();
        if (!i) {
            p = ["M", x, y, "C", x, y];
            bgpp = ["M", leftgutter + X * .5, height - bottomgutter, "L", x, y, "C", x, y];
        }
        if (i && i < ii - 1) {
            var Y0 = Math.round(height - bottomgutter - Y * data[i - 1]),
                X0 = Math.round(leftgutter + X * (i - .5)),
                Y2 = Math.round(height - bottomgutter - Y * data[i + 1]),
                X2 = Math.round(leftgutter + X * (i + 1.5));
            var a = getAnchors(X0, Y0, x, y, X2, Y2);
            p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
            bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
        }
        var dot = r.circle(x + 1, y + .5, 4).attr({
            fill: "#fff",
            stroke: color,
            "stroke-width": 2
        });

        blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({
            stroke: "none",
            fill: "#fff",
            opacity: 0
        }));

        var rect = blanket[blanket.length - 1];

        (function (x, y, data, lbl, dot) {
            var timer = 0;
            $(document).ready(function () {
                clearTimeout(leave_timer);
                var side = "top";
                var ppp = r.popup(x, y, label, side, 1),
                    anim = Raphael.animation({
                        path: ppp.path,
                        transform: ["t", ppp.dx, ppp.dy]
                    }, 200 * is_label_visible);
                lx = label[0].transform()[0][1] + ppp.dx;
                ly = label[0].transform()[0][2] + ppp.dy;
                frame.show().stop().animate(anim);

                /* 2018 수정 텍스트 position */
                label[i].attr('transform', ["t", x, y]);
                /* 2018 수정 텍스트 끝 position */

                dot.attr("r", 5); //hover 동그라미크기
                is_label_visible = true;
            }); // 2018 수정 hover 콜백함수 삭제
        })(x, y, data[i], labels[i], dot);
    }
    p = p.concat([x, y, x, y]);
    
    path.attr({
        path: p
    });
    
};
