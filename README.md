# core component 내용 정리

## 생성

new를 활용하여 직접 컴포넌트를 binding하는 작업은 최상위 컴포넌트를 생성할때만 사용된다. 이후 자식 컴포넌트는 setChild 매서드를 활용하여 추가한다. 선언은 new Component($target, props, emits) 형식으로 한다.

*parameters*

$target: 최상위 컴포넌트가 들어갈 dom element

props: 부모 state에서 받아올 데이터 key를 가진 배열

emits: 부모 state를 변경할 때 사용하는 함수를 가진 object

## methods

**setup()**

컴포넌트가 최초로 생성 된 후 동작해야 할 작업들을 선언한다. 주로 setChild 매소드를 호출하는데 사용된다.

**created()**

컴포넌트가 render 되기 전에 동작해야 할 작업들은 선언한다. 주로 api 통신이 이루어진다.

**mounted()**

컴포넌트가  render 된 후에 동작해야 할 작업들은 선언한다.

**data()**

component에서 사용하는 state를 만들어주는 함수이다. object 형식으로 값을 반환해준다. 

**getData()**

component에 있는 state를 가져오는 함수이다. 해당 함수를 통해 값을 가져와야 state가 변경됐을 때 render가 이루어진다.

**getProps()**

부모 컴포넌트에 위치한 state 값을 가져오는 함수이다. 해당 함수를 통해 값을 가져와야 state가 변경됐을 때 render가 이루어진다.

**template()**

컴포넌트의 dom 형식을 문자열 형식으로 반환해준다. template 가장 바깥은 한개의 태그로 감싸져있어야한다.

**setEvent()**

component setup이 이루어진 후 등록될 event를 선언하는 매소등이다. addEvent 매소드를 활용하여 등록한다.

**addEvent(eventType, selector, callBack)**

eventListener를 생성하는 함수이다. eventType에는 이벤트 타입을, selector에는 eventTarget을 callBack에는 트리거가 발생했을 때 실행될 함수를 넣어준다. callBack함수에는 event 정보값과 selector로 선택된 target element가 순서대로 파라미터로 들어온다.

**setChild(selector, classType, props, emits)**

자식 컴포넌트를 생성하는 매소드이다. selector를 통해 template에서 선언되어 있는 element 중 자식 component가 들어갈 위치를 주입한다.

classType에는 자식 컴포넌트의 class를 반환해주는 함수를 주입한다. props, emits는 생성 parameter와 동일하다.



## Life Cycle

생성 시: setup - setEvent - created - render - mounted

render 과정: 부모 virtual dom 생성 - childComponent에서 등록한 event destroy - 등록되어있는 childComponent 생성 - dom에 반영



# 개발하면 겪은 문제

## 1
**개요**
Detail View selection의 change event가 여러번 호출되며 setState가 함께 호출되어 render가 너무 자주 호출되는 문제가 발생하였다.

**문제 원인**
event delegation 패턴을 사용하여 모든 event가 최상위 노드(App)에 등록되어 있다. 따라서 innerHTML로 내부 구조를 변경하더라도 등록된 이벤트가 사라지지 않는다.
이로 사라져야할 changeEvent가 지속적으로 호출된다.

**해결책 1**
debounce를 사용하여 render가 여러번 호출되는것을 막는다.
-> 근본적인 해결이 되지 못함.

**해결책 2**
Vue LifeCycle의 개념을 차용해 부모 컴포넌트의 상태가 변해 update 되기 전에 자식 컴포넌트에서 destroyed 함수를 호출하도록 만들고
destroyed 함수 내부에서 기존에 등록되어있는 event를 삭제하도록 만든다.

## 2
**개요**
페이지를 이동하지 않을 때도 불필요한 화면 깜빡임 현상이 발생함.

**문제 원인**
state를 변경시켜 render가 발생할때마다 화면 전체가 re-rendering되도록 되어있어 발생하는 문제.

**해결책 1**
변경된 state를 사용하는 component중 최상위 component만 render가 발생하도록 한다.
이를 위해 template에서 사용중인 state를 받아오도록 만들고, render에서 해당 state가 변했을 경우에만 render를 진행하도록 한다.
위 로직을 최상위 컴포넌트에서부터 검사한다.
=> 코어를 변경해야함

## 3
**개요**
상태값에 따라서 동일한 위치에 다른 자식 컴포넌트를 삽입할수 없음.

**문제 원인**
컴포넌트가 만들어지는 가장 초기 단계에서 이미 어떤 childComponent가 어떤 위치에 들어갈지 결정되기 때문에 발생되는 문제.

**해결책 1**
childinfo에도 Object.defineProperty 적용한후 변경될 경우 re-rendering하도록한다.
-> setChild를 언제 호출해야하는지 명확하지 않음.
-> class를 함수로도 받을 수 있도록 만들어주어 동적으로도 받을 수 있게 해준다.