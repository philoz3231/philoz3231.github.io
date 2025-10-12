---
id: 1088
title: VM, Vagrant, Docker 개념
date: 2018-06-30T14:40:26+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=1088
permalink: '/2018/06/30/vm-vagrant-docker-%ea%b0%9c%eb%85%90/'
image: /assets/wp-content/uploads/2018/06/-2018-06-30-오후-2.27.41-584x270.png
tags: [develop]
categories: [develop]
---
간단하게(거칠게?) 이해한 바를 바탕으로 정리해둠.

<img class="wp-image-1092" src="/assets/wp-content/uploads/2018/06/-2018-06-30-오후-2.27.21.png" alt="" width="299" height="458"> Virtual Machine Concept
<blockquote>1. Virtual Machine(Virtual Machine, VM ware 등)</blockquote>
버츄얼 머신(VM)은 기존 OS(Host OS) 위에서 가상의 OS(Guest OS)를 얹혀놓은 형태. 가상 OS의 모든 기능을 사용할 수 있지만 OS를 두번 거치는 형태이기 때문에 속도가 느림.
Hypervisor

하이퍼바이저는 VM을 사용하기 위해 VM에서 돌아가는 SW라고 생각하면 된다. Type1과 Type2로 구분되며 1의 경우 기존 OS에 내장,&nbsp; 2의 경우 OS 위에 어플리케이션 단에 얹히는 형태라고 생각하면 된다

참고

&nbsp;<a href="https://ko.wikipedia.org/wiki/%ED%95%98%EC%9D%B4%ED%8D%BC%EB%B0%94%EC%9D%B4%EC%A0%80">https://ko.wikipedia.org/wiki/%ED%95%98%EC%9D%B4%ED%8D%BC%EB%B0%94%EC%9D%B4%EC%A0%80</a>
<img class="aligncenter wp-image-1093" src="/assets/wp-content/uploads/2018/06/-2018-06-30-오후-2.27.29.png" alt="" width="483" height="454">
<blockquote>2. Vagrant</blockquote>
VM 관리를 편하게 하기 위해 필요한 오픈소스 관리 툴. VM 내의 다양한 환경설정, 프로그램들을 미리 설정하고 설치할 수 있게 함. 사용하기 위해서는 Virtual Box 등이 설치되어있어야 함.

참고
<a href="https://www.lesstif.com/pages/viewpage.action?pageId=24445417">https://www.lesstif.com/pages/viewpage.action?pageId=24445417</a>

<img class="aligncenter wp-image-1091" src="/assets/wp-content/uploads/2018/06/-2018-06-30-오후-2.27.36.png" alt="" width="312" height="422">
<blockquote>3. Docker</blockquote>
프로그램 개발 시 각종 어플리케이션 버전, 환경설정 등을 편하게 하기 위해 개발된 application 관리 툴. 리눅스의 container기술을 활용해서 시스템 내에서 완전히 분리된 환경에서 어플리케이션이 구동됨.

참고

<a href="https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html">https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html</a>

최근 개발 스택이 다양해지면서 개발자의 개발환경 구축을 쉽게 해주기 위한 직책이 DevOps로 뜨고 있으며, 그 연장성 상으로 위와 같은 기술들이 계속 발전되고 있는 상황임.

&nbsp;

<img class="wp-image-1090 size-full" src="/assets/wp-content/uploads/2018/06/-2018-06-30-오후-2.27.41.png" alt="" width="710" height="328"> 전체 개념도