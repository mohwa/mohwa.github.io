---
layout: post
title: "객체 지향 언어의 두 가지 줄기"
description: "객체 지향 언어의 두 가지 줄기"
date:   2015-10-16
categories: javascript
tags: [JavaScript]
---


## 1. 정의

- **객체 지향 언어**는 크게 두 가지 줄기로 나눌수 있다.

	- **클래스 기반 언어**(C++, Java, C#, Ruby, Python 등)

	- [프로토타입 기반 언어](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EA%B8%B0%EB%B0%98_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)

	  - 아래는 그나마 많이 알려진 **프로토타입 기반언어**를 나열해보았다.

		- [JavaScript](http://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8), [ActionScript](http://ko.wikipedia.org/wiki/%EC%95%A1%EC%85%98%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8), [JScript](https://ko.wikipedia.org/wiki/J%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)

	- [클래스 기반 & 프로토타입 기반 객체 지향 언어](http://skyul.tistory.com/84)

- **클래스 기반 언어**와 **프로토타입 기반언어**의 차이
  
  - 클래스 기반 언어
    
      - **클래스 기반 언어**에서는, <span style="color:#c11f1f">객체의 형식이 정의된</span> [클래스](https://msdn.microsoft.com/ko-kr/library/x9afc042.aspx)라는 **개념**을 가진다.
        
        ```javascript
    
        // 클래스를 선언한다.
        public class Person
        {
          // Field
          public string name;
    
          // Constructor that takes no arguments.
          public Person()
          {
            name = "unknown";
          }
    
          // Constructor that takes one argument.
          public Person(string nm)
          {
            name = nm;
          }
    
          // Method
          public void SetName(string newName)
          {
            name = newName;
          }
        }
        
        // person1 변수는 Person 클래스를 통해 생성된 객체를 참조하게된다.
        Person person1 = new Person();
        ```
    
      - **클래스 기반 언어**만의 [상속](https://msdn.microsoft.com/ko-kr/library/ms173149.aspx) **개념**을 가진다.
    
        ```javascript
        // Employee: 상속 클래스
        // Manager: 파생 클래스
        public class Manager : Employee
        {
          // Employee fields, properties, methods and events are inherited
          // New Manager fields, properties, methods and events go here...
        }		
        ```
    
      - [번외] 그럼 **클래스 기반 언어**의 [클래스](https://docs.oracle.com/javase/7/docs/api/java/lang/Class.html)는 어떻게 생성되었을까?
    
          - [아래 글은 "skyul" 님의 글을 발췌한 내용입니다](https://kldp.org/node/63651)
              
            ```javascript
        
            프로토타입 기반 OO는 객체를 직접 이용하는데 비해, 클래스 기반의 OO는 클래스라는 틀을 이용해서 객체를 생성하죠.
        
            자연스럽게 나오는 질문은 "그럼 클래스는 대체 어디서 나온 것인가?"라는 거죠.
        
            대표적 클래스 기반 OO인 Java는 클래스도 객체로 봅니다. 그런데 클래스가 객체면 클래스를 찍어낸 클래스가 있어야 합니다. 클래스를 찍어낸 클래스도 객체이므로, 클래스를 찍어낸 클래스를 만드는 클래스도 있어야 합니다. 
            
            이렇게 무한히 반복 되기 때문에 "inifnite regress problem of classes"라고 불리는 것이죠.
        
            Java는 이 문제를 java.lang.Class가 모든 클래스의 틀이라고 이야기하면서, 은근 슬쩍 넘어갔지만 여기에 숨은 논리적인 문제를 확실히 못풀고 "태초에 Class가 있었다"라는 해법이 나와버리는거죠.
        
            다른 접근 방법을 취한 언어가 있는지 모르겠지만, 대부분의 클래스 기반 언어는 클래스는 second-order citizen으로 특별히 취급해서 찍어낼 수 있는 틀은 원래 있었다라고 얘기하게 되는거죠.
            
            그 대상이 클래스라는 거만 제외하면 접근 방법은 프로토타입 방식과 크게 다르지 않은 거고요.
            ```
            
  - 프로토타입 기반 언어
  
      - **프로토타입 기반 언어**에서는 [클래스](https://msdn.microsoft.com/ko-kr/library/x9afc042.aspx)라는 **개념**이 존재하지 않으며, 여러 종류의 [Built-in 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)들이 시스템상에 존재하게된다. 또한 **클래스 기반언어**의 [상속](https://msdn.microsoft.com/ko-kr/library/ms173149.aspx) 개념과 달리, <span style="color:#c11f1f">객체 원형</span>의 <span style="color:#c11f1f">위임</span> 과정을 통해 **상속** 과정이 구현된다.
    
          - **프로토타입 기반 언어**는 [클래스](https://msdn.microsoft.com/ko-kr/library/x9afc042.aspx)가 존재하지 않는다.
    
            - 함수 객체는 클래스가 아닌 <strong>First-Class Objects</strong>이다.<p>
      
            - 선언된 함수 객체는, **프로토타입 기반 언어**의 특징인, **위임** 과정을 통해 만들어진 객체의 <span style="color:#c11f1f">원형</span>을 참조하고있다.
      
            - 즉, JS <strong>함수</strong>는 [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) 생성자 함수 객체의 <span style="color:#c11f1f">원형</span>(Function.prototype)을 <strong>참조</strong>하는 또 다른 <strong>함수 객체</strong>일뿐이다.
  
                ``` javascript
          
                // A 함수 객체를 선언한다.
                function A(){
                }
          
                // 선언된 A 함수 객체의 데이터 타입은 function 타입을 반환한다.
                console.log(typeof A); // function
          
                // 선언된 A 함수 객체의 생성자 함수는 Function 생성자 함수 객체를 가리키고있다.
                console.dir(A.constructor); // Function
          
                // 선언된 A 함수 객체의 생성자 함수 객체
                console.dir(Function); // Function
          
                // 선언된 A 함수 객체는 위임 과정을 통해, 자신을 만든 생성자 함수(Function) 객체의 원형(Function.prototype)을 참조하고 있다.
                console.dir(A.__proto__);
          
                // 선언된 A 함수 객체로 위임된 원형과 Function 생성자 함수 객체의 원형 비교(동일하다)
                console.dir(A.__proto__ === Function.prototype); // true
                ```
                ![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_2.png)		

        - JS **Built-in 객체** 중 하나인 **Array** 객체
    
            ```javascript
            var fruits = ["Apple", "Banana"];
            
            // 배열의 길이를 반환한다.
            console.log(fruits.length); // 2
            ```
          
        - 객체 원형 및 **위임** 과정
    
          ```javascript
          // Object 생성자 함수 객체로 새로운 객체를 생성한다.
          var obj = new Object();
    
          // 생성된 새로운 객체
          console.dir(obj);
    
          // 새로운 객체로 위임된 Object 생성자 함수 객체의 원형
          console.log(obj.__proto__);
    
          // Object 생성자 함수 객체의 원형
          console.log(Object.prototype);
    
          // 새로운 객체로 위임된 원형과 Object 생성자 함수 객체의 원형 비교(동일하다)
          console.log(obj.__proto__ === Object.prototype); // true
    
          // 위임 과정을 통해 toString 메서드를 사용할 수 있다.
          console.dir(obj.toString);
          ```	
      
          ![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_1.png)		

- **클래스 기반 언어**는 보통 [정적 언어](http://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95_%EC%B2%B4%EA%B3%84#.EC.A0.95.EC.A0.81_.EC.A0.95.ED.98.95)를 말하며, JS 와 같은 [동적 언어](http://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95_%EC%B2%B4%EA%B3%84#.EB.8F.99.EC.A0.81_.EC.A0.95.ED.98.95)는 <span style="color:#c11f1f">컴파일 시점</span>이 아닌 <span style="color:#c11f1f">런타임 시점</span>에서 <span style="color:#6298c1">정적 언어</span>가 다루는 특정 일([자료형 검사](http://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95_%EC%B2%B4%EA%B3%84#.EC.9E.90.EB.A3.8C.ED.98.95_.EA.B2.80.EC.82.AC), [함수 오버로드](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98_%EC%98%A4%EB%B2%84%EB%A1%9C%EB%93%9C), 동적 디스패치 등)들을 수행하게된다.

    - 정적/[동적](http://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4) 언어란?
    
      - 정적언어<p>
    
          - **컴파일 시점**에서 자료형 검사가 이루어진다.<p>
      
          - **컴파일 시점**의 자료형 검사로 인해 **런타임 시점**에서는 자료형에 대한 많은 오류를 줄일 수 있다.(단 컴파일 시점에서 결정될 수 있는 자료형 정보만이 평가(검사)된다)<p>
      
          - **컴파일 시점**에서의 자료형 검사를 반복할 필요가 없기때문에, 전체 **프로그램 실행 시간**이 줄어든다.<p>
    
      - 동적언어
    
          - **런타임 시점**에서 자료형 검사가 이루어진다.<p>
      
          - **런타임 시점**의 자료형 검사로 인해 자료형에 대한 **런타임 오류**가 발생할 수 있다.(빈도수가 생각보다 많을수있다)<p>
      
          - 모든 **런타임 객체**가 자료형에 대한 정보를 가지고 있으며, 이를 통해 [함수 오버로드](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98_%EC%98%A4%EB%B2%84%EB%A1%9C%EB%93%9C), <span style="color:#6298c1">동적 디스패치</span> 등을 수행할 수 있다.([동적 언어](https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%EC%96%B8%EC%96%B4)가 가지는 유연성)<p>
      
          - 변수는 모든 자료형을 가질 수 있다.<p>
      
            - **JS 동적 타이핑**<p>
      
              - *자바스크립트는 느슨한 타입 (loosely typed) 언어, 혹은 동적 (dynamic) 언어이다. 그 말은, 변수의 타입을 미리 선언할 필요가 없다는 뜻이다. 타입은 프로그램이 처리되는 과정에서 자동으로 파악될 것이다. 또한 그 말은 같은 변수에 여러 타입의 값을 넣을 수 있다는 뜻이다.*<p>
            
          - [자바스크립트의 자료형](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)<p>
      
          - [Go 언어란? 정적 타입과 동적 타입에 대한 이야기](http://pyrasis.com/book/GoForTheReallyImpatient/Unit01)
      
          - **런타임 시점**에서 자료형 검사가 이루어진다.
                    
              ``` javascript
      
              // global execution context
              
              // 원시 타입인 string 타입을 할당한다.
              var x = 'str';
      
              // 원시 타입인 number 타입을 할당한다.
              x = 1;
      
              // object 타입을 할당한다.
              x = {};
      
              console.dir(x); // Object
              console.dir(typeof x); // object
        
              ```
      
          - **런타임 시점**의 자료형 검사로 인해 자료형에 대한 **런타임 오류**가 발생할 수 있다.
          
            ```javascript
      
              var num = '1';
      
              try {
                num.toFixed();
              }
              catch (e){
                // runtime error
                console.log(e.message); // num.toFixed is not a function
              }
      
            ```
  
          - 모든 **런타임 객체**가 자료형에 대한 정보를 가지고 있으며, 이를 통해 [함수 오버로드](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98_%EC%98%A4%EB%B2%84%EB%A1%9C%EB%93%9C), <span style="color:#6298c1">동적 디스패치</span> 등을 수행할 수 있다.
      
              - JS 는 기본적으로 <strong>함수 오버로드</strong>를 지원하지 않으며, 아래와 같은 방법으로 구현 가능하다.<p>
                
                ```javascript
          
                // 함수 오버로드 구현
                function A(){
          
                  var args = arguments;
          
                  if (args.length === 1){
                    console.log(1); // 1
                  }
                  else if (args.length === 2){
                    console.log(2); // 2
                  }
                };
          
                A(1); // 1
                A(1, 2); // 2
            
                ```

##  2. 프로토타입 언어에서 객체를 생성하는 두 가지 방법

- 무에서 **객체**를 생성하는 방법(<span style="color:#c11f1f">원형</span> 객체가 없는 상태에서 객체를 생성하는 방법)

	```javascript
		// 원형 객체가 없는 상태에서 객체를 생성하는 방법(일부 브라우저를 통해 아래와 같은 무형 객체를 구현할 수 있다)
		var instance = {};
		instance.__proto__ = null;

		console.dir(instance); // Object
		console.log(typeof instance); // object
	```
	![](https://www.dropbox.com/s/ucpd5x23mdd1581/44.jpg?dl=1)

- 유에서 객체를 생성하는 방법(<span style="color:#c11f1f">원형</span> 객체가 존재하는 상태에서 객체를 생성하는 방법)

	```javascript
		// 원형 객체가 존재하는 상태에서 객체를 생성하는 방법(일반적인 위임 과정을 거친 객체)
		var instance = {};

		console.dir(instance); // Object
		console.log(typeof instance); // object
	```
	![](https://www.dropbox.com/s/8eeliasbb29qatz/45.jpg?dl=1)

- 보통 **프로토타입 기반 언어**에는 **Object 객체**(Master Object)가 존재하며, 이 객체의 <span style="color:#c11f1f">원형</span>에는 모든 **객체**가 공통적으로 필요한 <span style="color:#c11f1f">특징</span>(속성, 메서드)들이 **정의**되어있다.

	```javascript
	// A 함수 객체를 선언한다.
	function A(){

	}

	console.dir(A.constructor.__proto__.__proto__); // Object.prototype

	var obj = new Object();
  // 나를 만든 생성자 함수 객체의 원형
	console.dir(obj.__proto__); // Object.prototype
	console.dir(Object.prototype); // Object.prototype
	```

	![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_3.png)		


##  3. 위임 과정에 대해

- JS는 **프로토타입 기반 언어**의 특징인 **위임** 과정을 따른다.

- 모든 **위임** 과정은 [런타임](http://ko.wikipedia.org/wiki/%EB%9F%B0%ED%83%80%EC%9E%84) 시점에서 이루어진다.

- **위임**이란 객체들간의 <span style="color:#c11f1f">원형 복제 과정</span>을 말한다.

- **위임**된 객체 <span style="color:#c11f1f">원형</span>은 값(value)이 아닌 <span style="color:#c11f1f">참조 값</span>(reference of value)을 갖는다.

- **위임**된 객체 <span style="color:#c11f1f">원형</span>은 해당 객체의 특징(속성, 메서드)들을 **공유**하기위해 사용된다.

	- A 함수 객체에 대한 **위임** 결과.

		```javascript
		// A 함수 객체를 선언한다.
		function A(){

		}

		console.dir(A);

		```
  - **A**: 선언된 A 함수 객체

  - **A.prototype**: 나를 통해 생성될 객체의 <span style="color:#c11f1f">원형</span>

        ```javascript
        console.log(A.prototype === new A().__proto__); // true
        ```

  - **A.\_\_proto\_\_**: 나를 만든 생성자 함수 객체의 <span style="color:#c11f1f">원형</span>

        ```javascript
        console.log(A.__proto__ === Function.prototype); // true
        ```

  - **A.constructor**: 나를 만든 생성자 함수 객체

        ```javascript
        console.log(A.constructor === Function); // true
        ```
  ![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_4.png)		

	- objA 객체에 대한 **위임** 결과.

		```javascript
		// A 함수 객체를 선언한다.
		function A(){

		}

		// A 생성자 함수 객체를 통해 새로운 객체를 생성한다.
		var objA = new A();

		console.dir(objA);
		```

  - **objA**: 생성된 objA 객체

  - **objA.\_\_proto\_\_**: 나를 만든 생성자 함수 객체의 원형
  
      ```javascript
      console.log(objA.__proto__ === A.prototype); // true
      ```

  - **A.constructor**: 나를 만든 생성자 함수 객체
  
      ```javascript
      console.log(objA.constructor === A); // true
      ```

    ![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_5.png)

- **위임**받은 자식 객체는 부모 객체의 <span style="color:#c11f1f">원형</span>을 참조하고 있기 때문에, 자식 객체로 부터 부모 객체의 <span style="color:#c11f1f">원형</span>이 변조될 수 있다.(이로인해 아주 위험한 상황이 연출될 수 있다)

	- 부모 객체: A 생성자 함수 객체
	- 자식 객체: objA 변수가 참조하는 객체(new A)

		```javascript

		// A 함수 객체를 선언한다.
		function A(){

		}

		var objA = new A;

		// 자식 객체를 통해 부모 객체의 원형(A.prototype)을 변조한다.
		// objA.__proto__ === A.prototype
		objA.__proto__.getConstructor = function(){
			return this.constructor;
		}

		console.dir(A.prototype.getConstructor()); // A 생성자 함수 객체
		```
	![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_6.png)		

- **위임** 받은 자식 객체는 원하는 **특징**(속성, 메서드)에 도달하기위해, 각 **객체**들이 가진 <span style="color:#c11f1f">원형</span>을 연속적으로 따라가 찾아내게된다.

	```javascript
	// parent 객체는 id 속성 값을 가지고 있다.
	var parent = {
		id: 'parentId'
	};

	// child1 객체는 name 속성 값을 가지고 있다.
	var child1 = {
		name: 'child1Name'
	};

	// child2 객체는 각 속성 값을 반환받는 get 접근자 메서드를 가지고 있다.
	var child2 = {
		getId: function(){
			return this.id;
		},
		getName: function(){
			return this.name;
		}
	};

	// parent 객체의 모든 특징(속성, 메서드)들을 child1 객체 원형으로 위임한다.
	child1.__proto__ = parent;
	// child1 객체의 모든 특징(속성, 메서드)들을 child2 객체 원형으로 위임한다.
	child2.__proto__ = child1;

	console.dir(child2);
	console.log(child2.getId()); // parentId
	console.log(child2.getName()); // child1Name
	```
	![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_7.png)		

	```javascript
	// parent 객체는 id 속성 값을 가지고 있다.
	var parent = {
		id: 'parentId'
	};

	// child1 객체는 name 속성 값을 가지고 있다.
	var child1 = {
		name: 'child1Name'
	};

	// child2 객체는 각 속성 값(id, name)과 그것들을 반환하는 get 접근자 메서드를 가지고 있다.
	var child2 = {
		id: 'child2Id',
		name: 'child2Name',
		getId: function(){
			return this.id;
		},
		getName: function(){
			return this.name;
		}
	};

	// parent 객체의 모든 특징(속성, 메서드)들을 child1 객체 원형으로 위임한다.
	child1.__proto__ = parent;
	// child1 객체의 모든 특징(속성, 메서드)들을 child2 객체 원형으로 위임한다.
	child2.__proto__ = child1;

	console.dir(child2);
	console.log(child2.getId()); // child2Id
	console.log(child2.getName()); // child2Name
	```

	![](http://mohwa.github.io/blog/assets/images/posts/20151012/prototype_8.png)		

- 또한, **프로토타입** 검색 범위는 동적으로 변경될 수 있다.

	```javascript
	var instance = {};

	function extend(){
		instance.__proto__ = {
			x: {},
			y: {},
			z: {}
		};
	}

	// 런타임 시점에서 객체가 확장된다.
	extend();
	console.dir(instance);
	```
	![](https://www.dropbox.com/s/1f9j861jn09w3sp/11.jpg?dl=1)
	
##  4. 연쇄 과정에 대해

- **순수 프로토타입**은 **연쇄적 프로토타입**이라고도 한다.

- **연쇄**란 객체들간의 <span style="color:#c11f1f">원형 복제 과정</span>을 말한다.

- **연쇄**된 객체 원형은 <span style="color:#c11f1f">참조 값</span>(reference of value)이 아닌 **원본**으로부터 <span style="color:#c11f1f">복제된</span> 객체 값(value)을 갖는다.

- **연쇄**된 자식 객체는 원본 객체로부터 <span style="color:#c11f1f">복제된 원형</span>을 참조하기 때문에, 자식 객체를 통해 원본 객체의 특징들이 **변조**될 수 없다.

- **연쇄**된 자식 객체는 원하는 **특징**(속성, 메서드)에 도달하기위해, 각 **객체**들이 가진 <span style="color:#c11f1f">원형</span>을 연속적으로 따라가 찾아내게된다.

	```javascript
	// 원본 객체
	var instance1 = {
		id: 'yanione'
	};

	// 자식 객체
	var instance2 = {
		name: 'mohwa'
	};

	// 클론 함수
	function clone(obj){

		if (!obj || obj.constructor !== Object) return false;

		var clone = {};

		for (var n in obj){
			clone[n] = obj[n];
		};

		return clone;
	};

	// 원본 객체를 복제한다.
	var cloneInstance = clone(instance1);

	// 복제된 원본 객체를 자식 객체의 원형으로 연쇄한다.
	instance2.__proto__ = cloneInstance;

	// 자식 객체가 연쇄받은 원본 객체의 속성 값을 변경한다.
	instance2.__proto__.id = 'mohwa';

	// 이전 위임 과정과 달리 자식 객체로 인해 원본 객체의 원형이 변조되지 않는다.
	console.log(instance1.id); // yanione
	```	

- 연쇄 방식의 프로토타입 검색 범위는 정적(연쇄 시점에 의해)으로 고정된다.

	```javascript
	// 원본 객체
	var instance1 = {
		id: 'yanione'
	};

	// 자식 객체
	var instance2 = {
		name: 'mohwa'
	};

	// 클론 함수
	function clone(obj){

		if (!obj || obj.constructor !== Object) return false;

		var clone = {};

		for (var n in obj){
			clone[n] = obj[n];
		};

		return clone;
	};

	// 원본 객체를 복제한다.
	var cloneInstance = clone(instance1);

	// 복제된 원본 객체를 자식 객체의 원형으로 연쇄한다.
	instance2.__proto__ = cloneInstance;

	// 원본 객체를 동적으로 확장시킨다.
	instance1.getId = function(){
		return this.id;
	}

	// 자식 객체는 연쇄 시점의 복제된 원본 객체의 원형을 참조하고 있기때문에, 동적으로 확장된 원본 객체의 특성을 갖지 못한다.
	console.log(instance2.getId); // undefined
	```



















