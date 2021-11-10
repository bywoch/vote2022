$(function () {

    // $.Dropdown 생성자 함수 정의
    $.Dropdown = function (element, options) {
        // 요소가 존재하지 않으면 false를 반환하고 함수 종료
        if (!element) {
            return false;
        }

        // dropdown 객체의 생성자 함수 내부 변수 및 선택자 설정
        var dropdown = this,
            $this = $(element),
            $options = options || {},
            $buttonChoose = $this.find('.button-choose'), // 선택 버튼 요소 선택
            $list = $this.find('.list'), // 드롭다운 목록 요소 선택
            $listItems = $list.find('button'), // 목록 내의 버튼 요소들 선택
            $textChoose = $options.text || '', // 초기 선택 텍스트 설정
            $index = $options.index || 1; // 초기 인덱스 설정

        // dropdown 초기화 함수
        dropdown.init = function () {
            // 초기 선택 텍스트가 비어있지 않으면 선택 버튼에 텍스트 설정
            if ($textChoose != '') {
                this.setSelectedText($buttonChoose, $textChoose);
            }
            // 이벤트 핸들러 연결
            this.bindHandlers();
        }

        // 이벤트 핸들러 연결 함수
        dropdown.bindHandlers = function () {
            var self = this;
            // $this 요소에 클릭 이벤트 리스너 연결
            $this.on('click', function (e) {
                var $target = $(e.target);
                // 클릭한 요소가 'button-choose' 클래스를 가지고 있으면 목록 확장/축소 토글
                if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-choose')) {
                    self.toggleListExpanded();
                }
                // 클릭한 요소가 'button-item' 클래스를 가지고 있으면 선택한 항목으로 내용 변경 및 목록 축소
                else if ($target && $target.context.nodeName === 'BUTTON' && $target.hasClass('button-item')) {
                    $buttonChoose.text($target.text());
                    self.unExpanded();
                }
            });
        }

        // 요소의 텍스트 설정 함수
        dropdown.setSelectedText = function (element, text) {
            element.text(text);
        }

        // 목록 확장/축소 토글 함수
        dropdown.toggleListExpanded = function () {
            // 목록에 항목이 없으면 함수 종료
            if ($listItems.length < 1) {
                return;
            }
            // 목록이 확장되어 있는 경우 축소하고, 그렇지 않으면 확장함
            if ($list.hasClass('attached')) {
                this.unExpanded();
            } else {
                this.expanded();
            }
        }

        // 목록 확장 함수
        dropdown.expanded = function () {
            // 목록이 아직 확장되어 있지 않은 경우에만 확장
            if (!$list.hasClass('attached')) {
                $buttonChoose.addClass('expanded');
                $list.addClass('attached');
                $list.attr('aria-hidden', 'false'); // 접근성을 위한 속성 변경
            }
        }

        // 목록 축소 함수
        dropdown.unExpanded = function () {
            // 만약 목록이 확장되어 있는 상태라면
            if ($list.hasClass('attached')) {
                // 선택 버튼에서 'expanded' 클래스 제거하여 확장된 시각적 상태 해제
                $buttonChoose.removeClass('expanded');

                // 목록에서 'attached' 클래스 제거하여 확장된 상태 클래스 해제
                $list.removeClass('attached');

                // 접근성을 위해 'aria-hidden' 속성을 'true'로 설정하여 화면에 보이지 않게 함
                $list.attr('aria-hidden', 'true');
            }
        }

        /* 
        - 'unExpanded' 함수가 확장된 목록을 축소하는 역할을 담당
        - 'attached' 클래스가 목록에 적용되어 있는 경우에만, 목록과 선택 버튼의 확장된 상태를 제거하고 접근성을 위해 'aria-hidden' 속성을 조정
        - 마지막으로, 'dropdown' 객체의 초기화 함수를 호출하여 드롭다운 컴포넌트를 초기화 
        */

        // dropdown 객체 초기화 함수 호출
        dropdown.init();
        /* 
        - 사용자가 버튼을 클릭하면 목록이 확장되거나 축소되며, 선택한 항목이 선택 버튼에 표시
        - 접근성을 위해 aria-hidden 속성이 변경되며, 초기 선택 텍스트와 초기 인덱스를 설정
        */
    }

    // jQuery 플러그인 정의
    $.fn.Dropdown = function (options) {
        // 각 요소에 대해 반복 실행
        return this.each(function () {
            // 이미 해당 요소에 Dropdown 플러그인이 적용되어 있는지 확인
            if (undefined == $(this).data('Dropdown')) {
                // Dropdown 객체의 새 인스턴스 생성 및 초기화
                var plugin = new $.Dropdown(this, options);

                // 생성한 플러그인 인스턴스를 요소의 데이터에 저장하여 재사용 가능하도록 함
                $(this).data('Dropdown', plugin);
            }
        });
    }
    /* 
    - 선택한 요소에 대해 Dropdown 컴포넌트를 초기화하고, 이미 해당 요소에 Dropdown이 적용되어 있는 경우에는 중복으로 초기화하지 않음
    - 각 요소에 대해 플러그인을 호출하면 해당 요소에 Dropdown 컴포넌트를 적용
    - 이를 통해 편리하게 Dropdown 컴포넌트를 다수의 요소에 적용하고 관리
    */

    // $('.dropdown').Dropdown();

}());
