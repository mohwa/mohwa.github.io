---
layout: post
title: "JQuery UI Select Box 구현"
description: "JQuery UI Select Box 구현"
date:   2016-02-01
categories: javascript 
tags: [JavaScript]
---

- [JQuery UI](https://jqueryui.com/selectmenu/) 에서 제공하고 있는 widgets 중 하나인 (Util)Selectmenu 를 구현한 예제이다.
	
	- 이전 [Menu UI](http://mohwa.github.io/blog/javascript/2016/01/22/menu/) 와의 (구현 상)가장 큰 차이점으로는 (대치될)메뉴를 위한 사용자 정의 태그가 따로 존재하며, 또 그것을 바탕으로한 새로운 엘리먼트 영역을 구현한다는 점이다.<p>
	
	- 즉 [전 처리](http://www.qaupot.com/wordpress/?p=2078) 과정을 통해, 사용자가 정의한 Semantic(의미 있는) 태그를 새로운 태그로 대치시킨다는 말이다.<p>
	
	- 또한, 대치될 Selectmenu 엘리먼트의 focus 이벤트 처리를 위해, 최상단 엘리먼트(<code>$('.select-menu-container')</code>)에 <code>tabindex="0"</code> 속성 값을 할당한다.(blur 이벤트를 사용하기 위한 구현) 
	
- 구현 1(각 메뉴 영역을 border 값으로 구분지은 구성)
	
    <iframe height='300' scrolling='no' src='http://codepen.io/yanione/embed/OMEGbq/?height=300&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/yanione/pen/OMEGbq/'>OMEGbq</a> by mohwa (<a href='http://codepen.io/yanione'>@yanione</a>) on <a href='http://codepen.io'>CodePen</a>.
    </iframe>
    
- 구현 2(각 메뉴 영역을 구분짓지않는 패턴(이는 요구 사항에 따라 얼마든지 변경될 수 있다))
	
    <iframe height='300' scrolling='no' src='//codepen.io/yanione/embed/wMXZyw/?height=300&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/yanione/pen/wMXZyw/'>wMXZyw</a> by mohwa (<a href='http://codepen.io/yanione'>@yanione</a>) on <a href='http://codepen.io'>CodePen</a>.
    </iframe>    
       

