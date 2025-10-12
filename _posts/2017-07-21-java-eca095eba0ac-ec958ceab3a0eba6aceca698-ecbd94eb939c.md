---
id: 833
title: 정렬 알고리즘 코드
date: 2017-07-21T01:48:40+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=833
permalink: '/2017/07/21/java-%ec%a0%95%eb%a0%ac-%ec%95%8c%ea%b3%a0%eb%a6%ac%ec%a6%98-%ec%bd%94%eb%93%9c/'
tags: [develop]
categories: [develop, algorithm]
---
각 정렬 알고리즘 코드이다.

Bubble, Insertion, Selection, Merge, Heap, Quick 소팅을 자바로 구현했다.

굳이 안드로이드로 구현하라는 모 교수님 과제였다. 덕분에 단순히 int Type 정렬이 아니라 Card라는 클래스를 포함한 Pack 타입으로 정렬을 구현하게 되었다. 실제 구현 시에는 Compare 함수만 원하는 타입으로 바꾸거나, int를 직접 비교하는 식으로 사용하면 되겠다.

여기서 퀵소트는 더 간단히 구현할 수 있었기 때문에 C++로 된 코드를 추가로 첨부한다.

<!--more-->



<blockquote>Bubble Sort</blockquote>
[gist https://gist.github.com/philoz3231/d358cca8b33ccb036d23b746ea052827 /]

<blockquote>Insertion Sort</blockquote>
[gist https://gist.github.com/philoz3231/9d7b61dd122d4db4046ca1216e3ebe39 /]

<blockquote>Selection Sort</blockquote>
[gist https://gist.github.com/philoz3231/06de6fb0a08ecf9bb7ff3f0a06c7f195 /]

<blockquote>Merge Sort</blockquote>
[gist https://gist.github.com/philoz3231/da9b2221e66d7d0411ddff20017b9fb1 /]

<blockquote>Heap Sort</blockquote>
[gist https://gist.github.com/philoz3231/8c5ac1030bc9b9a5242f9c29cf686534 /]


<blockquote>Quick Sort- C++, Java</blockquote>
[gist https://gist.github.com/philoz3231/5230fe4959099df5534189aa887f81e7 /]
