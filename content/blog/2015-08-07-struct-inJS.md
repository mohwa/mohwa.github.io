---
layout: post
title: "Struct in JS"
description: "JavaScript 를 활용한 구조체 구현"
date:   2015-08-07
categories: designPattern
#tags: [Struct, C#, C++, JAVA, JavaScript, designPattern]
---

## 1. 정의

- C 와 C++(또는 C# 등) 에서 **구조화 된 데이터**를 처리할 때, **Struct** 를 사용하는데 이를 [구조체](https://ko.wikipedia.org/wiki/Struct)라 부른다.

	- 최초의 **구조체**는 C 언어에서 다양한 **자료구조**를 하나의 **집합**으로 만들어 **관리**하기위해 만들어졌다.

		- 구조체는 하나 이상의 **자료구조**를 가진 또 하나의 **데이터 타입**을 정의한다.

	- 이 글은 **구조체**를 다루는 여러 언어 중 `[C# 구조체]` 를 기준으로 하고있다.

	![](http://mohwa.github.io/blog/assets/images/posts/struct_diagram.jpg?2)

	- 코드화

    ```javascript
    public struct Song
    {
        public int lengthInSeconds, yearRecorded;

        // 생성자
        public Song(int p1, int p2)
        {
            lengthInSeconds = p1;
            yearRecorded = p2;
        }
    }

    class TestSong
    {
        static void Main()
        {
            // Initialize:
            // 생성된 객체는 Stack 메모리에 객체가 할당된다.
            Song song1 = new Song(213, 1994);
            Song song2 = new Song(248, 1988);

            // Display results:
            Console.WriteLine("lengthInSeconds = {0}, yearRecorded = {1}", song1.lengthInSeconds, song1.yearRecorded);

            Console.WriteLine("lengthInSeconds = {0}, yearRecorded = {1}", song2.lengthInSeconds, song2.yearRecorded);

        }
    }

    /* Output:
        lengthInSeconds = 213, yearRecorded = 1994
        lengthInSeconds = 248, yearRecorded = 1988
    */
    ```

	- **구조체**는 **Class** 와 같이 여러 특성(생성자, 상수, 필드, 메서드, 속성, 인덱서, 연산자, 이벤트 등)들을 **그룹화** 하는데 사용된다.

		- **구조체**와 **클래스**는 매우 비슷한 **구조**를 가지고 있으며, <u>**사용 방법** 및 **적용 이유**</u>가 유사하다.

## 2. C# 구조체의 특징

- `값 타입`이다.

	- [값 형식 및 참조 형식](https://msdn.microsoft.com/ko-kr/library/4d43ts61(v=vs.90).aspx)

	- [Six important .NET concepts: Stack, heap, value types, reference types, boxing, and unboxing]

		![](http://mohwa.github.io/blog/assets/images/posts/memoryDiagram.jpg?2)

		- http://www.codeproject.com/Articles/76153/Six-important-NET-concepts-Stack-

- 생성된 객체는 **Stack** 메모리에 할당된다.

- **구조체**는 보통 <u>작은 데이터</u>를 다루는데 **적합**하다.

	- 하지만 **이것**을 **클래스**로 <span style="color:#c11f1f">표현할 수 없는 것</span>은 아니다.(그냥 작은 Class를 만들면 그만이다;;)

		- *그럼에도 불구하고 `구조체`를 써야하는 이유는 <u>분명 존재</u>할 것이다.*

- **new** 연산자를 사용하지 않고도 **인스턴스화**할 수 있다.

	- 하지만 <u>**생성자**를 호출하지 않으므로</u>, 선언된 맴버를 따로 **초기화** 해야하는 <span style="color:#c11f1f">불편함</span>이 존재한다.

	```c#
	public struct Song
	{
		public int lengthInSeconds, yearRecorded;

		// 생성자
		public Song(int p1, int p2)
		{
			lengthInSeconds = p1;
			yearRecorded = p2;
		}
	}

	class TestSongNoNew
	{
		static void Main()
		{
			// new 연산자 없이 인스턴스를 생성한다.
			// Stack 메모리에 객체가 할당된다.
			// 생성자를 호출하지 않는다.
			Song song1;

			// 속성 초기화
			song1.lengthInSeconds = 213;
			song1.yearRecorded = 1994;

			// Display results:
			Console.WriteLine("lengthInSeconds = {0}, yearRecorded = {1}", song1.lengthInSeconds, song1.yearRecorded);

		}
	}

	/* Output:
		lengthInSeconds = 213, yearRecorded = 1994
	*/
	```
- **구조체**는 **구조체** 또는 **클래스**에서 <u>상속될 수 없으며</u>, 클래스의 기본 클래스가 될 수 없다.

	- **클래스**와 달리, 상속 구조를 구현할 수 없다.

- **클래스**와 같이 <u>**인터페이스**를 구현할 수 있다.</u>

- 구조체는 **Stack** 영역에 할당되는 **<span style="color:#c11f1f">값 타입</span>**이고, 클래스는 **Heap** 영역에 할당되는 **<span style="color:#c11f1f">참조 타입</span>**이다.

	- **Stack** 영역(<span style="color:#c11f1f">정적 할당</span>)이란?

        ![](http://mohwa.github.io/blog/assets/images/posts/struct_stack.jpg)

    - **Stack** 영역은 **컴파일 시점**에서 크기가 **결정**되는 요소들이 저장되는 **메모리 영역**이다.

        - 함수 내부 **지역 변수** 와 **매개 변수**는 **Stack** 영역에 할당되며, 함수 종료 시 **소멸**된다.

    - **Stack** 영역은 **LIFO**(Last In First out)라는 **자료구조** 가진다.

        - *즉 마지막에 넣은(Push) 데이터가 `가장 먼저` 나가는것을(Pop) 의미한다.*

            - Stack Push 순서:

                - A > B > C > D > E

            - Stack Pop 순서:

                - E > D > C > B > A

        - 그럼 **JS Stack** 은?

            - JS 는 [**동적 언어**](https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4) 이므로 **컴파일 시점**이 아닌 **런타임 시점**에서 메모리가 **할당**(allocation)된다.

                - C, C++, C#(**정적 언어**)

            - JS **원시 타입**(string, number, boolean, undefined, null)은 **고정된 크기**를 가지며, **Stack** 메모리 영역에 할당된다.

            - JS 의 모든 **실행 컨텍스트**는 <span style="color:#c11f1f">ECStack</span>(일종의 [Call Stack](https://ko.wikipedia.org/wiki/%EC%BD%9C_%EC%8A%A4%ED%83%9D)) 내부로 할당된다.

				- 아래와 같은 방법으로 `ECStack Count` 를 셀 수 있다.

					```javascript
					function getStackCount(){

						var i = 0;

						try{
							(function _stack(){

								++i && arguments.callee();
							})();
						}
						catch(e){

							console.log(e.message);

							return i;
						}
					}

					// get call stack count
					console.log('call stack count: ' + getStackCount());

					/* output

					 Maximum call stack size exceeded

					 // 15,745 번 함수 호출 후 Stack overflow 가 발생했다.
					 call stack count: 15745

					 */
					```

	- **Heap** 영역(<span style="color:#c11f1f">동적 할당</span>)이란?

		- **Heap** 영역은 **런타임 시점**에서 크기가 **결정**되는 요소들이 저장되는 **메모리 영역**이다.

			- Object 또는 Array Data Type 등을 가진다.

		- **Heap** 영역은 **런타임 시점**에서 메모리를 <u>**가변적**으로 **동적** <span style="color:#c11f1f">할당</span> 및 <span style="color:#c11f1f">반환</span>(GC를 통해) 시키는 구조</u>를 가진다.

		- **GC**는 **할당**된 **Heap** 메모리 영역의 <span style="color:#c11f1f">반환</span>(de-allocated(수거))을 담당한다.

			- **GC**(Garbage Collection)란?

				- **자동 메모리 관리**의 한 형태이며, 프로세스 수행 중, 더 이상 필요가 없어진 **객체**가 점유하는 <u>메모리에 대해 <span style="color:#c11f1f">반환</span> 작업을 수행</u>한다.

				- 프로그래머가 직접 메모리를 <span style="color:#c11f1f">반환</span>할 수는 없다.(반드시 `GC`를 통해 반환된다)

				- 단 GC에게 메모리 <u><strong>반환</strong> 조건</u>을 만들어 줄 수는 있다.

					```javascript

					var obj = {x: 1, y: 2};

					// GC에게 메모리 반환 조건을 만들어 준다.
					obj = null;

					```

	- JS **Heap** 메모리 영역 테스트 해보기!!

		- V8 **Handle scope** Diagram

			![](http://mohwa.github.io/blog/assets/images/posts/handleV8.jpg)

		- 아래 코드는 **Heap** 메모리 영역에 **객체**를 <span style="color:#c11f1f">할당</span>하는 예제이다.

		```javascript
		// global execution context

		// 전역 실행 컨텍스트에서 함수 객체를 하나 선언한다.

		// 선언된 함수 객체는 Heap 메모리 영역에 할당된다.
		function globalA(){
			this.x = 1;
			this.y = 2;
		}

		function init(){

			// _global 전역 변수에 생성된 인스턴스를 할당한다.
			// 이때 전역 변수(참조 변수)는 Heap 메모리 영역에 할당된 객체를 참조하게된다.

			_global = new globalA();
		}

		init();
		```

		- **전역 실행 컨텍스트**에서 선언된 **globalA** 함수 객체의 **Heap** 메모리 영역.

			![](http://mohwa.github.io/blog/assets/images/posts/heapSnapShot0.jpg)

		- **_global** 전역 변수가 참조하는 **객체**의 **Heap** 메모리 영역.

			![](http://mohwa.github.io/blog/assets/images/posts/heapSnapShot1.jpg)

		- <span style="color:#c11f1f">Chrome Inspector</span>를 통해 할당된 **Heap 메모리 영역**을 살펴볼 수 있다.

			- [understanding chrome heap profile](http://stackoverflow.com/questions/20697298/understanding-chrome-heap-profile)

		- 만약 함수 **지역 변수**에 **객체**를 할당했다면, 그 객체(**Heap** 영역)의 메모리 **<span style="color:#c11f1f">반환</span>** **시점**은 언제일까?

			- *결론: `지역 변수`에 할당된 객체 메모리 <span style="color:#c11f1f">반환</span> 시점은 <u>**함수 종료 시점**</u>이 된다.*

				- 테스트 1: `전역 변수`와 함수 `지역 변수`에 동일한 `객체`를 할당해본 후 `Profile` 을 통해 `Heap` 영역을 관찰해본다.

					```javascript
					// global execution context

					// 전역 실행 컨텍스트에서 함수 객체를 하나 선언한다.

					// 선언된 함수 객체는 Heap 메모리 영역에 할당된다.
					function globalA(){
						this.x = 1;
						this.y = 2;
					}

					function init(){

						// _district 지역 변수에 생성된 인스턴스를 할당한다.
						// 이때 지역 변수(참조 변수)는 Heap 메모리 영역에 할당된 객체를 참조하게된다.

						// 단 지역 변수에 할당된 객체의 "메모리 반환 시점"은, 함수 종료 시점(함수 실행 컨텍스트 종료 시점)이 된다.

						var _district = new globalA();
					}

					init();
					```

				- `지역 변수`에 할당된 `객체`는 `Heap` 메모리 영역에서 <span style="color:#c11f1f">반환</span>되어 보이지 않는다.

				![](http://mohwa.github.io/blog/assets/images/posts/heapSnapShot2.jpg)


## 3. JS 로 Struct 구현해보기

- 위에서 나열한 **구조체**의 **특징** 중 **클래스**와 **본질**적으로 다른 부분인, <u>**데이터 생성**</u>에 대한 부분을 JS 를 통해 구현해 보았다.

	- 구조체: **값** 타입(**Stack** 메모리 영역에 할당되며, 값이 <span style="color:#c11f1f">복사</span>되어 할당된다)

	- 클래스: **참조** 타입(**Heap** 메모리 영역에 할당되며, <span style="color:#c11f1f">참조</span> 값이 할당된다)

- `구조체`의 특징 중 극히 일부를 구현한것이며, 타 언어에서 구현된 구조체라 할 수는 없다.

```javascript

function Struct(val){

	if (
		typeof val === 'string' ||
		typeof val === 'number' ||
		typeof val === 'boolean' ||
		val === null ||
		val === undefined
	){
		console.error('primitive type value: ' + val);
		return val;
	}

	var _copy = function(val){

		var ret = null;
		var constructor = val.constructor;

		if (constructor === Function){

			// 함수(상황에 따라 생성자 함수가 될 수도 있다) 객체 내부 this 값을 apply 함수를 통해 초기화 시키고, 그 결과를 반환하는 함수를 생성한다.
			ret = function $F(){

				// this === global or $F of instance object
				return val.apply(this, arguments);
			};

			// 전달된 함수 객체의 prototype(객체 원형)을 할당한다.
			ret.prototype = val.prototype;
		}
		else if (constructor === String || constructor === Number || constructor === Boolean) {
			ret = new constructor(val.valueOf());
		}
		else if (constructor === Date){
			ret = new constructor(val.getTime());
		}
		else if (constructor === Object || constructor === Array){

			ret = new constructor();

			for (var n in val){

				if (val.hasOwnProperty(n)){
					ret[n] = val[n];
				}
			}
		}

		return ret;

	}(val) || val;


	return _copy;
}

	// 5 가지의 원시 타입 값 할당
Struct('test'); // test
Struct(1); // 1
Struct(true); // true
Struct(undefined); // undefined
Struct(null); // null

/*
	모든 경우(모든 타입)에 전달된 원본 값(객체)이 아닌 복사 된 값을 반환한다.
*/

/*
 함수 객체 선언
 */
var $$ = function() {

	var $$ = function(){
		return new _$$();
	};

	var _$$ = function(){
		this.x = 1;
	}
	// 나를통해 생성될 객체 원형에 새로운 객체를 할당한다.
	_$$.prototype = {
		getX: function() {
			return this.x;
		}
	};

	$$.staticMethod = function(){};

	return $$;
}();

/*
 다른 유형의 함수 객체 선언
 */
function Plus(x, y){

	x = x || 0;
	y = y || 0;

	return parseFloat(x + y);
}

var originalFn = $$;
var structFn = Struct($$);

console.dir(originalFn); // function
console.dir(structFn); // function

console.dir(originalFn()); // object
console.dir(structFn()); // object

var originalFn1 = Plus;
var structFn1 = Struct(Plus);

console.dir(originalFn1); // function
console.dir(structFn1); // function

console.dir(originalFn1(1, 3)); // 4
console.dir(structFn1(2, 3)); // 5

var structStr = Struct(new String('test'));
var structNum = Struct(new Number(1));

console.dir(structStr); // string object
console.dir(structNum); // number object

var structObject = Struct({x: 1, y: 2});
var structArray = Struct([1, 2, 3]);

console.dir(structObject); // object
console.dir(structArray); // array

var structBoolean = Struct(new Boolean(false));
console.dir(structBoolean); // boolean object


var structDate = Struct(new Date());
console.dir(structDate); // date object
```

## 4. 정리하며

- 그럼 언제 사용하면될까?

	- 개인적인 생각으로는 이럴때가 아닌가 싶다?

		- 클래스로 만들기에는 너무 간단한 구조인 경우.

			- 사실 이 경우, 반드시 **구조** 만의 문제는 아닐 수 있다.

				- 만약 모든 경우에 **클래스**를 사용한다면, 위에서 언급한 봐와같이 **객체**는 **Heap** 영역에 <span style="color:#c11f1f">할당</span>될 것이며, 결국 **GC** 는 그 메모리 **반환**을 위해 쓸때 없는 리소스를 **낭비**하게 될 것이다.

		- **상속 구조**를 만들 필요가 없는 경우.

	- 하지만, 이 두 가지 특징 모두 **<span style="color:#c11f1f">각 언어</span>**(C/C++/C# 등 구조체를 가진 모든 언어)가 가지는 **<span style="color:#c11f1f">특성</span>**에 따라 충분히 변할 수 있는 부분이므로 모든 언어에 **적용**된다고 말할 수는 없다.

		- *간단히 말해, 특정 `언어`가 `구조체`를 어떤 방식으로 `구현`하느냐에 따라, `사용 범위`도 크게 달라질 수 있다는 말과 같다.*


## 5. 참고 URL

- [C# 구조체 설명](https://msdn.microsoft.com/ko-kr/library/0taef578.aspx)

- [C# 클래스 설명](https://msdn.microsoft.com/ko-kr/library/0b0thckt.aspx)

- [primitive value vs reference value](http://stackoverflow.com/questions/13266616/primitive-value-vs-reference-value)

- [원시 타입과 참조 타입](http://codingnuri.com/javascript-tutorial/javascript-primitive-types-and-reference-types.html)

- [값 형식 및 참조 형식(Visual C# Express)](https://msdn.microsoft.com/ko-kr/library/4d43ts61(v=vs.90).aspx)

- [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)

- [javascript-scope-and-execution-context](http://stackoverflow.com/questions/11148353/javascript-scope-and-execution-context)=

- [C언어의 메모리 구조](http://dsnight.tistory.com/50)

- [STACK, HEAP에 관한 소고](http://egloos.zum.com/recipes/v/5057426)

- [도대체 [구조체]가 [클래스]보다 좋은점이 뭔가요?](https://kldp.org/node/44714)

	- *개인적으로 이런 글을 좋아한다.(다양한 생각들을 들을 수 있으며, 그로인해 많은 `영감`을 얻기도 한다)*

- [메모리 구조](https://opentutorials.org/course/1720/9735)

- [프로그램과 메모리 , 스택과 힙](http://adibong.tistory.com/169)






