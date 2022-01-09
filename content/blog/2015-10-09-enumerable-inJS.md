---
layout: post
title: "JS Enumerable(열거자) or Nonenumerable(비 열거자)"
description: "JavaScript Enumerable(열거자) 또는 Nonenumerable(비 열거자) 에 대해 알아보기"
date:   2015-10-09
categories: javascript
tags: [JavaScript]
---

## 1. 정의

- JS 객체 속성은 **Enumerable**(열거자) 또는 **Nonenumerable**(비열거자) 로 정의할 수 있으며, 이들을 **탐색**, **검색**, **반복** 할 수 있는 **built-in** 수단(문 or 메서드)들을 제공하고있다.

	- 위에서 언급한바와같이, [Object.defineProperty](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 메서드를 통해, 객체 속성을 **Enumerable** 또는 **Nonenumerable** 로 정의할 수 있다.

		```javascript

		var obj = {};

		// 객체의 x 속성을 enumerable 로 정의한다.
		Object.defineProperty(obj, 'x', {
			enumerable: true,
			configurable: false,
			writable: false,
			value: 1
		});

		// 객체의 y 속성을 non-enumerable 로 정의한다.
		Object.defineProperty(obj, 'y', {
			enumerable: false,
			configurable: false,
			writable: false,
			value: 2
		});

		// propertyIsEnumerable 메서드를 통해, 전달된 객체 속성의 enumerable 유/무를 반환한다.
		console.log(Object.propertyIsEnumerable.call(obj, 'x')); // true
		console.log(Object.propertyIsEnumerable.call(obj, 'y')); // false
		console.log(obj); // Object {x: 1, y: 2}

		```

- **built-in 수단**

  - **탐색**(Detection)

	- [Object.prototype.propertyIsEnumerable](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)

		- 전달된 **속성 이름**(<span style="color:#c11f1f">상속받은 속성이 제외된 속성 중</span>)의 **Enumerable** 유/무를 반환한다.

			```javascript

			var obj = {};

			// 객체의 x 속성을 enumerable 로 정의한다.
			Object.defineProperty(obj, 'x', {
				enumerable: true,
				configurable: false,
				writable: false,
				value: 1
			});

			// 객체의 y 속성을 non-enumerable 로 정의한다.
			Object.defineProperty(obj, 'y', {
				enumerable: false,
				configurable: false,
				writable: false,
				value: 2
			});

			// 객체 원형을 확장시킨다.
			obj.constructor.prototype.z = 3;

			// enumerable
			console.log(Object.propertyIsEnumerable.call(obj, 'x')); // true
			// non-enumerable
			console.log(Object.propertyIsEnumerable.call(obj, 'y')); // false

			// 객체 원형(obj.constructor.prototype)을 확장하여, 상속된 z 속성에 대해서는 false 를 반환하게된다.
			console.log(Object.propertyIsEnumerable.call(obj, 'z')); // false

			```

	  - https://msdn.microsoft.com/ko-kr/library/adebfyya(v=vs.94).aspx

	- [Object.prototype.hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

		- 전달된 **속성 이름**(<span style="color:#c11f1f">상속받은 속성이 제외된 속성 중</span>)의 **정의** 유/무를 반환한다.

		- 단 <span style="color:#6298c1">propertyIsEnumerable</span> 메서드와 달리, **Nonenumerable** 유/무를 판단하지 못한다.(즉 무조건 <span style="color:#c11f1f">true</span> 를 반환하게된다)

			```javascript

			var obj = {};

			// 객체의 x 속성을 enumerable 로 정의한다.
			Object.defineProperty(obj, 'x', {
				enumerable: true,
				configurable: false,
				writable: false,
				value: 1
			});

			// 객체의 y 속성을 non-enumerable 로 정의한다.
			Object.defineProperty(obj, 'y', {
				enumerable: false,
				configurable: false,
				writable: false,
				value: 2
			});

			// 객체 원형을 확장시킨다.
			obj.constructor.prototype.z = 3;

			// enumerable
			console.log(Object.hasOwnProperty.call(obj, 'x')); // true
			// non-enumerable
			console.log(Object.hasOwnProperty.call(obj, 'y')); // true

			// 객체 원형(obj.constructor.prototype)을 확장하여, 상속받은 z 속성에 대해서는 false 를 반환하게된다.
			console.log(Object.hasOwnProperty.call(obj, 'z')); // false

			```

  - **검색**(Retrieval)

	- [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

		- 전달된 **객체** **속성** 중(<span style="color:#c11f1f">상속받은 속성이 제외된 속성 중</span>) **Enumerable** 속성으로만 이루어진 **배열**을 반환한다.

			```javascript

			var obj = {};

			// 객체의 x 속성을 enumerable 로 정의한다.
			Object.defineProperty(obj, 'x', {
				enumerable: true,
				configurable: false,
				writable: false,
				value: 1
			});

			// 객체의 y 속성을 non-enumerable 로 정의한다.
			Object.defineProperty(obj, 'y', {
				enumerable: false,
				configurable: false,
				writable: false,
				value: 2
			});

			obj.constructor.prototype.z = 3;

			// enumerable 속성으로만 이루어진 배열을 반환한다.
			// 이전과 마찬가지로 상속받은 z 속성은 제외된다.
			console.log(Object.keys(obj)); // ["x"]

			```

	- [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

		- 전달된 **객체** **속성**(<span style="color:#c11f1f">상속받은 속성이 제외된 속성 중</span>)으로 이루어진 **배열**을 반환한다.(**Enumerable** 또는 **Nonenumerable** 속성이 모두 포함된다)

			```javascript

			var obj = {};

			// 객체의 x 속성을 enumerable 로 정의한다.
			Object.defineProperty(obj, 'x', {
				enumerable: true,
				configurable: false,
				writable: false,
				value: 1
			});

			// 객체의 y 속성을 non-enumerable 로 정의한다.
			Object.defineProperty(obj, 'y', {
				enumerable: false,
				configurable: false,
				writable: false,
				value: 2
			});

			obj.constructor.prototype.z = 3;

			// enumerable or non-enumerable 속성 이름으로 이루어진 배열을 반환한다.
			// 이전과 마찬가지로 상속받은 z 속성은 제외된다.
			console.log(Object.getOwnPropertyNames(obj)); // ["x", "y"]

			```

  - **반복**(Iteration)

	- [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

	- [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)

	- [for...in 문](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

		- 전달된 **객체** 속성을(<span style="color:#c11f1f">상속받은 속성이 모두 포함된</span>) 모두 **순회**한다.

	  - 이전 **built-in 수단**들과 달리, 상속받은 **속성**이 모두 포함된다.

        ```javascript

        var obj = {};

        // 객체의 x 속성을 enumerable 로 정의한다.
        Object.defineProperty(obj, 'x', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: 1
        });

        // 객체의 y 속성을 non-enumerable 로 정의한다.
        Object.defineProperty(obj, 'y', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: 2
        });

        // 객체 원형을 확장한 z 속성을 enumerable 로 정의한다.
        Object.defineProperty(obj.constructor.prototype, 'z', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: 3
        });

        // 객체 원형을 확장한 t 속성을 non-enumerable 로 정의한다.
        Object.defineProperty(obj.constructor.prototype, 't', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: 4
        });

        // 모든 enumerable 속성을 순회한다.(자신이 소유한 속성 및 상속받은 속성)
        for (var n in obj){
            // enumerable 속성만을 가져온다.
            // x: 자신이 소유한 enumerable 속성, z: 상속받은 enumerable 속성
            console.log(n); // x, z

        }

        ```

- non-enumerable 속성만을 가져오기

  - 언급된 **built-in 수단**들의 **특성**을 이용하여, <span style="color:#c11f1f">자신이 소유한 **속성** 중</span> **non-enumerable** 속성만을 가져오는 **예제**를 만들어보았다.

    ```javascript

    var obj = {};

    // 객체의 x 속성을 enumerable 로 정의한다.
    Object.defineProperty(obj, 'x', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: 1
    });

    // 객체의 y 속성을 non-enumerable 로 정의한다.
    Object.defineProperty(obj, 'y', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: 2
    });

    // 확장할 객체 원형의 z 속성을 enumerable 로 정의한다.
    Object.defineProperty(obj.constructor.prototype, 'z', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: 3
    });

    // 확장할 객체 원형의 t 속성을 non-enumerable 로 정의한다.
    Object.defineProperty(obj.constructor.prototype, 't', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: 4
    });

    // getOwnPropertyNames 메서드를 통해 자신이 소유한 속성들을 순회한다.
    Object.getOwnPropertyNames.call(Object, obj).forEach(function(prop){

        // propertyIsEnumerable 메서드를 통해 해당 속성의 enumerable 유/무를 반환한다.
        if (!Object.propertyIsEnumerable.call(obj, prop)){

            // non-enumerable 속성만을 가져온다.
            console.log('non-enumerable property: ' + prop); // non-enumerable property: y
            // getOwnPropertyDescriptor 메서드를 통해 속성에 내용을 기술한다.
            console.log(Object.getOwnPropertyDescriptor(obj, prop)); // y property descriptor
        }
    });
    ```

## 2. 참고 사이트

- 아래 **페이지**에서 **enumerability** 관련 메서드들을 정리한 **라이브러리**를 제공하고 있다.(관련 소스 작성 시 반드시 **참고**하기 바란다)

	- [Enumerability and ownership of properties](https://developer.mozilla.org/ko/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
