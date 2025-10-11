---
layout: post
title: IntelliJ EJS 파일 인식 방법
description:
tags: [develop, javascript]
categories: [develop, javascript]
---

> IntelliJ에서 EJS형태의 javascript를 인식시키는 방법

**1. 기본 html 화면**
<img class="size-large wp-image-927" src="/assets/wp-content/uploads/2020/09/intellij-ejs-1.png" alt="" width="840" height="630">
아무 설정이 없는 경우, html 안의 javascript는 문법으로 인식되지 않음

**2.EJS 플러그인 설치**
<img class="size-large wp-image-927" src="/assets/wp-content/uploads/2020/09/intellij-ejs-2.png" alt="" width="840" height="630">
EJS 플러그인을 마켓플레이스에서 설치. 이제 xxx.ejs 파일을 인식할 수 있다

**3. html파일에 ejs를 인식하도록 설정**
<img class="size-large wp-image-927" src="/assets/wp-content/uploads/2020/09/intellij-ejs-3.png" alt="" width="840" height="630">
Preferences > file type > Embedded JavaScript Templates에 *.html을 와일드 카드로 추가

<img class="size-large wp-image-927" src="/assets/wp-content/uploads/2020/09/intellij-ejs-4.png" alt="" width="840" height="630">
인식 성공 시 모습


> 이거 인식시킨다고 atom도 깔고 뻘짓을 꽤 하다가 방법을 찾아서 기록해 놓음
