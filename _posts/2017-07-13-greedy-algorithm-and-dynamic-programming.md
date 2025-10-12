---
id: 764
title: Greedy algorithm and Dynamic programming
date: 2017-07-13T02:06:54+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=764
permalink: /en/2017/07/13/greedy-algorithm-and-dynamic-programming/
tags: [develop]
categories: [develop, algorithm]
---
Greedy algorithm is special case of DP, but it's different from DP(dynamic programming) because of some conditions.

There are two greedy algorithm properties, Among them Greedy choice property is a most important factor that tell Greedy from DP.
<!--more-->


<blockquote>Greedy Property</blockquote>


1. Greedy choice property
<strong>Select the most optimal choice each time(locally optimal choices)</strong>, then problem can be solved by gather the choices. Greedy algorithm divides the original problem to subproblems like DP, but each subproblems aren't overlapping unlike DP(the choices made so far, do not affect future choices). Also, Greedy algorithm can't assure always find optimal solution, because Greedy supposes gathering locally optimal choices made globally optimal solution.

2. Optimal substructure
When divide the original problem to subproblems, you can get the solution if all the subproblems solved. It is same property of DP. 


<blockquote>Dynamic programming property</blockquote>


1. Overlapping Subproblems
When you divide the problem to subproblems, duplicate subproblems can be made. Typical example is Fibonacci series. You can see the duplicate calculations in the picture. 
DP uses memoization or tabulation to avoid duplicate calculations.
[caption id="attachment_761" align="alignright" width="807"]<img src="/assets/wp-content/uploads/2017/07/-2017-07-12-오전-2.26.48.png" alt="" width="807" height="323" class="size-full wp-image-761" /> Duplicate calculation in Fibonacci number[/caption]

2. Optimal substructure
Same with Greedy algorithm


관련 링크
<a href="https://en.wikipedia.org/wiki/Greedy_algorithm" target="_blank">Greedy algorithm properties - Wikipedia</a>
<a href="https://stackoverflow.com/questions/33563230/can-someone-please-explain-optimal-substructure-in-dynamic-programing" target="_blank">Dynamic programming properties - Stackoverflow</a>