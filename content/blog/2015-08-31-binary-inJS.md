---
layout: post
title: "JavaScript 를 통해 Binary Data 조작하기"
description: "JavaScript 를 통해 Binary Data 조작하기"
date:   2015-08-31
categories: JavaScript
#tags: [JavaScript]
---

## 1. 사전 지식

- **Blob**

	- 정의
		- **Blob** 는 일반적으로 미디어(이미지, 사운드, 비디오) 파일과 같은 큰 용량의 파일을 말한다.

	- Blob Object

		- Blob Object 는 File 과 같은 **불변 객체**를 나타내며, **raw data** 를 가진다.

			- 추가로 <span style="color:#6298c1">File 인터페이스</span> 는 **Blob 인터페이스** 의 모든 특성들을 상속받는다.

			![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_1.jpg)

	- [Blob API in MDN](https://developer.mozilla.org/en/docs/Web/API/Blob)
	- [Blob in Terms](http://www.terms.co.kr/BLOB.htm)
	- [Blob in Can I Use](http://caniuse.com/#search=blob)

- **JavaScript Typed Array**

	- 정의

		- **Typed Array** 는 raw binary data 에 접근하기 위한 방법을 제공한다.

			- *즉 자바스크립트로 <span style="color:#c11f1f">binary data</span> 를 다루기 위해 사용한다.*

		- **유연성**과 **효율성**을 위해 <span style="color:#c11f1f">buffer</span> 와 <span style="color:#c11f1f">view</span> 로 나눠 구현되어있다.

			- buffer

				- <span style="color:#6298c1">ArrayBuffer</span> 는 고정된 크기의 raw binary data 를 나타내기 위해 사용된다.
				- <span style="color:#6298c1">ArrayBuffer</span> 클래스 통해 생성된  <span style="color:#c11f1f">buffer</span> 는 <strong>데이터 청크</strong>를 나타내는 객체이다.

					``` javascript
					// 12 bytes buffer 나타낸다
					var buffer = new ArrayBuffer(12);
					```

				- <span style="color:#c11f1f">buffer</span> 는 <u>저장된 <strong>데이터</strong>를 접근하기 위한 방법을 제공하지 않는다.</u>

				- 데이터를 다루기 위해서는 반드시 <span style="color:#c11f1f">view</span> 를 사용해야한다.

			- view

				- DataView

					<span style="color:#6298c1">DataView</span> <span style="color:#c11f1f">view</span> 는 <span style="color:#c11f1f">buffer</span> 에 저장된 데이터로 부터 값을 <strong>읽고</strong>, <strong>쓰기</strong> 위한 <span style="color:#6298c1">low-level 인터페이스</span> 를 제공한다.(getter/setter API 제공)

					```javascript
					// 12 bytes byffer
					var buffer = new ArrayBuffer(12);
					// view 를 생성한다.
					var view = new DataView(buffer, 2, 2);

					// 해당 view 가 시작하는 위치를 반환한다.
					console.log(view.byteOffset); // 2
					```

					데이터를 다루기위한 DataView 의 특성들은 아래와 같다.

					![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_4.jpg)

				- <span style="color:#6298c1">Typed Array Views</span>

					<span style="color:#6298c1">DataView</span> 를 상속한 아래 <strong>클래스</strong>들을 통해 <span style="color:#c11f1f">buffer</span> 에 저장된 데이터를 다룰 수 있게된다.

					<strong>Int8Array</strong>, <strong>Uint8Array</strong>, <strong>Int32Array</strong>, <strong>Uint32Array</strong> 등 ...

					위 클래스 중 <span style="color:#6298c1">Int32Array</span> 를 통해 생성된 <span style="color:#c11f1f">view</span> 는 아래와 같은 특성들을 가지게된다.

					![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_3.jpg)

					아래 그림은 각 <span style="color:#c11f1f">view</span> 에 따라 나눠지는 메모리 공간을 나타낸다.

					![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_2.jpg)

					```javascript
					/*

					ArrayBuffer(20 bytes)
					8bit == 1 byte

					ArrayBuffer / 1 byte = 20;

					 */
					var buffer = new ArrayBuffer(20);
					// 부호 없는 1 byte 정수 배열
					var uint8View = new Uint8Array(buffer);

					console.log(uint8View.length); // 20

					/*

					 ArrayBuffer(20 bytes)
					 32bit == 4 byte

					 ArrayBuffer / 4 byte = 5;

					 */

					var buffer = new ArrayBuffer(20);
					// 부호 없는 4 byte 정수 배열
					var uint32View = new Uint32Array(buffer);

					console.log(uint32View.length); // 5
					```

					unsigned or signed view test

					```javascript
					// unsigned int 8(1 bytes)

					var buffer = new ArrayBuffer(20);
					var uint8View = new Uint8Array(buffer);

					// 0 ~ 255(unsigned int 8(1 bytes) 로 표현 가능한 수)
					uint8View[0] = 0;
					uint8View[1] = 255;

					console.log(uint8View); // [0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

					// signed int 8(1 bytes)

					var buffer = new ArrayBuffer(20);
					var int8View = new Int8Array(buffer);

					// -127 ~ 128(signed int 8(1 bytes) 로 표현 가능한 수)

					// signed 의 경우 부호(양수/음수)를 나타내기 위해 총 8bit 중 1 비트(0: 양수, 1: 음수) 사용하기 때문에, 나머지 7bit(-127 ~ 128(표현 가능한 수))를 통해 숫자를 표현하게 된다.

					int8View[0] = -128;
					int8View[1] = 127;

					console.log(int8View); // [-128, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

					// unsigned int 16(2 bytes)
					var buffer = new ArrayBuffer(20);
					var uint16View = new Uint16Array(buffer);

					// 0 ~ 65535(unsigned int 16(2 bytes) 로 표현 가능한 수)
					uint16View[0] = 65535;

					console.log(uint16View); // [65535, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					```
		- [ArrayBuffer](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

		- [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

		- [DataView API Test](http://www.javascripture.com/DataView)

		- [JavaScript Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)

		- [JavaScript Typed Arrays(번역)](http://ohgyun.com/418)

		- [signed 와 unsigned 의 차이](http://firejune.com/1791/)

		- [signed 가 음수 표현하는 방법(상세 설명)](http://air802.tistory.com/52)

		- [나는 unsigned 가 싫어요](http://libsora.so/posts/i-hate-unsigned/)

		- [signed or unsigned 자료형의 범위](http://blog.naver.com/dud5243_/220415835594)

		- [Binary Convert](http://www.binaryconvert.com/index.html)

- **Little-Endian or Big-Endian**

	- 정의

		- <span style="color:#6298c1">Endian</span> 은 컴퓨터에서 데이터가 저장되는 순서(<span style="color:#c11f1f">byte order</span>)를 말한다.

		- ![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_5.jpg)

		- 정리:

			- 메모리는 <span style="color:#c11f1f">하위 주소</span>에서 <span style="color:#c11f1f">상위 주소</span>로 데이터가 저장된다.

			- <span style="color:#c11f1f">Little Endian</span>: <span style="color:#6298c1">하위 바이트</span>부터 데이터가 저장되는 방식.

				- <span style="color:#c11f1f">Little Endian</span> 방식의 장점: 산술연산유닛(ALU)에서 메모리를 읽는 방식이 메모리 주소가 낮은 쪽에서부터 높은 쪽으로 읽기 때문에 산술 연산의 수행이 더 쉽다.(*연산 처리 과정에서 이런 장점이 있는 정도로만 알고 넘어가자...*)

			- ![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_6.jpg)

			- <span style="color:#c11f1f">Big Endian</span>: <span style="color:#6298c1">상위 바이트</span>부터 데이터가 저장되는 방식.

			- ![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_7.jpg)

	- 적용 이유:

		- 각 <u>**CPU**(Intel / Spac) **타입**에 따라 <span style="color:#6298c1">차이</span>를 보이는 <span style="color:#c11f1f">byte order</span>(**데이터 저장 순서**)</u>는, 동일한 시스템 안에서만 데이터를 주고 받는다면, <span style="color:#c11f1f">Endian</span> 에 대해 전혀 신경쓸 필요가 없지만, <u><span style="color:#6298c1">이기종간</span>에 데이터를 주고 받을 경우</u>, 서로간의 **데이터 저장 방식 차이**로 인해 전혀 엉뚱한 결과를 반환하게 된다.

	- 서로 다른 Endian 간의 데이터 통신 해결책:

		- 공통되는 Endian(<u>약속된 <span style="color:#c11f1f">Endian</span> 규칙</u>)으로 <span style="color:#6298c1">변환</span> 후, 데이타를 주고/받는 방법.

			- 즉 서로간에 사용할 **Endian**(<span style="color:#c11f1f">Little Endian</span> or <span style="color:#c11f1f">Big Endian</span>) 을 하나로 통일시켜 데이터를 주고 받는 것이다.

		- 또 하나의 방법은 <span style="color:#c11f1f">byte order</span>(바이트 저장 순서) 를 신경쓸 필요가 없는, **데이터 타입**을 사용하는 것이다. <span style="color:#c11f1f">char</span> 타입은 **1byte** 의 크기를 가지기때문에, <span style="color:#c11f1f">byte order</span> 에 대해 전혀 신경쓸 필요가 없다. 예를 들면 12345678 을 int 형으로 보내는 대신 **문자열** "12345678" 로 변환시켜 <span style="color:#6298c1">전송</span>하면 된다.

	- [엔디언](https://ko.wikipedia.org/wiki/%EC%97%94%EB%94%94%EC%96%B8)

	- [Little-Endian or Big-Endian(개념 잡기 좋은 문서)](http://t3zz-so4.tistory.com/entry/Little-Endian-Big-Endian)

	- [Little-Endian or Big-Endian 개념](http://firejune.com/1790)

	- [Endian 에 대해서](http://www.joinc.co.kr/modules/moniwiki/wiki.php/Site/Network_Programing/Documents/)



## 2. JavaScript 를 통해 Binary Data 조작하기

- <span style="color:#6298c1">예제 소스</span>에서는 **NodeJS** 및 **Socket.IO** 와 관련된 내용은 최대한 배제 하였습니다.(특별히 포스트 내용과 관련 없다고 판단한 내용)

- **파일 업로드**

	- <span style="color:#6298c1">File</span> 및 <span style="color:#6298c1">FileReader API</span> 를 지원하는 브라우저를 통해 파일 업로드 기능을 만들 수 있다.

		- 하지만 *IE(10/11 포함) 브라우저는 지원하지 않는다고 보면된다.*

		- Source Example

			- Cliend Side(use JS)

			- 먼저 저장소로 부터 내려받은 파일을 include 한다.

				```javascript
				<script src="siofu_client.js"></script>
				```
				```javascript
				// socket 서버에 연결
				var socket = io.connect('http://localhost:9090');

				// socket 객체를 SocketIOFileUpload 클래스로 전달한다.
				var uploader = new SocketIOFileUpload(socket);

				// listenOnSubmit 메서드에 input[type="button"] 및 input[type="file"] Element 를 전달한다.
				uploader.listenOnSubmit($('#btn_upload').get(0), $('#siofu_input').get(0));

				// KiB === byte 단위
				// KB === KByte 단위

				// 한번에 로드될 chunks 파일 사이즈
				// chunkSize 를 0으로 할당하면, chunk 를 사용하지 않게 된다.
				uploader.chunkSize = 1024 * 100; // 102400 byte 로 chunk 단위를 나눈다.

				uploader.addEventListener("start", function(event){
					console.log('started upload of file');
				});

				// progress 이벤트를 통해 현재 진행 상황을 볼 수 있다.
				uploader.addEventListener("progress", function(event){
					var percent = event.bytesLoaded / event.file.size * 100;
					console.log("File is", percent.toFixed(2), "percent loaded");
				});

				// 파일 업로드가 끝날을때 이벤트가 발생한다.
				uploader.addEventListener("complete", function(event){
					console.log('completed file upload');
				});
				```
			- Server Side(use nodeJS)

			```javascript
				var uploader = new siofu();
				uploader.dir = "uploads";
				uploader.listen(socket);

				// Do something when a file is saved:
				uploader.on("saved", function(event){
					console.log(event.file);
				});

				// Error handler:
				uploader.on("error", function(event){
					console.log("Error from uploader", event);
				});
			```

		- 참고 사이트

			[socket io file upload module](https://github.com/vote539/socketio-file-upload#instancelistenoninputinput)

			[File API](http://caniuse.com/#search=file%20api)

			[FileReader API](http://caniuse.com/#search=FileReader)

- **이미지 효과**

	- 서버에서 내려받은 <span style="color:#6298c1">ArrayBuffer</span>(**이미지** 데이터) 로 <span style="color:#c11f1f">view</span>(uInt8Array) 를 생성 후, 버퍼에 저장된 데이터를 조작한다.

	- Source Example

		- Cliend Side(use JS)

			```javascript

			var cw = 327;
			var ch = 125;

			// canvas Element 를 가져온다.
			var canvas = document.querySelector('canvas');

			// context 를 생성한다.
			var ctx = canvas.getContext('2d');

			// view(부호 없는 1byte 정수 배열)를 생성한다.
			var uInt8Array = new Uint8Array(payload.buffer);

			// view를 통해 Blob Object 를 생성한다.
			var blob = new Blob([uInt8Array], {type: 'image/jpeg'});

			var originalImgData = null;

			// Blob Object를 참조하는 URL를 생성한다.
			var url = URL.createObjectURL(blob);
			var img = new Image;

			// 이미지 로드 이벤트
			$(img).bind('load', function(){
				canvas.width = img.width;
				canvas.height = img.height;

				// 캔버스에 해당 이미지를 그린다.
				ctx.drawImage(img, 0, 0, img.width, img.height);

				// 각 px 에 대한 정보(r,g,b,a)가 담긴 이미지 데이터를 가져온다.
				originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

				// 반전 효과를 준다.
				// invert();

				// 흑백 효과를 준다.
				empty();
			});

			// Blob 객체를 참조하는 URL을 img.src 에 할당 후 로드한다.
			img.src = url;

			// px 단위의 이미지 데이터를 조작하여, 반전 효과를 준다.
			function invert(){

				originalImgData = ctx.getImageData(0, (canvas.height / 2), canvas.width, canvas.height);
				var data = originalImgData.data;

				for (var i = 0; i < data.length; i += 4) {

					data[i] = 255 - data[i];     // red
					data[i + 1] = 255 - data[i + 1]; // green
					data[i + 2] = 255 - data[i + 2]; // blue
				}

				ctx.putImageData(originalImgData, 0, (canvas.height / 2));
			};

			// px 단위의 이미지 데이터를 조작하여, 흑백 효과를 준다.
			function empty(){

				originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				var data = originalImgData.data;

				for (var i = 0; i < data.length; i += 4) {

					// 각 픽셀의 밝기만 조사하여 R, G, B 색상 요소를 균일하게 만들면 회색이 된다.(색상 정보를 아래 공식(각 요소(R, G, B)가 밝기에 미치는 영향은 29:58:11로 전문가에 의해 계산되어 있다)으로 R,G,B 요소에서 제거한다)

					// 128 이상은 흰색으로, 128 이하는 검정색으로 만들어 버림으로써, 흰색과 검정색 두 가지만 남긴다. 경계값인 128을 조정하면 밝기가 달라진다.
					var gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;

					if (gray > 128){
						gray = 255;
					}
					else{
						gray = 0;
					}

					data[i] = gray;     // red
					data[i + 1] = gray; // green
					data[i + 2] = gray; // blue
				}

				ctx.putImageData(originalImgData, 0, 0);
			};
			```

		- Server Side(use nodeJS)

			```javascript
			var fs = require('fs');

			// 파일을 읽은 후 클라이언트로 버퍼를 전달한다.
			fs.readFile('./lib/img/nmms_20823487.jpg', function (err, buf) {
				// it's possible to embed binary data
				// within arbitrarily-complex objects
				socket.emit('onSocketMsg', {
					type: 'resultImageData',
					payload: {
						buffer: buf
					}
				});
			});
			```

	- 적용 결과

		- 원본 이미지

			![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_8.jpg)

		- invert 함수 적용 이미지

			![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_9.jpg)

		- empty 함수 적용 이미지

			![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_10.jpg)

	- 참고 사이트

		- [생성된 Blob 객체 확인(in Chrome)](chrome://blob-internals/)

		- [Blob URLs](http://caniuse.com/#search=createObjectURL)

		- [EXIF(이미지 정보) IN JS](http://code.flickr.net/2012/06/01/parsing-exif-client-side-using-javascript-2/)

		- [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)

		- [Pixel manipulation in canvas(이미지 효과에 대한 예제 및 자세한 설명)](http://www.phpied.com/pixel-manipulation-in-canvas/)

		- [이미지 데이터 효과(한글 문서)](http://www.soen.kr/html5/html3/3-2-2.htm)

- **ArrayBuffer 로 내려받은 비디오 플레이**

	- 서버에서 내려받은 <span style="color:#6298c1">ArrayBuffer</span>(**영상** 데이터) 로 <span style="color:#c11f1f">view</span>(in Typed Array Views) 를 생성 후, 버퍼에 저장된 데이터를 조작한다.

		- **영상** 및 오디오 데이터의 경우, <span style="color:#c11f1f">브라우저 지원 여부</span> 및 <span style="color:#c11f1f">지원 포맷</span>에 대해 반드시 확인해봐야한다.

		- 아래 소스는 <span style="color:#6298c1">Chrome</span> 브라우저에서 <strong>`*`.mp4</strong> 및 <strong>`*`.webm</strong> 포맷으로만 테스트되었습니다.

	- Source Example

		- Cliend Side(use JS)

			```javascript
			var vw = 327;
			var vh = 125;

			// video Element 를 가져온다.
			var video = document.querySelector('video');
			video.width = vw;
			video.height = vh;

			// view(부호 없는 1byte 정수 배열)를 생성한다.
			var uInt8Array = new Uint8Array(payload.buffer);

			// view를 통해 Blob Object 를 생성한다.
			var blob = new Blob([uInt8Array], {type: 'video/webm'});
			//var blob = new Blob([uInt8Array], {type: 'video/mp4'});

			// Blob Object를 참조하는 URL 를 생성한다.
			var url = URL.createObjectURL(blob);

			// Blob 객체를 참조하는 URL을 video.src 에 할당 후 로드한다.
			video.src = url;
			```
		- Server Side(use nodeJS)

			```javascript
			fs.readFile('redcliff450.webm', function (err, buf) {
				socket.emit('onSocketMsg', {
					type: 'resultVideoData',
					payload: {
						buffer: buf
					}
				});
			});
			```

- **Chunk 방식으로 내려받은 비디오 플레이**

	- 서버에서 Chunk 방식으로 내려받은 <span style="color:#6298c1">ArrayBuffer</span>(**영상** 데이터) 로 <span style="color:#c11f1f">view</span>(in Typed Array Views) 를 생성 후, 버퍼에 저장된 데이터를 조작한다.

	- <span style="color:#6298c1">MediaSource API</span> 를 통해 내려받은 영상 데이터를 조작할 수 있다.

	- **영상** 및 오디오 데이터의 경우, <span style="color:#c11f1f">브라우저 지원 여부</span> 및 <span style="color:#c11f1f">지원 포맷</span>에 대해 반드시 확인해봐야한다.

	- 아래 소스는 <span style="color:#6298c1">Chrome</span> 브라우저에서 <strong>`*`.webm</strong>(vorbis 및 vp8 코덱) 포맷으로만 테스트되었습니다.

	- Source Example

		- Cliend Side(use JS)

		- 저장소로 부터 내려받은 파일을 include 한다.

			```javascript
			<script src="socket.io-stream.js"></script>
			```

			```javascript
			// stream 메서드에 socket 객체를 전달 후 해당 이벤트를 바인딩한다.
			ss(socket).on('onSocketMsg', function(data) {

				data = data || {};

				var type = data.type;
				var payload = data.payload;

				if (type === 'resultChunkVideoData') {

					var vw = 1024;
					var vh = 768;

					// video Element 를 가져온다.
					var video = document.querySelector('video');
					video.width = vw;
					video.height = vh;

					console.log(payload.stream); // 내려받은 stream 데이터

					// MediaSource 객체를 생성한다.
					var ms = new MediaSource();

					// MediaSource 객체를 참조하는 URL 를 생성한다.
					var url = URL.createObjectURL(ms);

					// MediaSource 객체를 참조하는 URL을 video.src 에 할당 후 로드한다.
					video.src = url;

					// MediaSource 객체에 각 이벤트를 바인딩 시킨다.
					ms.addEventListener('sourceopen', callback, false);
					// ms.addEventListener('webkitsourceopen', callback, false);
					ms.addEventListener('sourceended', function(e) {
						console.log('mediaSource readyState: ' + this.readyState);
					}, false);

					function callback() {

						// 재생하려는 영상 소스를 추가한다.
						var sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp8"');
						// var sourceBuffer = ms.addSourceBuffer('video/webm; codecs="vp8,vorbis"');

						sourceBuffer.addEventListener('updatestart', function (e) {
							// console.log('updatestart: ' + ms.readyState);
						});

						sourceBuffer.addEventListener('update', function () {
							// console.log('update: ' + ms.readyState);
						}, false);

						sourceBuffer.addEventListener('updateend', function (e) {
							console.log('updateend: ' + ms.readyState);
						});
						sourceBuffer.addEventListener('error', function (e) {
							console.log('error: ' + ms.readyState);
						});
						sourceBuffer.addEventListener('abort', function (e) {
							console.log('abort: ' + ms.readyState);
						});

						payload.stream.on('data', function (data) {

							// chunk data
							console.log(data);

							// 버퍼에 내려받은 스트림 데이터를 할당한다.
							sourceBuffer.appendBuffer(data);

						});

						// 데이터 전송이 완료되었을 경우 발생한다.
						payload.stream.on('end', function () {
							console.log('endOfStream call');
							// 스트림을 종료한다.
							ms.endOfStream();
						});
					}
				}
			});
			```

		- Server Side(use nodeJS)

			```javascript

			var ss = require('socket.io-stream');

			ss(socket).on('onSocketMsg', function(data) {

					data = data || {};

					var type = data.type;
					var payload = data.payload;

					var stream = ss.createStream();

					if (type === 'downloadChunkVideo') {

						// webm 포맷의 영상을 가져온다.
						var filename = path.basename('feelings_vp9-20130806-244.webm');
						// 파일 스트림을 생성한다.
						fs.createReadStream(filename).pipe(stream);

						ss(socket).emit('onSocketMsg', {
							type: 'resultChunkVideoData',
							payload: {
								stream: stream
							}
						});
					}
				});
			```

		- 테스트 결과

			![](http://mohwa.github.io/blog/assets/images/posts/bytesManipulation_11.jpg)

	- 참고 사이트

		- Stream 모듈: [socket.io-stream](https://github.com/nkzawa/socket.io-stream)
		- [WebM](https://ko.wikipedia.org/wiki/WebM)

		- [자바스크립트에서의 BLOB 객체](http://firejune.com/1788/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98+BLOB+%EA%B0%9D%EC%B2%B4?stext=blob)

		- [Mediasource](http://html5-mediasource-api.googlecode.com/svn/tags/0.1/draft-spec/mediasource-draft-spec.html)

		- [MediaSource in MDN](https://developer.mozilla.org/ko/docs/Web/API/MediaSource)

		- [MediaSource Object in MS](https://msdn.microsoft.com/en-us/library/dn254959(v=vs.85).aspx)

		- [Media Source Extensions (MSE)](https://msdn.microsoft.com/en-us/library/dn594470(v=vs.85).aspx)

		- [Mediasource Chunk DEMO](https://html5-demos.appspot.com/static/media-source.html)

		- [MPEG-DATA 스트리밍 플레이어 빌드 in MS](https://msdn.microsoft.com/ko-kr/library/Dn551368(v=VS.85).aspx)

		- [simpl.info offline video](https://simpl.info/video/offline/?1)

		- [MediaSource 소스 예제](http://megatuto.com/formation-HTML5.php?HTML5-Examples-Code=MediaSource+error:+This+SourceBuffer+has+been+removed+from+the+parent+media+source+Categorie+javascript+html5+media-source&category=&article=18543)

		- [Socket IO Stream 코드 예제](https://nodesource.com/blog/understanding-socketio)






