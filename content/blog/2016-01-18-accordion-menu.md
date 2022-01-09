---
layout: post
title: "slideUp, slideDown, slideLeft, slideRight 함수 구현"
description: "slideUp, slideDown, slideLeft, slideRight 함수 구현"
date:   2016-01-18
categories: javascript 
tags: [JavaScript]
---

- JQuery 함수인 [slideUp](http://api.jquery.com/slideup/) / [slidedDown](http://api.jquery.com/slideDown/) 함수와 Accordion Menu 를 직접 구현한 예제이다.
	
	- **코어**(재귀를 통한 Animation 처리) 로직을 직접 구현해보기위한 예제이므로, 그 외 로직([DOM](http://mohwa.github.io/blog/architecture/2015/12/10/dom/) 처리, 조작 등)에서는 JQuery 를 사용하였다.<p>
	
        <iframe height='300' scrolling='no' src='//codepen.io/yanione/embed/wMPvLr/?height=300&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/yanione/pen/wMPvLr/'>wMPvLr</a> by mohwa (<a href='http://codepen.io/yanione'>@yanione</a>) on <a href='http://codepen.io'>CodePen</a>.
        </iframe>
        
    - **부드러운 움직임**을 위한, 다향한 [Easing](http://upshots.org/actionscript/jsas-understanding-easing) 기능이 추가된 예제이다.
  
      -  <em>즉 Easing 을 통해 **부드러운 움직임**을 위한 <span style="color:#c11f1f">가속도</span>(사람은 속도에는 둔감해도 <span style="color:#c11f1f">가속도</span>에는 민감하다)를 적용할 수 있다.</em><p>
      
          ```html
          속도에는 둔감하고 가속도에는 민감한 예를 들자면 차가 일정한 속도로 달리고 있을 때 우리는 이 차가 얼마나 빨리 움직이는 것인지 잘 모른다.
          일정한 속도라면(즉, 가속도가 0이라면) 차안에서 가만히 서있을 수 있다. 하지만 급정거나 급출발하면 어떤가? 아무리 살짝(?) 급정거, 급출발을 해도 우리는 곧바로 느낄 수 있다.
          우리 몸이 힘을 맞았기 때문이다. UI 애니메이션에서 easing은 이런 가속도를 매끄럽게 해주는 일을 한다.
          ```

      - [애니메이션-easing에-숨은-비밀](http://start.goodtime.co.kr/2015/02/%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-easing%EC%97%90-%EC%88%A8%EC%9D%80-%EB%B9%84%EB%B0%80/)<p>
      
      - [easing 테스트](http://gizma.com/easing/)
      
      - [easing 함수 generator](http://easings.net/)
    
        <iframe height='300' scrolling='no' src='//codepen.io/yanione/embed/obogvX/?height=300&theme-id=0&default-tab=reslut' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/yanione/pen/obogvX/'>obogvX</a> by mohwa (<a href='http://codepen.io/yanione'>@yanione</a>) on <a href='http://codepen.io'>CodePen</a>.
        </iframe>
        
- 위 slideUp / Down 함수를 응용하여 slideRight / slidedLeft 함수를 구현한 예제이다.
	
	- **코어** 로직 중 Animation 처리를 위한 속성인 <span style="color:#6298c1">height</span> 속성이 <span style="color:#6298c1">width</span> 속성으로 변경된점을 제외하고는 **동일**하다.
	
        <iframe height='300' scrolling='no' src='//codepen.io/yanione/embed/adVzNo/?height=300&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/yanione/pen/adVzNo/'>adVzNo</a> by mohwa (<a href='http://codepen.io/yanione'>@yanione</a>) on <a href='http://codepen.io'>CodePen</a>.
        </iframe>
        
- 마지막으로 Menu Animation 이 구현된 예제이다.
 
    <iframe height='300' scrolling='no' src='//codepen.io/yanione/embed/JGOoOX/?height=300&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/yanione/pen/JGOoOX/'>JGOoOX</a> by mohwa (<a href='http://codepen.io/yanione'>@yanione</a>) on <a href='http://codepen.io'>CodePen</a>.
    </iframe>
        
## 참고 URL

- [Easing 처리에 대한 이해를 돕기위한 포스트](http://upshots.org/actionscript/jsas-understanding-easing)
                                 
- [부드러운 모션 + 동적인 움직임](http://shinluckyarchive.tistory.com/26)

- [Animating with Robert Penner's Easing Functions](http://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm)

- [아코디언 메뉴 타입 모음](http://e-rooms.tistory.com/entry/Accodian-Pattern-Collection%EC%95%84%EC%BD%94%EB%94%94%EC%96%B8-%EB%A9%94%EB%89%B4)


