---
layout: post
title: "Selection"
description: "Selection API 사용방법"
date:   2015-09-15
categories: JavaScript
tags: [JavaScript]
---


## **Selection**

- 정의
	- [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection) 은 마우스 또는 키보드를 통해, 컨텐츠를 **선택**, 또는 **선택된 영역을 제어** 하기위한 모든 특성들을 제공한다.

## **관련 용어**

- 정의

	- **Selection** 에 대해 공부할때, 가장 큰 장애물이 되는것은, 각 **용어**에 대한 **이해도**라 생각한다. 즉 **용어**에 대한 정확한 이해없이는, 제공되는 **API** 기능에 대해 이해하기 힘든 부분이 존재하기 때문이다.

- 용어 설명

	- <span style="color:#c11f1f">Selection / Selection object</span>: 사용자가 마우스(드래그) 또는 키보드(키 조작)를 통해, **선택된 텍스트**의 **범위**를 말한다.

	- <span style="color:#c11f1f">anchor</span>: 선택된 범위가 **시작되는 지점**을 말한다.

	- <span style="color:#c11f1f">focus</span>: 선택된 범위가 **끝나는 지점**을 말한다.

	- <span style="color:#c11f1f">range</span>: 선택된 범위의 **문서 조각**들을 말한다.


## **특성**

- **Properties**

	이와같은 **HTML** 코드가 있다고 가정하고, 아래 나열된 속성들을 살펴보기로한다.

	```javascript
	<!-- container 객체 -->
	<div id="text-container" contenteditable="true">
		<span style="height: 20px">HELLO</span>
		<span style="height: 20px;padding-left: 5px;">WORLD</span>
		<span style="height: 20px;padding-left: 5px;">TEST</span>
		<span style="height: 20px;padding-left: 5px;">!!!!</span>
	</div>
	```

	- <span style="color:#6298c1">selection.anchorNode</span>:

		선택된 범위가 시작되는 지점의 노드를 반환한다.

	- <span style="color:#6298c1">selection.anchorOffset</span>:

		anchorNode 범위내에 anchor(선택된 범위가 시작되는 지점) 이전의 문자열(**HE(2개)**)의 갯수를 반환한다.

		![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_1.jpg)

	- <span style="color:#6298c1">selection.focusNode</span>:

		선택된 범위가 끝나는 지점의 노드를 반환한다.
	- <span style="color:#6298c1">selection.focusOffset</span>:

		- focusNode 범위내에 focus(선택된 범위가 끝나는 지점)의 문자열(**WORLD(5개)**) 갯수를 반환한다.

		![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_2.jpg)

	- <u><span style="color:#6298c1">anchorOffset</span> 과 <span style="color:#6298c1">focusOffset</span> 이 좀 이해하기 힘들더라도(개인적일수도 있지만;;;) 그만큼 중요한 부분이니, 반드시 <b>이해</b>하고 넘어가길 바란다.</u>

	- <span style="color:#6298c1">selection.isCollapsed</span>:

		- 선택된 범위가 시작되는 지점(<span style="color:#6298c1">anchorOffset</span>)과, 끝나는 지점(<span style="color:#6298c1">focusOffset</span>)이 동일한지 여부를 반환한다.

		- 만약 첫 번째 문자와 두 번째 문자 사이를 **클릭**(<span style="color:#6298c1">드래그</span>가 아닌)한 경우, <span style="color:#6298c1">anchorOffset</span> 과 <span style="color:#6298c1">focusOffset</span> 은 각각 <span style="color:#c11f1f">1</span>을 반환하게 된다.

			- 선택이 시작된 지점 **이전의 문자열(H)** 갯수(anchorOffset): <span style="color:#c11f1f">1</span>
			- 선택이 **끝난 지점의 문자열(H)** 갯수(focusOffset): <span style="color:#c11f1f">1</span>

		![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_3.jpg)

	- <span style="color:#6298c1">selection.rangeCount</span>:

		- 선택된 범위의 <span style="color:#6298c1">range</span> 크기를 반환한다.

		- 페이지 로드 후 <u>사용자가 문서를 <b>클릭</b>하지 않았을경우</u>, <span style="color:#6298c1">rangeCount</span> 는 <span style="color:#c11f1f">0</span>을, <b>클릭한 후</b>에는 <span style="color:#c11f1f">1</span>을 반환하게 된다.

		- 사용자는 <u>일반적으로 한번에 하나의 <span style="color:#6298c1">range</span> 를 선택할 수 있다.</u>

		- **Gecko** 브라우저에서는 Multiple <span style="color:#6298c1">range</span> 를 선택할 수 있다.</u>(Ctrl or Command 키를 통해)

			![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_4.jpg)

- **Methods**

	- <span style="color:#6298c1">selection.getRangeAt(range index)</span>:

		- 선택된 하나의 <span style="color:#6298c1">range object</span> 를 반환한다.

	- <span style="color:#6298c1">selection.collapse(parentNode, offset)</span>:

		- <span style="color:#6298c1">anchorNode</span> 를 전달된 offset 으로 지정한다.

	- <span style="color:#6298c1">selection.extend(parentNode, offset)</span>:

		- <span style="color:#6298c1">focusNode</span> 를 전달된 offset 으로 지정한다.

			![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_5.jpg)

	- anchorNode 와 focusNode 를 각각의 메서드를 통해 <u>새로 지정하면, 새로운 <b>선택</b> 범위를 만들어낼수 있다.</u>


		```javascript

		selection.collapse(container, 0);
		selection.extend(container, 0);

		console.log(selection.anchorNode); // HELLO
		console.log(selection.focusNode); // HELLO

		selection.collapse(container, 1);
		selection.extend(container, 3);

		console.log(selection.anchorNode); // WORLD
		console.log(selection.focusNode); // TEST

		selection.collapse(container, 4);
		selection.extend(container, 4);

		console.log(selection.anchorNode); // !!!!
		console.log(selection.focusNode); // !!!!
		```
	- <span style="color:#6298c1">selection.collapseToStart()</span>:

		- 선택된 범위가 시작되는 지점으로 **커서**를 이동시킨다.

	- <span style="color:#6298c1">selection.collapseToEnd()</span>:

		- 선택된 범위가 끝나는 지점으로 **커서**를 이동시킨다.

	- <span style="color:#6298c1">selection.selectAllChildren(parentNode)</span>:

		- 이전에 선택된 범위를 **취소**(삭제)한 후, 전달된 parentNode 의 모든 자식 노드들을 선택 한다.

	- <span style="color:#6298c1">selection.addRange(range)</span>:

		- 새로운 range(선택 범위의 문서 조각) 를 추가한다.

			```javascript

			var container = document.getElementById("text-container");

			// container 의 모든 자식 노드들에 대한 range object 를 생성 후 addRange 메서드를 통해, 선택 범위에 추가시킨다.
			for (var i = 1; i < container.childNodes.length; i++){

				var childNode = container.childNodes[i];
				var range = document.createRange();

				range.selectNode(childNode);

				// 새로운 range(선택 범위의 문서 조각) 를 추가한다.
				selection.addRange(range);
			}
			```
		![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_6.jpg)

	- <span style="color:#6298c1">selection.removeAllRanges()</span>:

		- 모든 range(선택된 범위의 문서 조각)를 삭제한다.

	- <span style="color:#6298c1">selection.deleteFromDocument()</span>:

		- 선택된 범위의 모든 text 를 삭제한다.

	- <span style="color:#6298c1">selection.toString()</span>:

		- 선택된 범위의 모든 컨텐츠를 반환한다.

	- <span style="color:#6298c1">selection.containsNode(aNode, aPartlyContained)</span>:

		- 전달된 노드(**aNode**)가 선택된 범위안에 있는지 여부를 반환한다.

		![](http://mohwa.github.io/blog/assets/images/posts/Selection/selection_6.jpg)

		위 그림에서와 같이 <span style="color:#6298c1">helloNode</span> 는 <u>선택된 범위에 포함되지 않기때문에</u>, <span style="color:#c11f1f">false</span> 를 **반환**하게 되며, <span style="color:#6298c1">worldNode</span> 는 그 반대인 <span style="color:#c11f1f">true</span> 를 **반환**하게 된다.

		```javascript

		var container = document.getElementById("text-container");

		// hello 문자열 노드
		var helloNode = container.getElementsByTagName('span')[0];
		// world 문자열 노드
		var worldNode = container.getElementsByTagName('span')[1];

		console.log(selection.containsNode(helloNode, true)); // false
		console.log(selection.containsNode(worldNode, true)); // true
		```

## **API 테스트**

아래 코드는 **Chrome** 브라우저에서만 테스트되었습니다.(소스 참조시 반드시 다른 브라우저에서도 테스트 하시기 바랍니다)

<iframe width="100%" height="600" src="http://jsfiddle.net/mohwa/3bd9vao3/1/embedded/result,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

























