---
layout: post
title: "Execution Context in JS"
description: "JavaScript 실행 컨텍스트"
date:   2015-10-13
categories: javascript
tags: [JavaScript]
---

이 글은 오래전 [김훈민](http://huns.me/)님의 블로그 글을 통해 **ECMA-262-3 in detail** 번역본을 정독 후, 개인적인 테스트를 통해 다시한번 정리해본 내용입니다. 

  ![](https://www.dropbox.com/s/c9rg72fludmb0ak/84.png?dl=1)
 
- **Execution Context** 는 일종의 [Call Stack](http://ko.wikipedia.org/wiki/%EC%BD%9C_%EC%8A%A4%ED%83%9D) 형태를 취하고 있으며, Stack 의 **바닥**에는 Global **Execution Context** 가 존재하고, 가장 **상위**에는 **현재 활성화된 Execution Context** 가 놓이게된다.

  - *콜 스택(call stack) 이란 컴퓨터 과학에서 실행할 컴퓨터 프로그램 코드 정보를 저장하는 스택 자료구조이다. 또한 실행 스택(execution stack), 제어 스택 (control stack), 런 타임 스택 (run-time) 스택 혹은 기계 스택 (machine stack) 이라고도 하며 그냥 줄여서 스택 (the stack) 이라고도 한다. 소프트웨어 프로그램의 기능 수행에 있어 콜 스택의 유지 보수가 중요함에도 불구하고 구현 상세는 고급 프로그래밍 언어에서는 보통 감추어지며 자동화되어 있다.*

- <span style="color:#c11f1f">ECStack</span> 은 **Execution Context** 의 [Call Stack](http://ko.wikipedia.org/wiki/%EC%BD%9C_%EC%8A%A4%ED%83%9D) 을 의미한다.

- <span style="color:#c11f1f">ECStack</span> 은 여러 종류의 **Execution Context** 들이 들어오고 나가면서(pushed or poped), 지속적으로 관리(변경)된다.

  - <span style="color:#c11f1f">ECStack</span> 은 **LIFO**(Last In First out) 자료구조를 가진다.

- [런타임 시점](http://mohwa.github.io/blog/javascript/2015/10/09/prototype/)에서 **실행 코드**를 만나게되면 해당되는 **Execution Context** 가 생성되고, 생성된 **Execution Context**  안에서 **실행 코드**가 처리된다.

  - **Execution Context** 예 1
  
    ```javascript
      // global Execution Context(buttom)
      console.log("global Execution Context");
  
      function Func1(){
        // active function Execution Context(top)
      };
  
      function Func2(){
        // function Execution Context
        Func1();
      };
  
      Func2(); // call function object
    ```
    ```javascript
      var ECStack = [
        <Func1> active function Execution Context,
        <Func2> function Execution Context,
        global Execution Context
      ];
    ```
    ``` javascript
      // ECStack [생성 순서]
      1. global Execution Context
      2. <Func2> functional Execution Context
      3. <Func1> active functional Execution Context
  
      // ECStack [소멸 순서]
      1. <Func1> active functional Execution Context
      2. <Func2> functional Execution Context
      3. global Execution Context
    ```
  - **Execution Context** 예 2(재귀 호출)
  
    ```javascript
      // global Execution Context
      function A(x){
  
        // function Execution Context
  
        // 전달된 함수 매개변수의 갯수
        if (arguments.length > 0) {
  
          console.log(arguments.length); // 1
          // call function object recursively
          arguments.callee();
        }
      };
  
      A(1); // call function object
    ```
    ```javascript
      var ECStack = [
        <A> active function Execution Context - recursively,
        <A> function Execution Context,
        global Execution Context
      ];
    ```
    ``` javascript
      // ECStack [생성 순서]
      1. global Execution Context
      2. <A> functional Execution Context
      3. <A> active function Execution Context - recursively
  
      // ECStack [소멸 순서]
      1. <A> active function Execution Context - recursively
      2. <A> functional Execution Context
      3. global Execution Context
    ```
  - **Execution Context** 예 3(생성자 함수 호출)
  
    ```javascript
  
    // global Execution Context
    function A(){
  
      // A function Execution Context
    }
  
    console.dir(new A); // create instance
    ```	
    ```javascript

      var ECStack = [
        <A> active function Execution Context,
        global Execution Context
      ];
    ```	
    ``` javascript
      // ECStack [생성 순서]
      1. global Execution Context
      2. <A> active function Execution Context
  
      // ECStack [소멸 순서]
      1. <A> active function Execution Context
      2. global Execution Context
    ```

## 참고 URL

- [ECMA-262-3 IN DETAIL. CHAPTER 1. EXECUTION CONTEXTS](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)

- [ECMA-262-3 IN DETAIL. CHAPTER 1. EXECUTION CONTEXT 번역 글](http://huns.me/development/159)

- [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)

- [JavaScript Execution Context](http://www.yusufaytas.com/javascript-execution-context/)
