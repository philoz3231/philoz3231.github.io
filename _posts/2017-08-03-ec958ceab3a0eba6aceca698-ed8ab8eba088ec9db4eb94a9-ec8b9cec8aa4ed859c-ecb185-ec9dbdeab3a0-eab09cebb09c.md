---
id: 895
title: 알고리즘 트레이딩 시스템, 책 읽고 개발
date: 2017-08-03T22:01:41+09:00
author: philoz
layout: post
guid: http://localhost/wordpress/?p=895
permalink: '/2017/08/03/%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98-%ed%8a%b8%eb%a0%88%ec%9d%b4%eb%94%a9-%ec%8b%9c%ec%8a%a4%ed%85%9c-%ec%b1%85-%ec%9d%bd%ea%b3%a0-%ea%b0%9c%eb%b0%9c/'
image: /wp-content/uploads/2017/08/E2817314825_l.jpg
categories:
  - Books
  - Development
---
[caption id="attachment_896" align="alignright" width="211"]<img class="size-medium wp-image-896" src="/assets/wp-content/uploads/2017/08/E2817314825_l-211x300.jpg" alt="" width="211" height="300"> ©한빛미디어[/caption]

신경망 첫걸음, 딥러닝 첫걸음과 텐서플로 입문서까지 읽고 나서 직접 시스템을 구현해보고 싶어서 고른 책이다.
<!--more-->

주식을 사고파는 트레이딩 시스템을 머신러닝으로 구현해볼 수 있다고 했다. 사용한 언어는 파이썬.

책의 내용은 생각보다는 실망스러웠다.

전체 시스템을 한번 흝는 정도라는 목표에는 만족하지만, 생략된 부분이 굉장히 많아서 이렇게 배워서는 차라리 제대로 내용을 보강했으면 어땠을까 하는 아쉬움이 남는다.

특히 제공된 코드에서 주석이 전혀 없다거나, 책에서도 핵심 부분만 설명하고 넘어간 점은 이걸 보고 따라하라는 것보다는 그저 그날 그날의 개발일지를 읽는 듯한 느낌을 줬다.

트레이딩 전체에 대한 감을 익히는 정도로는 좋겠지만, 실제 시스템을 구현해보고 싶다면 다른 책을 추천한다.
특히 데이터 크롤링을 위한 웹페이지 주소변경이나 라이브러리 변경된 부분이 많고, DB를 연동해야하기 때문에 실제 구현과정이 굉장히 까다로웠다.

책의 문제는 아니지만 파이썬의 금융 관련 라이브러리가 depreciate된 경우가 많고, 결정적으로 야후파이낸스의 API제공이 멈추면서 구글파이낸스의 API를 사용하면서 DB변수나 크롤링에서 또 다시 애를 먹었다.

아래는 책에서 소개한 구현 내용과 내가 간단히 수정해서 사용한 부분이다.

[caption id="attachment_900" align="aligncenter" width="631"]<img class="size-full wp-image-900" src="/assets/wp-content/uploads/2017/08/스크린샷-2017-08-03-오후-9.50.42.png" alt="" width="631" height="438"> 일반적으로 쓰이는 트레이딩 시스템의 구성이라고 한다[/caption]

[caption id="attachment_901" align="alignright" width="800"]<img class="size-full wp-image-901" src="/assets/wp-content/uploads/2017/08/-2017-08-03-오후-9.51.16-e1501765179875.png" alt="" width="800" height="330"> 책에서 실제 구현된 내용이다. 파이썬과 MySQL을 통해 구현됐다[/caption]

구글 파이낸스 API 사용법
[gist https://gist.github.com/philoz3231/7c43c25278f625bebca4d476063a10ed /]

<a href="https://github.com/philoz3231/trading" target="_blank" rel="noopener">파이썬 3.x버전으로 작성한 그 외 코드</a>