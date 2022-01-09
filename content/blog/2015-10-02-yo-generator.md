---
layout: post
title: "Yeoman-Generator"
description: "Yeoman Generator API 사용방법"
date:   2015-10-16
categories: [generator]
tags: [generator]
---

## 1. 문서 내용에 대해

- 이 문서에서는 **Yeoman** 을 통해 자신만의 **app generator** 모듈을 생성하는 방법에 대해 알아볼 것이다.

- **Yeoman** 은 [공식 홈페이지](http://yeoman.io/)를 통해, 이를 시작하기 위한 내용을 제공하고있다.

	- [WRITING YOUR OWN YEOMAN GENERATOR](http://yeoman.io/authoring/)

- 이 문서의 내용은 **MAC 환경**을 기준으로 작성되어있다.

## 2 app generator 개발 환경 구축

- [generator-generator](https://github.com/yeoman/generator-generator) 모듈은 사용자가 자신만의 **app generator** 모듈을 개발할때, 그 기반 설계를 도와주는 **Yeoman generator** 모듈 중 하나이다.

	- 반드시 이 구조를 따라갈 필요는 없겠지만, **generator-generator** 모듈은 어차피 <u>기본 골격만 제공하므로,</u> 해당되는 부분에 대해서는 동일하게 따라가도 좋을 듯 하다.

- **generator-generator** 모듈을 설치한다.
  
    ```javascript
    sudo npm install -g generator-generator
    ```

- 설치된 **generator-generator** 모듈을 통해 생성할 **app generator** 모듈의 <u>**기반**을 생성한다</u>.

    ```javascript
     yo generator
    ```

	![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_1.jpg)

- 생성할 **app generator** 모듈의 **[base-name]** 을 위와 같이 **입력** 후 설치를 완료하면, 입력한 **[base-name]** 을 기준으로 현재 위치에 **app generator** 모듈 폴더(<span style="color:#c11f1f">./generator-cmtech</span>)가 생성된다.

	- [base-name]: <span style="color:#c11f1f">cmtech</span>

	![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_2.jpg)

- 생성된 **app generator** 모듈 폴더(<span style="color:#c11f1f">./generator-cmtech</span>) **이름**은 아래와 같은 형식으로 **생성**되며, **Yeoman** 은 이후 <code>yo [base-name]</code> 명령 실행 시 이 **[base-name]** 이 기준이된 **app generator** 모듈 폴더를 File system 상에서 찾아 실행하게될것이다.

	- 생성된 **app generator** 모듈 폴더 이름: generator-<span style="color:#c11f1f">[base-name]</span>

	- **app generator** 모듈 설치 명령: yo <span style="color:#c11f1f">[base-name]</span>

- 개발중인 **app generator** 모듈을 **링크**를 통해 설치한다.

	- 정확히 말하면 **사용자 시스템**의 **global node module** 위치에, 개발중인 **app generator** 모듈(<span style="color:#c11f1f">./generator-cmtech</span>) 폴더의 **링크**를 만들어, <u>**npm** 모듈을 설치하는것과같은, 환경을 만들어주는것이다.</u>

	- 먼저 **global node module**(<span style="color:#c11f1f">/usr/local/lib/node_modules</span>) 위치로 이동하여, 생성된 **app generator** 모듈 폴더를 **링크** 한다.

        ```javascript
          // global node module 위치로 이동한다.
          cd /usr/local/lib/node_modules
      
          // app generator 모듈 폴더를 심볼릭 링크한다.
          sudo ln -s /Users/sgjeon/htdocs/gitrepos/generator-cmtech generator-cmtech
        ```

        그 다음 **npm list** 명령을 통해 **app generator** 모듈이 제대로 **설치**(<span style="color:#c11f1f">링크</span>)되었는지 확인해본다.
      
        ![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_4.jpg)

        확인되었다면, <code>yo [base-name]</code> 명령을 통해, **app generator** 모듈이 제대로 설치되는지 확인한다.
      
        ![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_5.jpg)

## 3. app generator 개발 포인트

- **package.json** 파일 설정

	- 아래는 **app generator 모듈** 폴더안의 **package.json** 파일 내용이다.

      ```javascript
      {
        "name": "generator-cmtech",
        "version": "0.0.0",
        "description": "cmtech generator",
        "license": "MIT",
        "main": "app/index.js",
        "repository": "mohwa/generator-cmtech",
        "author": {
        "name": "mucha",
        "email": "",
        "url": "https://github.com/mohwa"
        },
        "scripts": {
        "test": "mocha"
        },
        "files": [
        "generators"
        ],
        "keywords": [
        "yeoman-generator"
        ],
        "dependencies": {
        "yeoman-generator": "^0.19.0",
        "chalk": "^1.0.0",
        "yosay": "^1.0.2"
        },
        "devDependencies": {
        "mocha": "*"
        }
      }
      ```

	- **name** property 는 반드시 <span style="color:#c11f1f">generator-</span> 라는 **접두사**를 가져야한다.

		- 예: <span style="color:#c11f1f">generator-</span>cmtech

	- **Yeoman** 에서 제공하는 [generator-page](http://yeoman.io/generators/) 에 listed 되기 위해서는 **keywords** property 와 **description** property 를 반드시 서술해야한다.

		- **keywords** property 에는 예제와 같이 "**yeoman-generator**" 를 할당해준다.

- **Folder tree**

	- **Yeoman** 은 아래와 같은 두 가지 **폴더 구조**를 제공하고있다.

	- <span style="color:#c11f1f">./</span> 폴더 내부로 가용한 **default generator** 및 **sub-generator** 를 만들어내는 구조
    
        ```javascript
        ├───package.json
        ├───app/
        │   └───index.js
        └───router/
          └───index.js
        ```

	- <span style="color:#c11f1f">./generators</span> 폴더 내부로 가용한 **default generator** 및 **sub-generator** 를 만들어내는 구조(개인적으로 이 **폴더 구조**를 선호한다)

        ```javascript
        ├───package.json
        └───generators/
          ├───app/
          │   └───index.js
          └───router/
            └───index.js
        ```

	- **default generator** 및 **sub-generator** 호출 방법

		- **default generator** 호출 방법

			- <code>yo <span style="color:#c11f1f">[base-name]</span></code> **명령**으로 실행하며, 이로인해 **./generators/app/** 디렉토리 안의 <span style="color:#c11f1f">index.js</span> 파일이 호출된다.

			- 예: yo <span style="color:#c11f1f">cmtech</span>

		- **sub-generators** 호출 방법

			-  <code>yo [base-name]:<span style="color:#c11f1f">[sub-command]</span></code> **명령**으로 실행하며, 이로인해 **./generators/[sub-command]/** 디렉토리 안의 <span style="color:#c11f1f">index.js</span> 파일이 호출된다.

			- 예: yo cmtech:<span style="color:#c11f1f">router</span>

- **base generator** 확장하기

	- <span style="color:#c11f1f">yeoman-generator</span> **모듈**을 통해 **base generator** 를 생성할 수 있으며, 이것을 **확장**하여 자신만의 **app generator** 모듈 기능을 만들어낸다.

      ```javascript
    
      // app/index.js 내부
    
      // base generator 를 생성한다.
      var generators = require('yeoman-generator');
    
      // base generator 를 확장한다.
      module.exports = generators.Base.extend({
    
          constructor: function () {
    
          generators.Base.apply(this, arguments);
    
          // This makes `appRootFolder` a required argument.
          this.argument('appRootDir', { type: String, required: true });
    
          }
      });
      ```
- [Overwriting](http://blog.naver.com/aron01/60006767632)(기존 **property** 를 다시쓰는 행위) the constructor

	- 특정 **generator** 메서드들은 **constructor function** 내부에서만 호출해야한다. 만약 그렇지 않을경우, 해당 **기능**이 완벽히 수행되지 않을 수 있다.

	- 예를들어, 사용자가 **Command Line** 을 통해 입력한 **arguments** 를 처리하는 <span style="color:#c11f1f">this.argument</span> 메서드 **호출** 시, <u>해당 코드가 호출되는 **위치**에 따라 다른 **결과**를 반환되게된다.</u>

	- 먼저 **테스트**위해 <code>yo cmtech --help</code> 명령을 실행한다.

        ```javascript
        // cmtech generator 를 --help 옵션과 함께 실행한다.
        yo cmtech --help
        ```

	- argument 메서드가 **constructor function** 내부에서 호출된 경우.

        ```javascript
        // base generator 를 확장한다.
        module.exports = generators.Base.extend({
      
            constructor: function () {
      
            generators.Base.apply(this, arguments);
      
            // This makes `appRootFolder` a required argument.
            this.argument('appRootDir', { type: String, required: true });
      
            }
        });
        ```

        **Yeoman** 이 **arguments** 에 대한 상세 **도움말**을 제공해준다.
      
        ![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_6.jpg?1)
      
        argument 메서드가 **constructor function** 외부에서 호출된 경우.
      
        ```javascript
        // base generator 를 확장한다.
        module.exports = generators.Base.extend({
      
            initializing: function(){
            this.argument('appRootDir', { type: String, required: true });
            }
        });
        ```
      
        **arguments** 에 대한 **도움말**이 제공되지 않는다.
      
        ![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_7.jpg?1)

- **GENERATOR RUNTIME CONTEXT**

	- The **run loop**

		- **Yeoman** 은 **run loop** 라는 **queue system** 을 가지며, 이것은 실행하려는 <u>메서드 **그룹**</u>에 대한 **우선 순위**를 제공해준다.

			- 또한 **run loop** 다루기위해 [Grouped-queue](https://github.com/SBoudrias/grouped-queue) 라는 모듈을 사용하고있다.

		- 이 **우선 순위**는 **Yeoman** 이 제공하는 <u>특별한 프로토타입 **메서드 이름**(<span style="color:#c11f1f">priority name</span>)</u>으로만 사용된다.

			- **Yeoman** 이 제공하는 <span style="color:#c11f1f">priority name</span> 리스트는 아래와 같다.

			![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_11.jpg?1)

		- <span style="color:#c11f1f">priority name</span> 일 경우.

            ```javascript
            'use strict';
            var yeoman = require('yeoman-generator');
            var chalk = require('chalk');
            var yosay = require('yosay');
        
            module.exports = yeoman.generators.Base.extend({
        
              initializing: {
              init: function() {
                console.log('call by init method 1');
              },
              end: function(){
                console.log('call by end method 2');
              }
              }
            });
            ```

		- 정의된 **메서드** 그룹이 전부 실행된다.

    		![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_8.jpg?1)

		- <span style="color:#c11f1f">priority name</span> 이 아닐경우.

            ```javascript
            'use strict';
            var yeoman = require('yeoman-generator');
            var chalk = require('chalk');
            var yosay = require('yosay');
        
            module.exports = yeoman.generators.Base.extend({
        
              custom_method: {
              init: function() {
                console.log('call by init method 1');
              },
              end: function(){
                console.log('call by end method 2');
              }
              }
            });
        
            ```
		
            정의된 **메서드**가 실행되지 않는다.
        
            ![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_9.jpg?1)

            또한 <span style="color:#c11f1f">priority name</span> 이 아닐경우, 아래와 같이 **Object** 가 아닌 **Function** 타입으로 정의해야한다.
        
            ```javascript
            'use strict';
            var yeoman = require('yeoman-generator');
            var chalk = require('chalk');
            var yosay = require('yosay');
        
            module.exports = yeoman.generators.Base.extend({
                custom_method: function(){
                console.log('call by custom_method method');
                }
            });
        
            ```
            ![](http://mohwa.github.io/blog/assets/images/posts/20151002/yeoman_10.jpg?1)
        
            [http://yeoman.io/authoring/running-context.html](http://yeoman.io/authoring/running-context.html)

- **Template** 엔진 사용하기

	- **Yeoman** 은 [ejs template](http://ejs.co/) 엔진을 사용하며, [copyTpl](https://github.com/sboudrias/mem-fs-editor#copytplfrom-to-context-settings) 메서드와 같은 템플릿 관련 메서드들을 제공하고 있다.

		- [http://yeoman.io/generator/actions_actions.html](http://yeoman.io/generator/actions_actions.html)

        - 아래 코드는 **메서드** 사용에 대한 간단한 **예제**이며, **.html** 파일외에, **APP** 을 구성하는 기반 파일인 **_package.json** 또는 **_gruntfile.js** 와 같은 파일에도 동일하게 적용할 수 있다.
      
            ```javascript
            generators.Base.extend({
                writing: function () {
                this.fs.copyTpl(
                  this.templatePath('index.html'),
                  this.destinationPath('public/index.html'),
                  { title: 'Templating with Yeoman' }
                );
                }
            });
          ```
	- template 엔진을 통해 아래와 같이 **출력**된다.

        ```html
        <html>
          <head>
          <title>Templating with Yeoman</title>
          </head>
        </html>
        ```
	- 추가적으로 **의존성**을 관리하는 파일인 **_bower.json** 파일에 적용된 내용이다.

        ```javascript
        <% var ngVer = "1.2.26" %>
        {
          "name": "<%= env.appName %>",
          "description": "<%= env.appName %> package manager",
          "homepage": "http://www.cmt-korea.com/",
          "author": {
          "name": "sgjeon"
          },
      
          "ignore": [
          "**/.*",
          "node_modules",
          "bower_components"
          ],
          "dependencies": {
          },
          "devDependencies": {
          "angular": "<%= ngVer %>",
          "angular-animate": "<%= ngVer %>",
          "angular-cookies": "<%= ngVer %>",
          "angular-route": "<%= ngVer %>",
          "angular-resource": "<%= ngVer %>",
          "angular-sanitize": "<%= ngVer %>",
          "requirejs": "2.1.14",
          "jquery": "2.1.1",
          "malihu-custom-scrollbar-plugin": "3.0.8",
          "jquery-ui": "1.11.2",
          "json3": "3.3.2",
          "linqjs": "",
          "xml2json": "",
          "purl": "2.3.1",
          "jquery-mousewheel": "3.0.6",
          "socket.io-client": "1.3.5",
          "console.image": "",
          "enquire": "2.1.2",
          "angular-local-storage": "0.1.5",
          "matchMedia": "0.2.0",
          "jquery.browser": "0.0.7"
          }
        }
        ```
- 전역 **configurations** 파일 관리하기

	- **Yeoman** 은 숨김 파일인 **.yo-rc.json** 파일을 통해 전역 **configurations** 을 관리할 수 있으며, 또 그것을 관리하기 위한 [Yeoman Storage API](http://yeoman.io/generator/Storage.html) 를 제공하고있다.

	- 아래는 기본적인 **.yo-rc.json** 파일 구조이다.

      ```javascript
      {
        "generator-cmtech": {
          "key": "value"
        }
      }
      ```

## 4. 정리하며

- 아래 URL 은 현재 개발중인 사이트(**AngularJS** 사용)의 **app generator** 초기 버전이며, **설계**시 참고할 수 있을 듯하여 공유드립니다.(현재는 테스트 버전입니다)

	- [generator-cmtech](https://github.com/mohwa/generator-cmtech)

	- [Yeoman generator API documentation](http://yeoman.io/generator/)
