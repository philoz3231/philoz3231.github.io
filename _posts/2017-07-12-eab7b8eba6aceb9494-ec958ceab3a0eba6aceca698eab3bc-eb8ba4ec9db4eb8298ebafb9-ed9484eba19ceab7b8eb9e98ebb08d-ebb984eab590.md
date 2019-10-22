---
id: 751
title: 그리디 알고리즘과 다이나믹 프로그래밍 비교
date: 2017-07-12T02:14:27+09:00
author: philoz
layout: post
guid: http://localhost/wordpress/?p=751
permalink: '/2017/07/12/%ea%b7%b8%eb%a6%ac%eb%94%94-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98%ea%b3%bc-%eb%8b%a4%ec%9d%b4%eb%82%98%eb%af%b9-%ed%94%84%eb%a1%9c%ea%b7%b8%eb%9e%98%eb%b0%8d-%eb%b9%84%ea%b5%90/'
image: /wp-content/uploads/2017/07/스크린샷-2017-07-12-오전-2.26.48.png
categories:
  - algorithm
  - Development
---
그리디 알고리즘은 DP의 special case라고 할 수 있겠지만 몇 가지 조건이 있기 때문에 DP와는 구별된다.

그리디 알고리즘이 포함하는 요소는 두가지가 있는데, 그 중 Greedy choice property가 DP와 그리디를 가장 크게 구분하는 요소이다.

<!--more-->
<blockquote>Greedy Property(그리디 알고리즘의 요소)</blockquote>
1. Greedy choice property
<strong>현재 최적이라고 생각되는 선택을 하고</strong>, 이것들이 모여서 최적해를 구할 수 있다는 조건. 그리디 알고리즘은 DP와 마찬가지로 문제를 하위 문제로 나누어서 풀기는 하지만, DP와 달리 하위 문제들이 서로 overlapping하지 않는다(현재 선택은 미래의 선택에 영향을 주지않음) 또한, 그리디 알고리즘에서는 Locally optimal choices가 모여서 Globally optimal soultion이 된다고 가정하기 때문에 항상 최적해를 출력하지 않을 수 있다.

2. Optimal substructure
문제를 하위 문제로 쪼개서 생각했을 때, 하위 문제를 해결하면 원래 문제를 해결할 수 있게 되는 구조를 말한다. Dynamic Prograaming과 서로 공유하는 요소이다.

이에 반해 DP의 요소는 아래와 같다.
<blockquote>Dynamic programming property(DP의 요소)</blockquote>
1. Overlapping Subproblems
문제를 하위 문제로 나누어 풀 때, <strong>중복되는 하위문제</strong>가 발생한다는 개념이다. 대표적으로 피보나치 수열을 생각해보면 된다.
피보나치 수열의 경우 아래와 같이 겹치는 연산이 발생한다. DP의 경우 이것을 해결하기 위해 Memoization, Tabulation을 사용하여 중복된 계산을 막는 것이다.

[caption id="attachment_761" align="alignright" width="807"]<img class="size-full wp-image-761" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-12-오전-2.26.48.png" alt="" width="807" height="323"> Duplicate calculation in Fibonacci number[/caption]

2. Optimal substructure
그리디 알고리즘의 설명과 같다.

관련 링크
<a href="https://en.wikipedia.org/wiki/Greedy_algorithm" target="_blank" rel="noopener">그리디 알고리즘의 요소 - 위키피디아</a>
<a href="https://stackoverflow.com/questions/33563230/can-someone-please-explain-optimal-substructure-in-dynamic-programing" target="_blank" rel="noopener">Dynamic programming의 요소 - Stackoverflow</a>