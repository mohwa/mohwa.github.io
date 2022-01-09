---
layout: post
title: "Function in JS"
description: "JavaScript 함수에 대해 알아보기"
date:   2015-10-15
categories: javascript
tags: [JavaScript]
---

- JS 의 다양한 함수 식

    ```javascript
      
    // global execution context
  
    // 함수 선언식의 경우, 해당 execution context 진입 시, VO 의 새로운 속성으로 추가되며, function object 로 초기화된다.
    console.log(A); // function object
    
    // 함수 선언식(FD)
    function A(){
        // function execution context
        console.log(this); // global object
    };
    
    // 함수 표현식의 경우, 해당 execution context 진입 시, VO 의 새로운 속성으로 추가되지않으며, 
    // 초기화된 undefined 는 B 변수 선언식에 의해 초기화된것이다.
    console.log(B); // undefined
    
    // 함수 표현식(FE)
    var B = function () {
        // function execution context
        console.log(this); // global object
    };
    
    // 즉시 실행 함수(IIFE)(함수 표현식 중 하나)
    (function C(){
        // function execution context
        console.log(this); // null ==> global object
    })();
    
    // 함수 표현식의 경우, 해당 execution context 진입 시, VO 의 새로운 속성으로 추가되지않으며, 
    // 즉시 실행 함수의 경우, 함수 실행이 끝난 후 바로 소멸된다
    console.log(C); // Uncaught ReferenceError: C is not defined
    ```
    
- 함수 선언식(Function Declaration(<span style="color:#c11f1f">FD</span>))

  - A 함수 선언
	
    ```javascript
    // A 함수 선언
    function A(){
      // function execution context
    };
    ```

	- <span style="color:#c11f1f">FD</span> 는 함수 정의를 나타내는 문장으로 해석되며, **수행결과**가 존재하지 않는다.

      ```javascript
      function A(){}.length // Uncaught SyntaxError: Unexpected token .
      ```

	- <span style="color:#c11f1f">FD</span> 는 해당 Execution Context **진입 시**, <span style="color:#c11f1f">VO</span> 의 새로운 **속성**으로 추가되며, function object 로 **초기화** 된다.(이 현상을 보통 **Hoisting** 및 **Compiler Lift** 라 부른다)

      ```javascript

      // global execution context

      // execution context 진입 시 function object 로 초기화된다.
      console.log(A); // A function object

      function A(){
      };

      ```
  - global execution context 내부 선언
  
      ```javascript
      // global execution context

      function A(){
      };
      ```
  - <span style="color:#c11f1f">ECStack</span> 내부
          
      ```javascript
      var ECStack = [
        globalExecutionContext: {
          VO: {
            A: <reference to function>
          }
        }
      ];
      ```
  - global or function execution context 내부 선언
  
      ```javascript

      // global execution context

      // global execution context 의 VO 속성으로 추가된다.
      function A(){

        // function execution context

        // 내부 함수
        // function execution context 의 AO(VO) 속성으로 추가된다.
        function B(){
          // function execution context
        }
      };

      A();
      ```
  - <span style="color:#c11f1f">ECStack</span> 내부
  
      ```javascript
      var ECStack = [
        <A> functionExecutionContext: {
          AO(VO): {
            // function execution context 의 AO(VO) 속성으로 추가된다.
            B: <reference to function>
          },
          // 함수 호출 시 생성되는 Scope Chain
          Scope(Scope Chain): [
            AO(VO): {
              B: <reference to function>
            },
            globalExecutionContext.VO: {
              A: < reference to function >
            }
          ]
        },
        globalExecutionContext: {
          VO: {
            // global execution context 의 VO 속성으로 추가된다.
            A: <reference to function>
          },
          Scope(Scope Chain): [
            globalExecutionContext.VO
          ]
        }
      ];
      ```

- 함수 표현식(Function Expression(<span style="color:#c11f1f">FE</span>))
  
	- <span style="color:#c11f1f">FE</span> 는 기본적으로 **표현식 위치**에만 정의할 수 있다.
	
	- <span style="color:#c11f1f">FE</span> 는 해당 Execution Context 진입 시, <span style="color:#c11f1f">VO</span> 의 새로운 속성으로 추가되지않으며, **초기화**된 undefined 는 A 변수 선언식에 의해 **초기화**된것이다.

      ```javascript
      
      // 함수 표현식이 아닌, A 변수 선언식에 의해 undefined 로 초기화된다.
      console.log(A); // undefined
    
      var A = function(){};
      
      // 실행 코드 처리 후 function object 가 할당된다.
      console.dir(A); // function object
      ```
	- <span style="color:#c11f1f">FE</span> 는 함수 데이터로 해석되며, **수행 결과**가 존재한다.

      ```javascript
         // 괄호 연산자를 통한 함수 표현식
        (function A(){}).length;
        
        console.log((function A(){}).length); // 0
      ```	

	- <span style="color:#c11f1f">FE</span> 는 **선택적 이름**을 가질 수 있다.

		- <span style="color:#c11f1f">익명 함수 표현 식</span>(<span style="color:#c11f1f">AFE</span>(Anonymous Function Expression))
		
		- <span style="color:#c11f1f">기명 함수 표현 식</span>(<span style="color:#c11f1f">NFE</span>(Named Function Expression))

            ```javascript
            // 익명 함수 표현식
            var A = function(){};
        
            // 기명 함수 표현식
            var B = function _B(){};
        
            ```

	  - <span style="color:#c11f1f">NFE</span>의 함수 이름은 <span style="color:#c11f1f">VO</span> 속성으로 추가되지 않는다.

        ```javascript
    
        // 기명 함수 표현식
        var A = function _A(){}; 
    
        console.log(this.A); // function object
        console.log(this._A); // undefined
        ```
	  - <span style="color:#c11f1f">NFE</span>의 함수 이름은 함수 내부에서만 접근 가능하다.

        ```javascript
    
        var A = function _A(){
          console.log(_A); // function object
        };
  
        A();
    
        console.log(this.A); // function object
        console.log(this._A); // undefined
        ```
	
	- 그룹화 연산자의 활용

		- 두 <span style="color:#c11f1f">FD</span> 와 그룹화 연산자의 사용은 동일하다.

          ```javascript
    
            // JS 파서는 A 함수 선언식과 1 표현식을 감싸는 그룹화 연산자로 해석한다.
            // 즉 error 가 발생하지 않는다.
            function A(){
    
            }(1); // 1
    
            function A(){
    
            }    
    
            (1); // 1
          ```

		- 즉시 실행 **함수 표현식**(Immediately-Invoked Function Expression(<span style="color:#c11f1f">IIFE</span>))

			- 즉시 실행 함수는 <span style="color:#c11f1f">FE</span> 중 하나이다.<p>

			- **그룹화 연산자**를 통해 파서가 <span style="color:#c11f1f">FE</span> 로 **해석**하도록 만들 수 있다.<p>

			- **그룹화 연산자**를 통해 생성된 함수는 <u>함수 실행이 끝난 후 **바로 소멸**된다.</u><p>

				- <span style="color:#c11f1f">FE</span> 는 <span style="color:#c11f1f">VO</span> 의 속성으로 추가되지 않는다.<p>
			
				- 즉 <span style="color:#c11f1f">VO</span> 에 추가되지 않는다는 말은, **메모리를 가용성**이 좋다는 말과 같다.<p>
			
			- 함수를 **실행** 후 바로 **소멸** 시키는 경우, 사용하면 좋다.<p>
			
          - 하지만 이 말은 <strong>생성된 함수</strong>의 <strong>재사용</strong>이 불가능 하다는 말과 같다.(잘못 설계하면, 코드 가독성이 떨어질 위험이 있다;;;)<p>
    
            ```javascript
            
            // 즉시 실행 함수를 호출하는 두 가지 방법
            (function A(x){
    
              console.log(x); // 1
    
            })(1);
            
            (function A(x){
    
              console.log(x); // 1
    
            }(1));
              
            ```
			
			- 그 밖에 방법(**표현식**이 가능할 뿐 거의 사용되지는 않는다(특별한 경우가 아니라면, 사용하지 않는것이 좋다))

              ```javascript
              1, function A(x){
        
                console.log(x); // 1
        
              }(1);
        
              !function B(y){
        
                console.log(y); // 2
              }(2);			
              ```
			- <span style="color:#c11f1f">IIFE</span> 응용
			
			    - <span style="color:#6298c1">apply</span> 메서드를 통한 <span style="color:#6298c1">this</span> 값 초기화

                    ```javascript
                
                    // global execution context

                    (function(){

                      // function execution context

                      console.log(this); // object Object

                    }).apply({});
                    ```

              - JS Singleton 구현
    
                  ```javascript

                  // global execution context

                  var $ = (function(){

                      // 익명 함수 표현식 내부
                      // function execution context
                      var instance = null;

                      function $(){

                          // $ 함수 선언식 내부
                          // function execution context

                          // 만약 instance 변수에 할당된 this 값이 있다면, 그 값을 반환한다.
                          if (!instance) instance = this;

                          return instance;
                      }

                      return $;

                  }());

                  var obj1 = new $();
                  var obj2 = new $();

                  console.log(obj1 === obj2); // ture
                  ```

              - JQuery Framework 구조생성
    
                  ```javascript

                    var $ = (function(){

                        function $(selector){
                            return new init(selector);
                        };

                        function init(selector){

                            selector = selector || '';

                            var elems = document.getElementById(selector) || document.getElementsByTagName(selector);

                            if (elems.length){

                                for (var n in elems) {

                                    var elem = elems[n];

                                    if (elem.nodeName) this[n] = elems[n];
                                };
                            }

                            return this;
                        };

                        init.prototype = {

                            get: function(idx){

                                idx = idx || 0;

                                return this[idx] || undefined;
                            }
                        };

                        $.get = function(){
                            console.log('ajax get');
                        };
                        $.post = function(){
                            console.log('ajax post');
                        };

                        return $;

                    })();

                    console.log($('title')); // object Object

                    console.log($('title')[0]); // title elem
                    console.log($('title').get(0)); // title elem

                    console.log($('meta')[0]); // meta elem
                    console.log($('meta').get(0)); // meta elem

                    console.log($('span')[0]); // undefined
                    console.log($('span').get(1)); // undefined

                    $.get(); // ajax get
                    $.post(); // ajax post
                  ```
                
	- 그룹화 연산자를 사용하지 않는 <span style="color:#c11f1f">IIFE</span>

		- <span style="color:#c11f1f">FE</span> 는 반드시 <span style="color:#c11f1f">FE</span> 위치에 있어야 한다.
			
			- <span style="color:#c11f1f">FE</span> 가 <span style="color:#c11f1f">FE</span> 위치에 있을 경우, 파서는 **실행 코드 처리시**, 이것이 실행 가능하다는 것을 알고 있다.
		
              ```javascript

                var A = function(x){
                  console.log(x); // 1
                }(1);

                var B = {

                  // 상황에 따른 초기화 값을 할당할때 유용하게 사용할 수 있다.
                  x: function(y){
                    return y ? true : false;
                  }(1)
                };

                console.log(B.x); // true
              ```
