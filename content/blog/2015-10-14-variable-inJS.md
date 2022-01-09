---
layout: post
title: "Variable in JS"
description: "JavaScript 변수"
date:   2015-10-14
categories: javascript
tags: [JavaScript]
---

- **ECMAScript** 에서 말하는 **변수**는 오직 <span style="color:#6298c1">var</span> 키워드를(또는 변수 선언식을) 통해서만 **선언**된다.
	
	- 즉 <span style="color:#6298c1">var</span> 키워드가(또는 변수 선언식이) 생략된 y 속성은, <u>**변수가 아닌** <span style="color:#c11f1f">VO</span> 의 **속성**일 뿐이며</u>, Execution Context 진입 시, <span style="color:#c11f1f">VO</span> 의 새로운 **속성**으로 추가되지 않는다.

      ```javascript
    
      // global Execution Context
      
      // var 키워드를(변수 선언식을) 통해 변수가 선언되었다.
      // Execution Context 진입 시 VO 의 새로운 속성으로 추가되며, undefined 로 초기화된다.
      console.log(this.x); // undefined
      console.log(x); // undefined
      
      // var 키워드를 통한 변수 선언
      var x = 1;
      
    
      try{
    
        // Execution Context 진입 시 VO 의 새로운 속성으로 추가되지않으며, 그에 따라 런타임 에러가 발생한다.
        console.log(y);
      }
      catch(ex){
        console.log(ex.message); // y is not defined
      }
     
      
      // var 키워드가(변수 선언식이) 생략된 y 속성
      y = 2;
    
      ```

	- Execution Context 진입 시 <span style="color:#c11f1f">ECStack</span> 내부

      ```javascript
      var ECStack = [
        globalExecutionContext: {
          VO: {
            x: undefined
            // y 속성은 execution context 진입 시 초기화되지 않는다.
          }
        }
      ];
      ```
	- **실행 코드 처리 후**에는 <span style="color:#c11f1f">VO</span> 의 새로운 **속성**으로 추가된다.

      ```javascript
    
      // global Execution Context
      
      // Execution Context 진입 시 VO 의 새로운 속성으로 추가되지않는다.
      y = 2; // 실행 코드
      
      // 실행 코드 처리 후에는 VO 의 속성으로 추가된다.
      console.log(y); // 2
      console.log(this.y); // 2
      ```

	- **변수 선언식**을 통해, 생성된 **변수**는 <u>non-configurable</u>(or **DontDelete**) **속성**으로 정의되며, <span style="color:#c11f1f">delete</span> 연산자를 통해 **삭제**되지 않는다.
	
      ```javascript
      
      // global Execution Context
      
      // var 키워드를 통한 x 변수는 non-configurable 속성을 가지고있다.
      // configurable = false
      var x = 1;
      
      // var 키워드가 생략된 y 속성은 configurable 속성을 가지고있다.
      // configurable = true
      y = 2;
      
      
      // Object {value: 1, writable: true, enumerable: true, configurable: false}
      console.log(Object.getOwnPropertyDescriptor(this, 'x'));
      
      // Object {value: 2, writable: true, enumerable: true, configurable: true}
      console.log(Object.getOwnPropertyDescriptor(this, 'y'));
      
      // delete 연산자를 통해 x 변수를 삭제한다.
      delete this.x;
      
      // delete 연산자를 통해 y 속성을 삭제한다.
      delete this.y;
      
      // x 변수는 non-configurable 속성으로 delete 연산자를 통해, 삭제되지 않는다.
      console.log(x); // 1
      
      // y 속성은 configurable 속성으로 delete 연산자를 통해, 삭제된다.
      console.log(this.y); // undefined
      ```
      
	- <span style="color:#6298c1">eval</span> 함수를 통해, 선언된 **변수**는 **변수**로 선언되지 않는다.(<span style="color:#c11f1f">VO</span> 의 **속성**으로 추가되며, **configuration** 속성으로 정의된다)
	
      - 변수가 아닌, <span style="color:#c11f1f">VO</span> 의 **속성**으로 추가된다
      
        ```javascript
        // global Execution Context
        
        // calling context 는 global Execution Context 를 가리킨다.
        
        // eval 함수를 통해 x 변수를 생성한다.
        eval('var x = 1');
        
        // 정의된 객체 속성을 나열한다.(x 속성은 configurable 속성으로 정의되어있다)
        
        // Object {value: 1, writable: true, enumerable: true, configurable: true}
        console.log(Object.getOwnPropertyDescriptor(this, 'x'));
        
        console.log(this.x); // 1
        
        // delete 연산자를 통해 x 속성을 삭제한다.
        delete this.x;
        
        // 변수가 아닌, VO 의 x 속성은 delete 연산자를 통해 삭제된다.
        // 즉 configurable 속성으로 정의되었으며, 변수로 선언되지 않았다.
        console.log(this.x); // undefined

        ```
      - Function Execution Context 의 eval 함수
                      
        ```javascript
        
        // global execution context
        
        function A() {
        
            // function execution context
        
            // calling context 는 function execution context 를 가리킨다.
        
            // x 지역 변수를 선언한다.
            var x = 1;
        
            // eval 함수를 통해, 변수를 선언한다.
            eval('var y = 2;');
        
            console.log(x); // 1
        
            // y 속성은 calling context 내부 VO 에 추가된다.
            console.log(y); // 2
        
            // x 변수를 delete 연산자를 통해 삭제한다.
            delete x;
            // y 속성을 delete 연산자를 통해 삭제한다.
            delete y;
        
            // x 변수는 delete 연산자를 통해, 삭제되지 않는다.
            // 즉 x 변수는 변수로 선언되었다.(DontDelete 속성)
            console.log(x); // 1
        
            // delete 연산자를 통해, 해당 속성이 삭제되었다.
            // 즉 y 속성은 변수로 선언되지 않았다.
            console.log(y); // Uncaught ReferenceError: y is not defined
        }
        
        A();
        ```
        
      - <span style="color:#c11f1f">ECStack</span> 내부

        ```javascript
        var ECStack = [
          evalExecutionContext: {
            VO: {
              y: 2
            }
          },                
          // 호출 문맥
          callingContext: <A> functionExecutionContext,
          <A> functionExecutionContext: {
            AO(VO): {            
              // 실행 코드 처리 후, x 변수에 1이 할당된다.      
              x: 1, // --> delete 연산자를 통해 삭제되지 않는다. --> 1
              // eval 함수로 전달된 실행 코드로 인해, calling context 내부 VO 가 영향받는다.
              y: 2 // --> delete 연산자를 통해 삭제된다. --> y is not defined
            }
          },
          globalExecutionContext: {
            VO: {
              A: < reference to function >
            }
          }
        ];
        ```

## 참고 URL

- [Variable Object in JS](http://mohwa.github.io/blog/javascript/2015/10/14/vo-inJS/)
                                 
- [var](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var)

- [ECMA-262-3 in detail. Chapter 2. Variable object 번역 글](http://huns.me/development/189)

- [Strict Mode (JavaScript)](https://msdn.microsoft.com/en-us/library/br230269(v=vs.94).aspx)

- [Special Operators](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Operators/Special_Operators#delete)
