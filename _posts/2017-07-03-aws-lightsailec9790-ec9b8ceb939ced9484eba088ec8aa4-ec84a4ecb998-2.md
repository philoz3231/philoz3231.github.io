---
id: 123
title: 'AWS lightsail에 워드프레스 설치 &#8211; 2'
date: 2017-07-03T03:33:39+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=123
permalink: '/2017/07/03/aws-lightsail%ec%97%90-%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4-%ec%84%a4%ec%b9%98-2/'
image: /assets/wp-content/uploads/2017/07/2017-07-03-오전-1.37.37.png
tags: [develop]
categories: [develop, wordpress]
---
<blockquote>2. 운영자메뉴 접속</blockquote>
생성된 인스턴스의 ip 주소로 워드프레스가 접속된다면 하단에 아이콘 혹은 ip주소/wp-admin 입력을 통해서 운영자화면으로 이동할 수 있다.

<!--more-->

운영자메뉴로 접속하기 위해서는 아이디와 비밀번호가 필요하다. 워드프레스 기본 아이디는 user 이며 비밀번호는 lightsail의 콘솔을 통해 확인할 수 있다.

<img class="alignnone size-medium wp-image-538" src="/assets/wp-content/uploads/2017/07/-2017-07-03-오전-1.33.58-300x93.png" alt="" width="300" height="93">
여기서 &gt;_ 모양의 아이콘을 클릭하면 콘솔을 통해 서버에 원격접속할 수 있다.

bitnami 어쩌구라고 나오는데 여기에 cat bitnami_application_password 라고 입력하면 워드프레스의 비밀번호가 출력된다.

이 비밀번호를 옮겨적으면 운영자메뉴에 접속이 가능하다.

<img class="alignnone size-full wp-image-566" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.35.17.png" alt="" width="670" height="27">
(이렇게 입력하면 바로 하단에 비밀번호가 나온다. 서버는 기본으로 리눅스 우분투가 설치되어 있으며 cat은 해당 파일을 열어서 출력해달라는 리눅스 명령어이다)

이렇게 나온 비밀번호로 로그인하면 운영자메뉴로 접속된 화면을 볼 수 있다.

<img class="alignnone size-large wp-image-568" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.36.38-1024x358.png" alt="" width="840" height="294">
운영자 메뉴에서는 화면구성과 위젯 조절 같은 우리가 흔히 아는 블로그(웹페이지) 관리를 할 수 있다.
<blockquote>3. 도메인 연결</blockquote>
AWS lightsail이 생성해준 ip주소에 도메인을 연결해보자. 도메인은 naver.com / google.co.kr 처럼 사람이 알아보는 주소형태로

웹페이지 접속이 가능하도록 하는 서비스이다.

도메인 주소는 유료로 구매해야한다. Godaddy라는 해외사이트도 유명하지만 도메인 연결작업 시에 도메인 구입 사이트와 같은 곳에서 하는

것이 조금 더 편했기 때문에 나는 cafe24나 가비아 같은 국내 사이트를 비교해보고 값이 더 싼 가비아를 선택했다.

<img class="alignnone size-large wp-image-569" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.37.37-1024x759.png" alt="" width="840" height="623">
(philoz라는 도메인 검색결과)

원하는 사이트 회원가입 후에 쇼핑하듯이 도메인을 장바구니에 담고 구매하면 된다. 이후 설명은 가비아의 도메인 등록 과정을 중심으로 설명하겠다.(다른 사이트는 조금씩 다를 수 있음)

이제 구매한 도메인을 AWS의 ip와 연결해주는 과정이 남았다. AWS와 호스트업체 양쪽에 각각 ip와 도메인주소를 알려줘야 한다.

먼저 호스트업체(가비아)에서 내가 구매한 도메인 관리로 이동한다. 가비아의 경우 결제 후 3분 가량이 지나야 관리화면에 나타났다.

<img class="alignnone size-full wp-image-570" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.38.05.png" alt="" width="825" height="568">
여기서 우측의 서비스 관리 버튼을 누르면 된다.

도메인 관리화면에서 다양한 서비스들이 있는데 여기서 관리툴의 네임서버, 호스트 부분이 추가해줘야할 부분이다.

<img class="alignnone size-full wp-image-571" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.38.20.png" alt="" width="373" height="194">
여기서 호스트를 먼저 등록한다. 여기서 호스트란 지금 내 도메인을 사용할 주인(호스트)이 누구인지 알려주라는 뜻이다.

<img class="alignnone size-large wp-image-572" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.38.44-1024x233.png" alt="" width="840" height="191">
클릭 후 위와 같은 화면에서 내가 구매한 도메인이 나온다.

여기서 IP주소란에 아까 AWS에서 받은 IP주소를 입력하면 된다. 그리고 호스트명으로 구매한 도메인 앞에 sub domain을 추가하라고 하는데 이건 그냥 www로 추가해도 된다.

나중에 lightsail에서 www를 붙은 버전과 안붙은 버전 모두를 인식할 수 있도록 하면 된다.

입력한 후 추가를 누르고 다시 AWS lightsail로 이동한다.