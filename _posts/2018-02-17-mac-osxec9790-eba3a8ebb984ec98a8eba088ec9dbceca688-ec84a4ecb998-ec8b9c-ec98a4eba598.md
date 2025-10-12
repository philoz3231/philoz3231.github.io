---
id: 1070
title: Mac OSX에 루비온레일즈 설치 시 오류
date: 2018-02-17T17:18:23+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=1070
permalink: '/2018/02/17/mac-osx%ec%97%90-%eb%a3%a8%eb%b9%84%ec%98%a8%eb%a0%88%ec%9d%bc%ec%a6%88-%ec%84%a4%ec%b9%98-%ec%8b%9c-%ec%98%a4%eb%a5%98/'
image: /assets/wp-content/uploads/2018/02/4223-270x270.png
tags: [develop]
categories: [develop, rails]
---
맥 OS 하이시에라에서 최신버전의 루비온레일즈를 설치하면서 오류가 발생했다.
그 전 4.1.6버전 레일즈는 정상적으로 프로젝트 생성이 되었지만 최신 버전에선 두가지 오류가 있어서 해결방법을 적어둔다. 기본적인 설치는 처음 링크에 나온대로 터미널을 통해 설치하면 된다.

<!--more-->

&nbsp;

<strong>1. 설치 방법</strong>
<a href="https://gorails.com/setup/osx/10.13-high-sierra" target="_blank" rel="noopener">https://gorails.com/setup/osx/10.13-high-sierra</a>

homebrew, rbenv, ruby-build, ruby, rails 까지 총 5가지 요소를 설치해주면 된다.

하나씩 간단히 설명하자면 homebrew는 맥에서 경로설정 등 패키지 설치를 더 편하게 해주는 프로그램이고, rbenv/ruby-build는 루비 버전을 관리할 수 있는 툴이다. ruby는 python과 같이 루비 프로그래밍을 위한 스크립트정도라고 생각하면 될 것이고, rails는 그 위에서 돌아가는 웹 개발용 프레임워크다.

&nbsp;

<strong>2. ffi 1.9.21 젬 설치 실패</strong>

<pre class="default prettyprint prettyprinted"><code><span class="typ"></span><span class="str">Make sure that `gem install ffi -v '1.9.21'` succeeds before bundling.</span></code></pre>

위 과정을 모두 수행한 후 'rails server'를 입력하자 몇가지 젬이 인스톨되지 않는다는 문제가 있었다.
이렇게 뜨면서 ffi라는 젬이 설치되지 않았다고 나온다. 검색해보니 ffi 최신 버전에서 생긴 문제라고 한다. &nbsp;Gemfile 에서 'gem 'ffi','1.9.18'이라고 명시적으로 하위 버전을 설치하라고 한 후 다시 빌드하면 해결된다.

<a href="https://github.com/ffi/ffi/issues/608" target="_blank" rel="noopener">https://github.com/ffi/ffi/issues/608</a>

&nbsp;

<strong>3. MySQL2 젬 인스톨 문제</strong>
<pre class="default prettyprint prettyprinted"><code><span class="typ">Don</span><span class="str">'t know how to set rpath on your system, if MySQL libraries are not    in path mysql2 may not load</span></code></pre>
레일즈의 경우 기본 데이터베이스는 sqlite3이지만, MySQL사용을 위해 mysql2 젬을 설치하려고 했으나 역시 빌드가 되지 않았다. 스택오버플로우에 따르면 xcode의 명령어도구가 xcode 업데이트 중 삭제되어 해당경로를 못찾아서 인 것 같다. 터미널에 'xcode-select --install'로 명령어도구 설치 후엔 제대로 작동했다.

<a href="https://stackoverflow.com/questions/43661360/install-mysql2-gem-on-macos-sierra" target="_blank" rel="noopener">https://stackoverflow.com/questions/43661360/install-mysql2-gem-on-macos-sierra</a>