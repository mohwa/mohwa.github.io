---
layout: post
title: "ES6 object initializer"
description: "ES6 object initializer"
date: 2016-04-21
categories: [javascript]
tags: [JavaScript, es6]
---

## 1. 글에 대해

- 모든 결과는 **Chrome 브라우저**를 통해 테스트된 결과입니다.

## 2. object initializer

- 객체 <span style="color:#c11f1f">초기화</span>(or 생성)를 위한 표현법(or 식)으로 아래와 같은 것들이 존재한다.

    - [new Object()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), Object Literal

## 3. <span style="color:#c11f1f">ES5</span> & <span style="color:#c11f1f">Object Initializer</span>

```javascript
// 'use strict';
{
    var o = {x: 1, y: 2, z: function(){}};

    var x = o.x, y = o.y, z = o.z;

    console.log(x, y, z); // 1 2 function(){}

    // 변수 선언(및 할당)과 동시에, 객체 property 값을 초기화할 수 있다.
    var o2 = {x: _x = 3, y: _y = 4};
    // 단 "Strict Mode" 에서는 아래와 같은 예외가 발생하게된다.(주의!!)
    // Uncaught ReferenceError: _x is not defined
    console.log(o2.x, o2.y); // 3 4

    // ES5 에서는 Object.defineProperty 를 통해서만, 접근자를 생성할 수 있다.
    var o4 = {};

    // id 접근자를 생성한다.
    Object.defineProperty(o4, 'id', {
        value: '',
        // 접근자 property 에 수정 권한을 준다.(기본 값: false)
        writable: true,
        get function(){
            return id;
        },
        set function(v){
            id = v;
        }
    });

    console.log(o4.id); // ''

    o4.id = 'yanione';
    console.log(o4.id); // yanione

    console.log(o4);
}
```

## 4. <span style="color:#c11f1f">ES6</span> & <span style="color:#c11f1f">Object Initializer</span>

- 기본적인 사용 방법

    ```javascript
    {
        // 선언된 변수명과 동일한 객체 property 명을 사용할 경우, 아래와 같이 표현할 수 있다.
        let x = 1, y = 2, z = function(){}, __proto__ = null;

        // property 할당 문법이 보다 간결해졌다.
        let o = {x, y, z, __proto__};

        console.log(o.x, o.y, o.z); // 1 2 function(){}
        console.log(o.__proto__); // null

        // ES6 에서는 객체 초기화 시, 접근자를 생성할 수 있다.
        let o3 = {
            // 접근자 사용을위해, 접근자 property(__id__) 를 선언한다.
            // 접근자 property
            __id__: '',
            // getter
            get id(){
                return this.__id__;
            },
            // setter
            set id(v){
                this.__id__ = v;
            }
        };

        console.log(o3.id); // ''
        console.log(o3.__id__); // ''

        o3.id = 'yanione';

        console.log(o3.id); // yanione
        console.log(o3.__id__); // yanione

        console.log(o3);

        let o4 = {
            // 메서드를 생성한다.
            method(){
                return 1;
            },
            // 문자열을 통해, property 명 조합할 수 있다.
            ['me'+ 'thod1'](){
                return 2;
            },
            // generator 를 생성할 수 있다.
            * generator(length = 10){

                // 일반적인 동기화 구문
                for (var i = 0; i < length; i++){
                    yield i;
                }
            },
            // 전달된 generator 를 비동기로 호출하는 함수
            asyncAction(generator, cb = function(){}, time = 1000){

                if (!generator) return;

                let v = generator.next();

                if (!v.done){
                    window.setTimeout(() => {
                        this.asyncAction(generator, cb, time);
                        cb.call(this, v.value);
                    }, time);
                }
            }
        };

        console.log(o4.method()); // 1
        console.log(o4.method1()); // 2

        let __generator__ = o4.generator();

        // 동기화 구문을 포함한 generator 를 (재귀 호출을 위한)setTimeout 함수를 통해, 비동기로 호출한다.
        // 전달된 callback 함수를 1초 마다 호출하게된다.
        o4.asyncAction(__generator__, function(v){
            console.log(this); // o object
            console.log(v); // 0 ~ 9
        });
    }
    ```

- <span style="color:#c11f1f">super</span> 키워드를 통해, 상속받은 객체 메서드를 호출할 수 있다.

    ```javascript
    {

        let o1 = {
            method1(){
                // super 키워드를 통해, 상속받은 객체 메서드를 호출할 수 있다.
                super.method2();
            }
        };

        let o2 = {
            method2(){
                console.log('method2');
            }
        };

        Object.setPrototypeOf(o1, o2);

        o1.method1();

    }
    ```

- <span style="color:#c11f1f">ES5</span> 의 \_\_proto\_\_ 내부 속성을 통해, <span style="color:#c11f1f">super</span> 키워드를 구현할 수 있다.

    ```javascript
    {
        let o1 = {
            method1(){
                // getPrototypeOf 메서드는 chrome 5, IE 9 이상에서 지원한다(대부분의 브라우저에서 지원한다고 볼 수 있다)
                // getPrototypeOf 메서드를 통해, super 키워드를 구현할 수 있다.
                // Object.getPrototypeOf(this).method2() === this.__proto__.method2()
                Object.getPrototypeOf(this).method2();
            }
        };

        let o2 = {
            method2(){
                console.log('method2');
            }
        };

        // setPrototypeOf 메서드는 chrome 34, IE 11 이상에서만 지원한다.
        // Object.setPrototypeOf(o1, o2) === o1.__proto__ = o2;
        Object.setPrototypeOf(o1, o2);

        o1.method1();

    }
    ```


## 관련 URL

- [Object initializer](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer)

- [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

- [[es6] Generator #1](http://www.bsidesoft.com/?p=2053)

- [ES6 In Depth: let and const (번역)](https://medium.com/@dduskim/es6-in-depth-let-and-const-%EB%B2%88%EC%97%AD-31028c086e72#.c48zfoehd)
