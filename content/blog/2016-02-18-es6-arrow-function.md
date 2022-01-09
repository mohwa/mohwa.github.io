---
layout: post
title: "ES6 Arrow Function & This Test"
description: "ES6 Arrow Function & This Test"
date: 2016-02-18
categories: [javascript]
tags: [JavaScript, es6]
---

## 1. 글에 대해

- 이 글은 <span style="color:#c11f1f">ES5</span> 및 <span style="color:#c11f1f">ES6</span> **Arrow Function** 안에서 <span style="color:#c11f1f">this</span> 값이 어떤식으로 평가되는지에 대한 내용을 다루고있다.

- 또한 모든 결과는 **Chrome 브라우저**를 통해 테스트된 결과입니다.

## 2. <span style="color:#c11f1f">ES5</span> & <span style="color:#c11f1f">this</span>
    
- ### <span style="color:#c11f1f">this</span> 값 초기화 테스트

  ```javascript
  // A 함수 객체를 선언한다.
  function A() {
  
  
      function B() {
          // this 는 undefined 로 초기화되며, undefined 는 this 로 평가될 수 없으므로, 암묵적으로 global Object 로 변환된다.
          console.log(this);  // global Object
      }
  
      // AO 에 포함된 내부 함수를 호출한다.
      B(); // AO.B();
      
      // 초기화된 this 값을 반환한다.
      return this;
  }
  
  // this 는 undefined 로 초기화되며, undefined 는 this 로 평가될 수 없으므로, 암묵적으로 global Object 로 변환된다.
  console.log(A()); // global Object
  
  // this 는 생성된 인스턴스로 초기화된다.
  console.log(new A()); // A Object
  
  // this 는 null 로 초기화되며, null 은 this 로 평가될 수 없으므로, 암묵적으로 global Object 로 변환된다.
  console.log(A.call(null)); // global Object
  
  // this 는 전달된 {x: 1} 객체로 초기화된다.
  console.log(A.call({x: 1})); // Object {x: 1}
  
  // this 는 전달된 {x: 2} 객체로 초기화된다.
  console.log(A.apply({x: 2})); // Object {x: 2}
  
  // this 는 전달된 {x: 2} 객체로 초기화된다.
  console.log(A.bind({x: 3})()); // Object {x: 3}
  ```
      
- 바인딩된 **익명 함수** 내부에서의 <span style="color:#c11f1f">this</span> 값

  ```javascript
  // 버튼 객체를 생성한다.
  var btnElem = document.querySelector('#btn1');
  
  // 생성된 버튼 객체에 click 이벤트를 바인딩한다.
  btnElem.addEventListener('click', function(){
  
      // 이 경우 this 값은 target element 인 btnElem 객체를 가리킨다.
      console.log(this); // btnElem object        
  });
  ```
         
- <span style="color:#c11f1f">bind</span> 함수를 통해 (바인딩된)함수 내부 <span style="color:#c11f1f">this</span> 값을 **전역** 스코프의 <span style="color:#c11f1f">this</span> 값으로 <span style="color:#c11f1f">초기화</span> 시킬 수 있다.

  ```javascript
  // 버튼 객체를 생성한다.
  var btnElem = document.querySelector('#btn1');
  
  // 생성된 버튼 객체에 click 이벤트를 바인딩한다.
  btnElem.addEventListener('click', function(){
  
      // 이 경우 this 값은 bind 함수를 통해 초기화된 this 값을 가리킨다.
      console.log(this); // global object
  }.bind(this));
  ```      
                  
- ### <span style="color:#c11f1f">this</span> 값 초기화 테스트 in <span style="color:#c11f1f">Strict Mode</span>

  - <span style="color:#c11f1f">Strict Mode</span> 에서는 <span style="color:#c11f1f">this</span> 값이 **null**, 또는 **undefined** 인 경우, 암묵적으로 <span style="color:#c11f1f">global Object</span> 로 변환되지 않는다.
      
  ```javascript
  // A 함수 객체를 선언한다.
  function A() {

      // Strict Mode 선언
      'use strict';

      function B() {
          // this 는 undefined 로 초기화된다.
          console.log(this);  // undefined
      }

      // AO 에 포함된 내부 함수를 호출한다.
      B(); // AO.B();

      // 초기화된 this 값을 반환한다.
      return this;
  }

  // this 는 undefined 로 초기화된다.
  console.log(A()); // undefined

  // this 는 global object 로 초기화된다.
  console.log(this.A());

  // this 는 생성된 인스턴스로 초기화된다.
  console.log(new A()); // A Object

  // this 는 null 로 초기화된다.
  console.log(A.call(null)); // global Object

  // this 는 전달된 {x: 1} 객체로 초기화된다.
  console.log(A.call({x: 1})); // Object {x: 1}

  // this 는 전달된 {x: 2} 객체로 초기화된다.
  console.log(A.apply({x: 2})); // Object {x: 2}

  // this 는 전달된 {x: 2} 객체로 초기화된다.
  console.log(A.bind({x: 3})()); // Object {x: 3}
  ```
          
- ### <span style="color:#c11f1f">this</span> 값 초기화 테스트 in <span style="color:#c11f1f">Object</span>

  - **객체 메서드**에서의 <span style="color:#c11f1f">this</span> 는 해당 메서드를 내부 프로퍼티로 소유한 <span style="color:#c11f1f">객체</span>를 가리킨다.  
      
  ```javascript
  var A = {
      x: function(){

          var B = function(){
              // this 는 undefined 로 초기화되며, undefined 는 this 로 평가될 수 없으므로, 암묵적으로 global Object 로 변환된다.
              console.log(this); // global Object
          }

          // AO 에 포함된 내부 함수를 호출한다.
          B(); // AO.B();

          // 초기화된 this 값을 반환한다.
          return this;
      }
  };

  // 이 경우 this 는 해당 함수를 내부 프로퍼티로 소유한 객체를 가리킨다.
  console.log(A.x()); // A Object
  ```
                
## 3. <span style="color:#c11f1f">ES6</span> Arrow Function & <span style="color:#c11f1f">this</span>
                                      
  - Arrow Function 은 자신만의 <span style="color:#c11f1f">this</span>, arguments, super, new.target 이 <span style="color:#c11f1f">할당</span>되지 않는다.
  
  - Arrow Function 의 <span style="color:#c11f1f">this</span> 값은 <u>함수가 위치한 지점을 둘러싼, 전역/함수 스코프</u>의 <span style="color:#c11f1f">this</span> 값을 가리키며, <span style="color:#c11f1f">바인딩</span>된 후 변하지 않는다.
      
  ```javascript
  
  // global execution context
  
  // Arrow Function 을 할당한다.
  var A = () => {
  
      // A function execution context
  
      var B = () => {
      
          // B function execution context
          
          // 이 경우 this 는 (B)함수를 둘러싼, (A)함수 스코프의 this(global Object) 값으로 초기화된다.
          console.log(this);
      }
  
      B();
  
      // 초기화된 this 값을 반환한다.
      return this;
  };
  
  // this 는 global object 로 초기화된 후 변하지 않는다. 
  console.log(A()); // global Object
  
  // this 는 global object 로 초기화된 후 변하지 않는다.
  console.log(this.A()); // global Object
  
  // new 연산자를 통해 새로운 인스턴스 생성 시 에러가 발생한다.
  try {
      console.log(new A());
  }
  catch(e){
      // Uncaught TypeError: () => this is not a constructor
      console.log(e.message);
  }
  
  // this 는 global object 로 초기화된 후 변하지 않는다.
  console.log(A.call(null)); // global Object
  
  // this 는 global object 로 초기화된 후 변하지 않는다.
  console.log(A.call({x: 1})); // global Object
  
  // this 는 global object 로 초기화된 후 변하지 않는다.
  console.log(A.apply({x: 2})); // global Object
  
  // this 는 global object 로 초기화된 후 변하지 않는다.
  console.log(A.bind({x: 3})()); // global Object
  
  ```
  
  - 바인딩된 **익명** (Arrow)**함수** 내부에서의 <span style="color:#c11f1f">this</span> 값

  ```javascript
  // 버튼 객체를 생성한다.
  var btnElem = document.querySelector('#btn1');
  
  // 생성된 버튼 객체에 click 이벤트를 바인딩한다.
  btnElem.addEventListener('click', () => {
  
      // 이 경우 arrow function 의 this 값은 해당 함수를 둘러싼 전역 스코프의 this 값으로 초기화된다.
      console.log(this); // global Object
      
      // 버튼 객체를 통해 명시적으로 접근한다.
      console.log(btnElem);
  });
  ```
            
  - 함수 객체 내부에서의 <span style="color:#c11f1f">Arrow Function</span> 의 <span style="color:#c11f1f">this</span> 값

  ```javascript
  function A(){
  
      // arrow function
      var B = () => {
          // 이 경우 this 는 (B)함수를 둘러싼, (A)함수 스코프의 this(global Object) 값으로 초기화된다.
          console.log(this); // global Object
      };
  
      B();
  
      // 초기화된 this 값을 반환한다.
      return this;
  
  }
  
  // this 는 global Object 로 초기화된다.
  A();
  ```
      
  - 생성자 함수 객체 내부에서의 <span style="color:#c11f1f">Arrow Function</span> 의 <span style="color:#c11f1f">this</span> 값(<span style="color:#c11f1f">Arrow Function</span> 의 <span style="color:#c11f1f">this</span> 값을 **동적 바인딩**하기위한 방법)

  ```javascript
  function A(){
  
      // arrow function
      var B = () => {
          // 이 경우 this 는 (B)함수를 둘러싼, (A)함수 스코프의 this(A Object) 값으로 초기화된다.
          console.log(this); // A Object
      };
  
      B();
  
      // 초기화된 this 값을 반환한다.
      return this;
  
  }
  
  // this 는 생성된 인스턴스로 초기화된다.
  console.log(new A()); // A Object
  ```
            
  - **객체 메서드**에서의 <span style="color:#c11f1f">this</span> 는 해당 메서드를 둘러싼, 전역 스코프의 <span style="color:#c11f1f">this</span> 값으로 초기화된다.
      
  ```javascript
  var A = {
      normalMethod: function(){
          return this; // A object
      },
      arrowMethod: () => {
          return this; // global object
      }
  };
  
  // 이 경우 this 는 해당 함수를 내부 프로퍼티로 소유한 객체를 가리킨다.
  console.log(A.normalMethod()); // A Object
  
  // 이 경우 this 는 (arrowMethod)함수를 둘러싼, 전역 스코프의 this(global Object) 값으로 초기화된다.
  console.log(A.arrowMethod()); // global Object
  ```   
      
  - Arrow Function 내부에서의 <span style="color:#c11f1f">this</span> 값 변경
      
  ```javascript
  var A = {
      arrowMethod: () => {
  
          var bindFn = function(){
              console.log(this); // A object
          }.bind(A)();
  
          return this;
      }
  };
  
  console.log(A.arrowMethod()); // global Object
  ```  
       
  - 그 밖의 테스트
      
  ```javascript
  
  // 객체를 반환하기 위해서는 괄호 연산자 또는 return 문을 사용해야한다.
  {
      let a = () => {x: 1 };
  
      console.log(a()); // undefined
  }
  
  {
      let a = () => ({x: 1});
  
      console.log(a()); // {x: 1} object
  }
  
  {
      let a = () => { return {x: 1}; };
  
      console.log(a()); // {x: 1} object
  }
  
  // IIFE(즉시 실행 함수) 는 아래와 같이 표현될수 있다.
  console.log((() => 1)()); // 1
  ```         
      
## 관련 URL

- [애로우 펑션](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98)

- [ES6 Arrow Functions & this](http://codepen.io/somethingkindawierd/post/es6-arrow-functions-this)

- [화살표 함수(arrow functions)](https://github.com/wlzla000/JavaScript-documents/blob/master/ECMAScript%206%20Arrow%20functions(Korean).md)

- [Strict 모드(JavaScript)](https://msdn.microsoft.com/ko-kr/library/br230269(v=vs.94).aspx)
