---
id: 690
title: 분할정복 알고리즘은 다이나믹 프로그래밍에 포함되나?
date: 2017-07-08T12:44:20+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=690
permalink: '/2017/07/08/%eb%b6%84%ed%95%a0%ec%a0%95%eb%b3%b5-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98%ec%9d%80-%eb%8b%a4%ec%9d%b4%eb%82%98%eb%af%b9-%ed%94%84%eb%a1%9c%ea%b7%b8%eb%9e%98%eb%b0%8d%ec%97%90-%ed%8f%ac%ed%95%a8/'
image: /assets/wp-content/uploads/2017/07/-2017-07-03-오후-2.43.26-1200x754.png
tags: [develop]
categories: [develop, algorithm]
---
알고리즘 공부를 하다가 다이나믹 프로그래밍이 분할정복 알고리즘에 포함되는지가 궁금해졌다.

위키피디아를 보니 분할정복과 DP는 모두 분할 정복의 "step"을 거친다고 나와있었다.
<a href="https://en.wikipedia.org/wiki/Divide_and_conquer_algorithm" target="_blank" rel="noopener">Divide and Conquer Wikipedia</a>

그러나 결정적으로 두 알고리즘이 적용되는 sub structure가 다르기 때문에 서로 포함관계라고 말하기는 힘들것 같다.
DP의 sub structure는 의존적이다. 즉 하위 문제들이 서로에게 영향을 준다.
분할정복의 sub structure는 독립적이다. 하위 문제들이 서로에게 영향을 주지 않는다.

<!--more-->

그러므로, 두 알고리즘은 모두 분할, 정복, 그리고 combine하는 "step"을 거치지만 어느 한 쪽이 다른 쪽을 포함한다고는 말하기 힘들 것이다.

[caption id="attachment_753" align="aligncenter" width="717"]<img class="size-full wp-image-753" src="/assets/wp-content/uploads/2017/07/-2017-07-12-오전-2.05.54.png" alt="" width="717" height="454"> Dynamic programming VS Divide and Conquer algorithm[/caption]

다이어그램으로 DP와 분할 정복 알고리즘을 구분해보았다.

<del datetime="2017-07-11T17:05:23+00:00">여기서 그리디 알고리즘이 DP 안에 포함되있는 것을 볼 수 있다. 그리디 알고리즘은 DP의 special case이기 때문이다. 이에 대해서는 나중에 또 한 번 다루도록 하겠다.</del>

그리디 알고리즘 역시 DP와 Property가 다르기 때문에 포함관계로 설명하지 않는게 정확하다.
(다이어그램 수정함)
<a href="http://localhost/wordpress/2017/07/12/%ea%b7%b8%eb%a6%ac%eb%94%94-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98%ea%b3%bc-%eb%8b%a4%ec%9d%b4%eb%82%98%eb%af%b9-%ed%94%84%eb%a1%9c%ea%b7%b8%eb%9e%98%eb%b0%8d-%eb%b9%84%ea%b5%90/" target="_blank" rel="noopener">그리디 알고리즘과 다이나믹 프로그래밍의 property</a>