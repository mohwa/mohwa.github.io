---
layout: post
title: "ES6 Destructuring assignment"
description: "ES6 Destructing assignment"
date: 2016-03-24
categories: [javascript]
tags: [JavaScript, es6]
---

## 1. 글에 대해

- 모든 결과는 **Chrome 브라우저**(ver 49)를 통해 테스트된 결과입니다.

## 2. Destructuring assignment(해체 할당)이란?

- <span style="color:#c11f1f">해체 할당</span>은, **배열** 또는 **객체** 리터럴과 유사한 **문법**으로, 변수에 값을 할당하는 <span style="color:#c11f1f">JS 표현식</span>중 하나이다.
  
## 3. <span style="color:#c11f1f">Array</span> destructing assignment(배열 해체 할당)
    
- <span style="color:#c11f1f">배열 해체 할당</span>을 통해, **iterator** 객체의 **요소**값을, **변수**에 할당시킬 수 있다. 

    - Array in <span style="color:#c11f1f">ES5</span>
      
        ```javascript
        {
          // ES5 에서, 배열 객체 요소를 변수에 할당시키는 기본적인 방법이다.
          var arr = [1, 2];
    
          var x = arr[0];
          var y = arr[1];
    
          console.log(x, y); // 1 2
        }
    
        ```
          
    - Iterator in <span style="color:#c11f1f">ES6</span>
          
        - **기본적인** 할당 방법
          
            ```javascript
            {
              let arr = [1, 2];
            
              // (블록 스코프)변수 선언과, 해체 할당을 한줄로 표현할 수 있다.
              let [x, y] = arr;
            
              console.log(x, y); // 1 2
            
              // 변수 선언이 생략된 x, y 속성은, 실행 코드 처리 시, globalEC.VO 의 속성으로 추가된다.
              [_x, _y] = arr;
            
              // globalEC.VO.x, globalEC.VO.y
              console.log(this._x, this._y, window._x, window._y); // 1 2 1 2
            }
            ```
              
        - 변수 할당을 **건너뛰는** 방법
          
            ```javascript
            {
              let arr = [1, 2, 3, 4];

              // 아래와 같은 표현식을 통해, 변수 할당을 건너뛸 수 있다.
              let [x, , , z] = arr;

              console.log(x, z); // 1 4
            }
            ```

        - **나머지 연산자**를 통한 해체 할당
          
          ```javascript
          {
              let arr = [1, 2, 3];

              // y 변수에는, (할당될)배열 객체의 나머지 요소(2, 3)가 포함된 새로운 배열 객체([2, 3])가 할당된다.
              let [x, ...y] = arr;

              console.log(x, y); // 1 [2, 3]

              let [_x, ..._y] = [1];

              // _y 변수에는, (할당될)배열 객체의 나머지 요소가 존재하지 않으므로, 빈 배열 객체가 할당된다.
              console.log(_x, _y); // 1, []
          }
          ```
           
          - (할당될)변수의 **기본값**을 지정할 수 있다.
          
              ```javascript
              {
                  let arr = [1];

                  // y 변수에 기본값 2 를 지정한다.
                  let [x, y = 2] = arr;

                  // y 변수에 기본값 2 가 할당된다.
                  console.log(x, y); // 1 2

                  // _x 변수에 기본값 1 을 지정한다.
                  let [_x = 1] = [undefined];

                  // _x 변수에 기본값 1 이 할당된다.
                  console.log(_x); // 1

                  // 함수 표현식을 기본값으로 사용할 수 있다.
                  let [__x = (() => {
                      return 1;
                  })()] = [];

                  // __x 변수에 함수 표현식을 통해 반환받은 기본값 1이 할당된다.
                  console.log(__x); // 1

                  // ___x, ___y 변수에 각각 기본값 3, ___x 변수를 지정한다.
                  let [___x = 3, ___y = ___x] = [];

                  // ___x, ___y 변수에 각각 기본값 3, ___x 변수값이 할당된다.
                  console.log(___x, ___y); // 3 3

                  // ____x, ____y 변수에 각각 기본값 3, ____x 변수를 지정한다.
                  let [____x = 3, ____y = ____x] = [7];

                  // ____x, ____y 변수에 각각 배열 요소값 7, ____x 변수값이 할당된다.
                  console.log(____x, ____y); // 7 7
              }
              ```
                               
          -  **중첩 배열**에 대한, 해체 할당

              ```javascript
              {
                // 중첩 배열을 통한 해체 할당
                let arr = [1, [3, 4, 5]];

                let [x, [y, ...z]] = arr;

                // z 변수에는 (할당될)변수 객체의 나머지 요소(4, 5)가 포함된 새로운 배열[4, 5]이 할당된다.
                console.log(x, y, z); // 1 3 [4, 5]

                let [_x, ...[_y, _z]] = [1, 2, 3];

                // (나머지 연산자의)피 연산자는 꼭 변수가 아니여도 된다.
                // 즉 나머지 연산자를 통해, 할당된 피연산자를 한번 더, 해체 할당하면 아래와 같은 결과가 반환된다.
                console.log(_x, _y, _z); // 1 2 3
              }
              ```

          -  **함수 인자값**을 통한, 해체 할당

              ```javascript
              {

                  let A = ([x, y = 2]) => {

                      // y 변수에는 지정된 기본값인 2가 할당된다.
                      console.log(x, y); // 1 2
                  };

                  A([1]);

                  let B = ([x, y] = [1, 2]) => {

                      // x, y 변수에는 지정된 기본값인 1, 2 가 할당된다.
                      console.log(x, y); // 1 2
                  };

                  B();

                  let C = ([x = 1, y = 2] = []) => {
                      console.log(x, y);
                  };

                  // 전달된 인자값이 없는경우, 그에 대한 기본값인 "빈 배열" 객체가 할당되며,
                  // 또 그 배열에 대한 기본값인 x = 1, y = 2 가 다시 할당되게된다.
                  C(); // 1 2

                  // 지정된 기본값인 1, 2 가 할당된다.
                  C([]); // 1 2

                  // 전달된 인자값이 할당된다.
                  C([3, 4]); // 3 4


                  // block scope
                  let x = 'outer';

                  let D = function(_x = x) {

                      // x 변수 선언 후, 2를 할당한다
                      let x = 'inner';
                      console.log(_x); // outer
                  }

                  // 전달된 인자값이 없는 경우, 지정된 기본값인 x 변수가 할당된다.
                  D();

                  // args 변수에는, 전달된 인자값이 모두 포함된 새로운 배열이 할당된다.
                  let E = function(...args) {

                      // x, y 변수에 할당한다.
                      let [x, y] = args;

                      console.log(x, y); // 1 2
                  }

                  E(1, 2);
              }

              ```

      - 그 밖의 표현식

          - **문자열** 할당

              ```javascript
              {

                  // 문자열이 할당될 경우에는, 해당 문자열을 암묵적으로 iterator 객체로 변환한다.
                  let [x, y, z] = 'xyz';

                  console.log(x, y, z); // x y z

                  // 아래 코드는 동일한 결과를 반환한다.
                  // let [_x, _y, _z] = new String('xyz')[Symbol.iterator]();
              }

              ```

          - **new Set([])**

              ```javascript
              {
                  // 생성된 set 객체를 통해, iterator 객체를 할당한다.
                  let [__x, __y] = new Set([1, 2]);

                  console.log(__x, __y); // 1 2

                  // let [__x, __y] = new Set([1, 2]).values();
              }
              ```

          - **generator** 할당

              ```javascript
              {
                  // generator 를 선언한다.
                  function* $$() {
                      for (let i = 1; ; i++) {
                          yield i;
                      }
                  }

                  // 생성된 generator 를 할당한다.
                  let [x, y, z] = $$();

                  console.log(x, y, z); // 1 2 3

                  // 객체 내부에 생성된 generator 를 할당한다.
                  let [_x, _y] = {
                      // generator 생성한다
                      * [Symbol.iterator]() {
                          for (let i = 1; i < 10; i++){
                              yield i;
                          }
                      }
                  };

                  console.log(_x, _y); // 1 2

                  // iterator 인터페이스를 구현한, iterator 객체를 할당한다.
                  let [__x, __y] = {
                      i: 0,
                      [Symbol.iterator]() {
                          // iterator 객체를 반환
                          return this;
                      },
                      next(){
                          return {value: ++this.i, done: this.i > 10};
                      }
                  };

                  console.log(__x, __y); // 1 2
              }
              ```

          - **ETC**

              ```javascript
              {

                  // 정규식을 통해, 반환된 iterator 객체를 할당한다.
                  let [, x, y, z] = /(\d+)\/*(\d+)\/*(\d+)/.exec('2016/03/01');
                  console.log(x, y, z); // 2016 03 01


                  // map 객체를 생성한다.
                  let m = new Map([
                      [1, 'a'],
                      [2, 'b'],
                      [3, 'c']
                  ]);

                  // map 객체를 통해, 새로운 배열 객체를 생성한다.
                  let _m = new Map([...m].map(([k, v]) => {
                      return [k * 2, '_' + v];
                  }));


                  let urls = [
                      'http://example.com/foo.html',
                      'http://example.com/bar.html',
                      'http://example.com/baz.html'
                  ];

                  // Promise.all 메서드를 통해, 전달된 url 집합을 할당한다.
                  Promise.all(urls.map((url) => {
                      return url;
                  })).then(([url1 = top.window.location.href, url2 = top.window.location.href, url3 = top.window.location.href]) => {

                      // 전달받은 배열 객체(['http://example.com/foo.html', 'http://example.com/bar.html', 'http://example.com/baz.html'])가 해체 할당된다.
                      console.log(url1, url2, url3);
                  });
              }
              ```
                                                                      
## 4. <span style="color:#c11f1f">Object</span> destructing assignment(객체 해체 할당)                                                                      
              
- <span style="color:#c11f1f">객체 해체 할당</span>을 통해, 객체 **속성**값을, **변수**에 할당시킬 수 있다. 

  - Object in <span style="color:#c11f1f">ES5</span>
  
      ```javascript
      
      {
          // ES5 에서, 객체 속성을 변수에 할당시키는 기본적인 방법이다.
          let o = {x: 1, y: 2};
          
          let x = o.x;
          let y = o.y;
  
          console.log(x, y); // 1 2
      }                    
      ```                                           
                 
  - Object in <span style="color:#c11f1f">ES6</span>
      
      - **기본적인** 할당 방법
      
          ```javascript
          {
              let o = {x: 1, y: 2};
      
              // (블록 스코프)변수 선언과, 해체 할당을 한줄로 표현할 수 있다.
              let {x, y} = o;
      
              // (할당될)변수 이름을 객체 속성 이름과 다르게 생성하고 싶을때에는, 아래와 같은 표현식을 사용할 수 있다.
              let {x: _x, y: _y} = o;
      
              console.log(x, y, _x, _y); // 1 2 1 2
          }
          ```   
                                          
      - (할당될)변수의 **기본값**을 지정할 수 있다.
      
          ```javascript
          {
              let o = {x: 1};
      
              // y 변수에 기본값 2 를 지정한다.
              let {x, y = 2} = o;
      
              console.log(x, y); // 1 2
      
              // _y 변수에 기본값 2 를 지정한다.
              let {x: _x, y: _y = 2} = o;
      
              console.log(_x, _y); // 1 2
      
      
              // 배열 요소가 존재하지 않을 경우, 그에 대한 기본값인 "빈 객체"가 할당되며,
              // 또 그 객체에 대한 기본값인 __y = 2 가 다시 할당된다.
              let [{x: __x, y: __y = 2} = {}] = [];
      
              console.log(__x, __y); // undefined 2
      
      
              // 배열 요소가 존재하지 않을 경우, 그에 대한 기본값인 "빈 객체"가 할당되며,
              // 또 그 객체에 대한 기본값인 ___x = {x: 1}, ___y = 2 가 다시 할당된다.
              let [{x: ___x, y: ___y = 2} = {x: 1}] = [];
      
              console.log(___x, ___y); // 1 2
          }
          ```
                                                           
      -  **중첩 객체**에 대한, 해체 할당
      
          ```javascript
          {
              // 중첩된 객체를 생성한다.
              let o = {x: 1, y: {_x: 2, _y: {__x: 3}}};
              
              // 중첩된 객체가 해체 할당된다.
              let {x, y: {_x, _y: {__x}}} = o;
      
              console.log(x, _x, __x); // 1 2 3
          }
          ```  
                                                                       
      -  **함수 인자값**을 통한, 해체 할당
      
          ```javascript
          {
              let A = ({x = 1, y = 2}) => {
                  console.log(x, y); // 1 2
              };
      
              // y 변수에는 기본값인 2가 할당된다.
              A({x: 1});
      
              let B = ({x, y} = {x: 1, y: 2}) => {
                  console.log(x, y); // 1 2
              };
      
              // 인자값이 전달되지않은 경우에도, 기본값인 {x: 1, y: 2} 가 할당된다.
              B();
      
              let C = ({x = 1, y = 2} = {}) => {
                  console.log(x, y); // 1 2
              };
      
              // 인자값이 전달되지않은 경우에는, 그에 대한 기본값인 빈 객체가 할당되며,
              // 또 그 객체에 대한 기본값인 x = 1, y = 2 가 다시 할당된다.
              C();
              
            // 해체 할당을 통해 이와 같은 패턴이 적용될듯 하다.
            function ajax({url = top.location.href, method = 'GET', headers = {}} = {}){
    
                return {
                    url: url,
                    method: method,
                    headers: headers
                };
            };
    
            console.log(ajax()); // {url: "http://localhost:8080/sourceTest/es6/destructuring_assignment.html", method: "GET", headers: Object}
            
            console.log(ajax({url: 'myUrl', method: 'POST', headers: {contentType: ''}})); // {url: "myUrl", method: "POST", headers: Object}                  
          }
          ```                                                                             
                   
  - 그 밖의 표현식     
                                 
      - (할당)패턴 없이, 값을 할당할 경우에는 그 값을 **객체**로 변환 후, 해당 속성값을 할당시킨다
      
          ```javascript
          {
      
              let {length: x} = [1] // [].length
              console.log(x); // 1
      
              let {toString: xx} = {} // {}.toString
              console.log(xx); // toString function object
              
              // 할당될 값에 (할당)패턴이 적용된 경우...
              let {toString: _xx} = {toString: 1} // {}.toString
              console.log(_xx); // 1                  
      
              let {length: xxx} = 'mohwa'; // === new String('mohwa').length
              console.log(xxx); // 5
      
              let {toString: xxxx} = 'mohwa'; // === new String('mohwa').toString
              console.log(xxxx); // toString function object
      
              let {toFixed: xxxxx} = 1; // new Number(1).toFixed
              console.log(xxxxx); // toFixed function object
      
              let {valueOf: xxxxxx} = true; // new Boolean(true).valueOf
              console.log(xxxxxx); // valueOf function object
      
              let {length: xxxxxxx} = function(x){}; // function(x){}.length
              console.log(xxxxxxx); // 1
      
              let {x: xxxxxxxx} = 'mohwa'; // new String('mohwa').xx
              console.log(xxxxxxxx); // undefined
      
      
              // undefined 와 null 값은 예외가 발생한다.
      
              try{
                  let {toString: x} = undefined; // === undefined.toString
              }
              catch(e){
                  console.log(e.message); // Cannot match against 'undefined' or 'null'.
              }
      
              try{
                  let {toString: x} = null; // === null.toString
              }
              catch(e){
                  console.log(e.message); // Cannot match against 'undefined' or 'null'.
              }
      
          }
          ```
          
      - **Symbol** 을 통한 해체 할당
      
          ```javascript
          {
              const k = Symbol();
              let o = { [k]: 1 };
      
              let {[k]: x} = o;
      
              console.log(x); // 1
          }        
          ```                             

## 관련 URL

- [Destructuring and parameter handling in ECMAScript 6](http://www.2ality.com/2015/01/es6-destructuring.html)

- [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

- [ES6 In Depth: 컬렉션 (Collections)](http://hacks.mozilla.or.kr/2015/12/es6-in-depth-collections/)
