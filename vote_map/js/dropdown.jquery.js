$(function () {

    $.Dropdown = function (element, options) {
        if (!element) {
            return false;
        }

        var dropdown = this,
            $this = $(element),
            $options = options || {},
            $buttonChoose = $this.find('.button-choose'),
            $list = $this.find('.list'),
            $listItems = $list.find('button');

        var $type = $options.type || 0; //sg_type
        var $value = $options.value || ''; //["sido", "gu", "action", "none"]
        var $text = $options.text || ''; //select text
        var $call = $options.call || ''; //call page
        var $index = $options.index || 0; //value index

        dropdown.init = function () {
            if ($text != '') {
                // 선택된 텍스트가 비어있지 않은 경우 실행
                var selectChk = false; // 선택 여부를 확인하는 변수

                // 각 리스트 아이템을 순회하며 선택된 텍스트와 일치하는지 확인
                $listItems.each(function () {
                    if ($(this).text() == $text) {
                        selectChk = true; // 일치하는 항목이 있을 경우 선택 여부를 true로 설정

                        // 버튼 텍스트와 데이터 속성을 설정하고 다음 단계로 진행
                        $buttonChoose.text($text);
                        $buttonChoose.attr('data-set', $(this).attr('data-set'));
                        dropdown.nextStep();
                    }
                });

                // 선택 여부가 false이고, 특정 조건에 부합하는 경우
                if (!selectChk && $value[$index] != "none" && ($call == "vote" || $call == "candidate")) {
                    // 다음 단계로 이동하는 함수 호출
                    nextStepMove("action", "");
                }
            }
            this.bindHandlers(); // 이벤트 핸들러를 등록
        }

        dropdown.bindHandlers = function () {

            var self = this; // 현재 객체를 저장하기 위한 변수

            // $this 엘리먼트에 클릭 이벤트 핸들러를 등록
            $this.on('click', function (e) {
                var $target = $(e.target); // 클릭한 요소를 jQuery 객체로 가져옴

                // 클릭한 요소가 버튼이면서 'button-choose' 클래스를 가지고 있는 경우
                if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-choose')) {
                    self.toggleListExpanded(); // 리스트 확장/축소를 토글
                }
                // 클릭한 요소가 버튼이면서 'button-item' 클래스를 가지고 있는 경우
                else if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-item')) {
                    $buttonChoose.text($target.text()); // 선택한 버튼의 텍스트를 버튼에 설정
                    $buttonChoose.attr('data-set', $target.attr('data-set')); // 선택한 버튼의 데이터 속성을 설정

                    dropdown.nextStep(); // 다음 단계로 진행

                    self.unExpanded(); // 리스트를 축소
                }
            });
        }

        // 선택된 엘리먼트의 텍스트를 변경하는 함수
        dropdown.setSelectedText = function (element, text) {
            element.text(text);
        }

        // 드롭다운 리스트를 토글하여 확장/축소하는 함수
        dropdown.toggleListExpanded = function () {
            // 리스트가 이미 확장되어 있다면 축소, 그렇지 않으면 확장
            ($list.hasClass('attached')) ? this.unExpanded() : this.expanded();
        }

        // 드롭다운 리스트를 확장하는 함수
        dropdown.expanded = function () {
            if (!$list.hasClass('attached')) {
                $buttonChoose.addClass('expanded');
                $list.addClass('attached');
                $list.attr('aria-hidden', 'false'); // 스크린 리더 사용자에게 보이도록 함
            }
        }

        // 드롭다운 리스트를 축소하는 함수
        dropdown.unExpanded = function () {
            if ($list.hasClass('attached')) {
                $buttonChoose.removeClass('expanded');
                $list.removeClass('attached');
                $list.attr('aria-hidden', 'true'); // 스크린 리더 사용자에게 숨김 처리
            }
        }

        // 다음 단계로 이동하는 함수
        dropdown.nextStep = function () {
            // 호출 종류에 따라 다음 단계를 수행
            if ($call == "interest") {
                if ($this.hasClass('interest_sido')) {
                    setInterestGuList($buttonChoose.attr('data-set'));
                } else if ($this.hasClass('interest_gu')) {
                    setInterestDongList($buttonChoose.attr('data-set'));
                }
            } else if ($call == "candidate") {
                nextStepMove($value[$index], $buttonChoose.attr('data-set'));
            } else if ($call == "vote") {
                nextStepMove($value[$index], $buttonChoose.attr('data-set'));
            }
        }

        // 초기화 함수 호출
        dropdown.init();

    }

    // jQuery의 확장 메서드를 사용하여 "Dropdown" 플러그인을 정의
    $.fn.Dropdown = function (options) {
        // 선택한 각 엘리먼트에 대해 동작을 수행
        return this.each(function () {
            // 해당 엘리먼트에 "Dropdown" 플러그인 데이터가 없는 경우에만 실행
            if (undefined == $(this).data('Dropdown')) {
                // 새로운 "Dropdown" 플러그인 인스턴스를 생성하고 해당 엘리먼트에 연결
                var plugin = new $.Dropdown(this, options);
                $(this).data('Dropdown', plugin);
            }
        });
    }

}());
