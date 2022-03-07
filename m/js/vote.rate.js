// 문서가 준비되면 실행
document.addEventListener('DOMContentLoaded', () => {
    makeRateChart(seriesData);
});

const seriesData = [
    {
        showInLegend: false,
        name: '20대',
        data: [3.9, 4, 4.2, 15.7, 19.5, 23.9, 37.2, 49.0, 70.1, 73.7, 74, 76.1, 78, 80, null],
        zIndex: 1,
        lineWidth: 3,
        marker: {
            symbol: 'circle',
            radius: 6,
            states: {
                hover: {
                    fillColor: '#FFFFFF',
                    lineColor: '#eb6100',
                    lineWidth: 4,
                },
            },
        },
        color: '#eb6100',
    },
    {
        showInLegend: false,
        name: '19대',
        data: [2.5, 5.6, 9.4, 14.1, 19.4, 24.5, 55.5, 59.9, 63.7, 67.1, 70.1, 72.7, 75.1, null, 77.2],
        zIndex: 0,
        marker: {
            radius: 5,
        },
        color: '#bab9e3',
    },
    {
        showInLegend: false,
        name: '18대',
        data: [2.8, null, 11.6, null, 26.4, 34.9, 45.3, 52.6, 59.3, 65.2, 70.1, 75.8, null, null, null],
        zIndex: 0,
        marker: {
            radius: 5,
        },
        color: '#e7e7e7',
    },
];


function makeRateChart(seriesData) {
    document.addEventListener('DOMContentLoaded', () => {
        if (!Array.prototype.filter) {
            // 만약 배열의 filter 메서드가 존재하지 않는 경우
            Array.prototype.filter = function (fun /*, thisp */ ) {
                "use strict";
                // 엄격 모드(strict mode) 활성화
        
                // this 값이 undefined 또는 null인 경우 TypeError 발생
                if (this === void 0 || this === null)
                    throw new TypeError();
        
                // 현재 객체를 t 변수에 할당
                const t = Object(this);
        
                // 배열의 길이를 양수로 변환하여 len 변수에 할당
                const len = t.length >>> 0;
        
                // fun이 함수가 아닌 경우 TypeError 발생
                if (typeof fun !== "function")
                    throw new TypeError();
        
                // 결과를 저장할 빈 배열 res 생성
                const res = [];
        
                // filter 메서드에 전달된 두 번째 인자를 thisp 변수에 할당
                const thisp = arguments[1];
        
                // 배열의 각 요소 순회
                for (let i = 0; i < len; i++) {
                    // i 인덱스가 t에 존재하는 경우
                    if (i in t) {
                        // 현재 인덱스의 값 가져와 val 변수에 할당
                        const val = t[i];
        
                        // 주어진 함수 fun을 thisp 컨텍스트로 호출하여 조건 평가
                        if (fun.call(thisp, val, i, t))
                            // 조건을 만족하는 경우 res 배열에 추가
                            res.push(val);
                    }
                }
        
                // 조건을 만족하는 요소로 구성된 새로운 배열 res 반환
                return res;
            };
        }        

        Highcharts.chart('container', {
            chart: {
                type: 'line',
                events: {
                    load: function (chart) {
                        const thisChart = chart.target;
                        const data = thisChart.series[0].data;
                        const filterData = data.filter(data => !data.isNull);
                        const v20 = thisChart.series[0].data[filterData.length - 1];
                        const v19 = thisChart.series[1].data[filterData.length - 1];
                        const v18 = thisChart.series[2].data[filterData.length - 1];
                        setTimeout(function () {
                            if (v18.y === null && v19.y === null) {
                                thisChart.tooltip.refresh([v20]);
                            } else if (v18.y === null) {
                                thisChart.tooltip.refresh([v20, v19]);
                            } else {
                                thisChart.tooltip.refresh([v20, v19, v18]);
                            }
                            thisChart.xAxis[0].drawCrosshair(null, data[filterData.length - 1]);
                        }, 500);
                        thisChart.xAxis[0].labelGroup.element.childNodes[filterData.length - 1].classList.add('active');
                    }
                },
            },
            title: {
                text: ''
            },
            xAxis: {
                crosshair: {
                    width: 50,
                    color: '#f7f7f9'
                },
                categories: ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '19:30', '20'],
                labels: {
                    step: 1,
                },
            },
            yAxis: {
                title: {
                    text: ''
                },
                min: 0,
                max: 100
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                useHTML: true,
                padding: 0,
                borderRadius: 5,
                formatter: function () {
                    let s = "<div class='tooltips'>";
                    this.points.forEach(point => {
                        s += `<span>${point.series.name}&nbsp;${point.y}%</span>&nbsp;&nbsp;`;
                    });
                    s += '</div>';
                    return s;
                },
                style: {
                    fontSize: "20px"
                },
                positioner: function (labelWidth, labelHeight, point) {
                    // BWC
                    const tooltips = document.querySelectorAll('.highcharts-tooltip .tooltips span');
                    tooltips.forEach(tooltip => {
                        if (tooltip.textContent.includes("20대")) {
                            tooltip.style.fontWeight = 'bold';
                        }
                    });

                    const labelThird = document.querySelector('.highcharts-axis-labels text:nth-child(4)').previousSibling.classList.contains('active');
                    const labelList9 = document.querySelector('.highcharts-axis-labels text:nth-child(10)').nextSibling.classList.contains('active');

                    if (labelThird) {
                        return {
                            x: point.plotX - labelWidth / 3 + 70,
                        };
                    } else if (labelList9) {
                        return {
                            x: point.plotX - labelWidth + 75,
                        };
                    } else {
                        return {
                            x: point.plotX - labelWidth / 3,
                        };
                    }
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    connectNulls: true,
                    point: {
                        events: {
                            mouseOver: function () {
                                const label = this.series.chart.xAxis[0].labelGroup.element.childNodes[this.x];
                                label.classList.add('active');
                            },
                            mouseOut: function () {
                                const label = this.series.chart.xAxis[0].labelGroup.element.childNodes[this.x];
                                label.classList.remove('active');
                            }
                        }
                    }
                }
            },
            series: seriesData
        });
    });
}

