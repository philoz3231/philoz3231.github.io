---
id: 93
title: 'AWS lightsail에 워드프레스설치 &#8211; 1'
date: 2017-07-03T03:32:06+09:00
author: philoz
layout: post
guid: http://52.192.178.82/?p=93
permalink: '/2017/07/03/aws-lightsail%ec%97%90-%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4%ec%84%a4%ec%b9%98-1/'
image: /wp-content/uploads/2017/07/2017-07-03-오전-1.33.01-1200x864.png
categories:
  - Development
  - wordpress
---
네이버 블로그를 운영하다가 개발공부를 기록할 겸 좀 더 자유로운 블로그를 찾아보았다.

티스토리, 워드프레스 가입형 서비스가 물망에 올랐지만 티스토리는 과연 블로그 서비스가 언제까지 이어질지 모르겠어서 포기했다.

결국 돌고 돌아서 워드프레스 설치형으로 직접 호스팅을 하는 것으로 선택했다.

무료 호스팅 서비스도 있지만 저장용량과 트래픽 용량 때문에 적절한 호스팅 방법을 고려하다가 Amazon web service에서 제공하는 light sail 서비스를 발견했다.

lightsail은 기존의 EC2 서비스와 달리 더 가볍게 호스팅을 할 수 있도록 구성된 제품이다.

그래서 AWS가 기존에 제공하던 서비스들과 다른 방식으로 비용이 책정되며 가장 저렴한 서비스는 한달에 5000원부터 시작이다.
<blockquote>1. lightsail 만들기</blockquote>
<!--more-->

<img class="alignnone size-large wp-image-561" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.33.01-1024x738.png" alt="" width="840" height="605">

먼저 에서 아이디 생성 후에 lightsail을 서비스를 클릭한다.

lightsail로 들어가서 Create Instance 버튼을 클릭한다.

내 워드프레스를 설치할 서버를 생성한다는 뜻이다.

<img class="alignnone size-large wp-image-562" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.33.07-1024x470.png" alt="" width="840" height="386">
(이미 이 블로그의 인스턴스가 활성화된 것을 확인할 수 있다)

그 다음 인스턴스 생성화면이다.

<img class="alignnone size-large wp-image-563" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.33.21-1024x690.png" alt="" width="840" height="566">
lightsail은 워드프레스 사용자 및 다양한 웹서비스를 위한 기본 설치를 완료하여 서버를 생성할 수 있다.

이 말인즉슨, 워드프레스를 따로 설치할 필요없이 서버 생성과 동시에 설치가 완료된 워드프레스를 사용할 수 있다는 뜻이다!

2017년 7월 3일 기준 워드프레스는 4.8이 최신이지만 구버전으로 설치하고 나중에 업데이트 하는 것이 더 간단하니 Apps+OS 버튼을 클릭하여 인스턴스를 생성하도록 하자.

<img class="alignnone size-large wp-image-564" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.33.27-1024x712.png" alt="" width="840" height="584">
lightsail의 비용은 월 단위로 계산된다. 다른 AWS의 경우 사용량에 따라 결정되지만 lightsail은 달마다 정액제로 운영되는 모양이다.

첫 달은 무료라고한다. 아무튼 Create 버튼을 생성하면 아래와 같이 내 워드프레스 서버가 생성된 것을 확인할 수 있다.

<img class="alignnone size-full wp-image-565" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.33.58.png" alt="" width="500" height="155">

잠시 기다렸다가 Running 옆에 쓰여있는 ip주소를 입력해보면 워드프레스 사이트가 생성된 것을 확인할 수 있다.