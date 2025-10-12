---
id: 588
title: Is Dynamic Programming included in Divide and Conquer Algorithm?
date: 2017-07-03T14:48:10+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=588
permalink: /en/2017/07/03/is-dynamic-programming-included-in-divide-and-conquer-algorithm/
tags: [develop]
categories: [develop, algorithm]
---
I was wonder whether DP(dynamic programming) is included in divide and conquer algorithm.

So I looked up wikipedia. And It said divide and conquer / DP both go through divide and conquer "steps".
<a href="https://en.wikipedia.org/wiki/Divide_and_conquer_algorithm" target="_blank">Divide and Conquer Wikipedia</a>

However, it is different because the sub-structure is different. 
DP's substructure - dependent(sub-problems doesn't influence each other)
Divide and Conquer's substructure - independent(sub-problems influence each other)
<!--more-->

Therefore, we could say both algorithm go through divide, conquer, and combine "steps". 
BUT, Two algorithm do not contain each algorithm. 

[caption id="attachment_753" align="aligncenter" width="717"]<img src="/assets/wp-content/uploads/2017/07/-2017-07-12-오전-2.05.54.png" alt="" width="717" height="454" class="size-full wp-image-753" /> Dynamic programming VS Divide and Conquer algorithm[/caption]

This diagram distributes DP and divide&conquer algorithm.

<del datetime="2017-07-11T17:10:14+00:00">You can find "Greedy Algorithm" is in the DP's red diagram. This is because greedy algorithm is special kind of DP. </del>

Greedy algorithm is different from DP, because of it's properties.
(I changed the diagram)

 