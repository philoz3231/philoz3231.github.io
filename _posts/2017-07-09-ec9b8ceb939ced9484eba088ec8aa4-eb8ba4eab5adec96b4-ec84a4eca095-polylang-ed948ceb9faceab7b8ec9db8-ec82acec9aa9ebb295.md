---
id: 694
title: '워드프레스 다국어 설정 &#8211; Polylang 플러그인 사용법'
date: 2017-07-09T02:08:56+09:00
author: philoz
layout: post
guid: http://localhost/wordpress/?p=694
permalink: '/2017/07/09/%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4-%eb%8b%a4%ea%b5%ad%ec%96%b4-%ec%84%a4%ec%a0%95-polylang-%ed%94%8c%eb%9f%ac%ea%b7%b8%ec%9d%b8-%ec%82%ac%ec%9a%a9%eb%b2%95/'
image: /wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.04.57.png
categories:
  - Development
  - wordpress
---
[caption id="attachment_698" align="aligncenter" width="840"]<img class="size-large wp-image-698" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.01.13-1024x591.png" alt="" width="840" height="485"> 화면 옆에 다른 언어를 선택할 수 있는 Flag(국기)가 보인다[/caption]

워드프레스를 시작하면서 포스트의 한국어 버전과 영문 버전을 둘다 올리고 싶었다.

단순히 포스트를 두 개 작성해도 되지만, 글이 중복된 것처럼 보이거나 관리하기가 어려울 것 같았다.

좀 검색해봤더니 워드프레스를 다국어 사이트로 만들 수 있게 해주는 플러그인을 찾게 되어서 소개해보려고 한다.

<!--more-->
<blockquote>1. 설치</blockquote>
<img class="aligncenter size-medium wp-image-699" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.04.57-300x124.png" alt="" width="300" height="124">
워드프레스의 플러그인 중에 polylang 이라는 플러그인을 설치하면 손쉽게 사이트를 다국어 사이트로 만들 수 있다.

주요 기능은 다국어 글의 작성과 관리를 편하게 해주는 것이고, 사이트에서 다국어 메뉴를 선택할 수 있도록 한다.

플러그인 설치가 완료되면 관리자 메뉴에서 Languages 메뉴가 추가된 것을 확인할 수 있다.

<img class="aligncenter size-full wp-image-700" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.05.06.png" alt="" width="153" height="184">

해당 카테고리를 선택해보면 다양한 설정이 나온다. 여기서 추가하기 원하는 나라의 언어를 추가해주면 된다.
<blockquote>2. 설정</blockquote>
[caption id="attachment_701" align="aligncenter" width="840"]<img class="size-large wp-image-701" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.05.22-1024x664.png" alt="" width="840" height="545"> polylang의 설정화면[/caption]

Languages &gt; Languages에 들어왔을 때 화면이다. 여기서 먼저 사이트에 처음 나올 언어를 선택해준다.

한국어를 선택하면 나머지 빈칸에 기본 값으로 모두 설정되는 것을 볼 수 있다. Add new language버튼을 눌러 추가해준다.

그 다음, 자신이 원하는 추가 언어를 선택한다. 나는 English를 선택했다.

여기서 Order를 1로 선택해준다. Order는 나중에 언어선택 메뉴에서 가장 먼저 나오는 언어의 순서를 설정해준다.

언어를 설정해주면 관리자 메뉴 상단에 해당 국가의 언어와 국기가 나타나고 설정할 수 있게 된다.

<img class="aligncenter size-full wp-image-702" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.05.36.png" alt="" width="315" height="27">

<img class="aligncenter size-medium wp-image-703" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.05.55-300x60.png" alt="" width="300" height="60">

각 국가의 국기를 설정할 경우 페이지, 글작성 등에서 해당 언어로 작성된 페이지, 글을 확인할 수 있다.

Show all languages 선택 시에는 아까 추가한 언어로 작성된 페이지, 포스트를 모두 확인할 수 있다.

마지막으로 Strings translations 메뉴에서는 자신의 사이트에서 기본으로 지정해놓은 문장들을 다국어로 지정해놓을 수 있다.(사이트 제목 등)

[caption id="attachment_704" align="aligncenter" width="840"]<img class="size-large wp-image-704" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.06.13-1024x72.png" alt="" width="840" height="59"> 블로그의 소개글을 각 언어로 입력한 모습[/caption]

이외에 Settings Lingotek이라는 메뉴가 있지만 별도의 설정없이 기본값으로 사용해도 상관없으므로 그냥 사용한다.
<blockquote>3. 글작성</blockquote>
다음으로 글 작성 시에 다국어모드 사용이다. 다른 부분보다 이쪽 부분이 상당히 헷갈렸는데 다국어 모드라는게 어떻게 작동하는지 알게 되면 좀더 쉬울 것 같다.

다국어 글은 당연하지만 하나의 글이 아니라 작성한 언어의 글 수만큼 생성된다. 그리고 polylang 플러그인은 이 글을 연결시켜주고, 보여주는 역할을 담당한다.

[caption id="attachment_705" align="aligncenter" width="840"]<img class="size-large wp-image-705" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.06.59-1024x694.png" alt="" width="840" height="569"> Show all languages에서는 추가한 언어의 글 작성상황이 다 보인다[/caption]

먼저 Show all languages 선택이기 때문에 작성한 글의 각 언어 작성여부가 모두 보인다. 위 화면에서 '워드프레스 다국어 설정 - polylang플러그인 사용법' 글의 경우 한국어는 작성됨이고 영어는 작성되지 않은 상태이다.(체크표시가 발행됨 혹은 임시저장 상태, + 표시는 글이 없으니 추가해야함, 해당 글과 연동된 다른 언어 글이 존재함을 의미한다)

아래의 Chrome extension tutorial 글의 경우 캡쳐에서는 짤렸지만 하단에 '크롬 확장프로그램 튜토리얼'이라는 한국어 글이 나타난다.(둘 다 작성했기 때문)

Show all languages로 글 관리 시에 헷갈리니 Show all languages보다 한국어를 메인으로 세팅하고 글을 관리하는 편이 낫다.

[caption id="attachment_706" align="aligncenter" width="840"]<img class="size-large wp-image-706" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.07.18-1024x688.png" alt="" width="840" height="564"> 한국어를 제외한 다국어 글 작성여부가 보인다[/caption]

관리자 메뉴 언어를 한국어로 변경 시의 모습이다. 아까와 달리 한국어로 작성된 글들의 상태가 보이고 영어 글 작성여부는 +, 연필모양 두개로 확인할 수 있다.

+를 눌러서 영어 글 작성을, 연필 모양으로 이미 작성된 영어 글 수정이 가능하다.

[caption id="attachment_707" align="aligncenter" width="840"]<img class="size-large wp-image-707" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.07.34-1024x557.png" alt="" width="840" height="457"> 글 편집 모드 시의 화면[/caption]

글 편집 시에 한 번에 추가하기 위해서는 위의 화면에서 Languages에서 성조기 옆의 +버튼을 눌러 해당 글의 영어 버전을 작성하면 된다.

이미 작성한 영어글을 연동하고 싶으면 +옆의 빈칸에 해당 글 제목을 입력하면 된다. 글 관리화면과 마찬가지로 연동된 영어글이 이미 있다면 + 아이콘이 연필모양으로 나온다.

[caption id="attachment_708" align="aligncenter" width="840"]<img class="size-large wp-image-708" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.08.21-1024x540.png" alt="" width="840" height="443"> 워드프레스 다국어 설정 글의 영어 버전 글 작성 진입 시의 편집기 모습[/caption]
<blockquote>4. 메뉴 선택</blockquote>
이제 사이트에서 사용 언어를 변경할 수 있게 하는 메뉴를 추가해보자.

외모&gt;메뉴&gt;메뉴편집하기로 들어가서 '새로운 메뉴를 생성하세요'를 눌러 새 메뉴를 생성한다.

<img class="aligncenter size-full wp-image-709" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.09.00.png" alt="" width="626" height="194">

왼쪽의 페이지, 글 등에서 메뉴에 노출시키기 원하는 링크들을 선택해서 메뉴구조에 추가하고, Language switcher에서 메뉴에 추가 버튼을 누른다.

여기서 Displays flags 버튼으로 설정하면 해당 언어의 국기를 보여준다.

<img class="aligncenter size-large wp-image-710" src="/assets/wp-content/uploads/2017/07/스크린샷-2017-07-08-오후-1.09.15-1024x486.png" alt="" width="840" height="399">

마지막으로 메뉴 설정에서 기본 메뉴 한국어를 체크해준다.(한국어일 때 기본메뉴를 현재 설정한 메뉴로 해준다는 의미이다)

<img class="aligncenter size-full wp-image-711" src="/assets/wp-content/uploads/2017/07/-2017-07-08-오후-1.09.25-e1499533688491.png" alt="" width="830" height="173">

이제 다른 언어일 때 노출된 메뉴 역시 한국어와 똑같이 새로 추가해서 설정해주면 된다.

[caption id="attachment_712" align="aligncenter" width="839"]<img class="size-full wp-image-712" src="/assets/wp-content/uploads/2017/07/-2017-07-08-오후-1.09.41-e1499533394816.png" alt="" width="839" height="793"> 영어 메뉴 설정화면[/caption]

이렇게 설정하면 사이트에서 한영 전환이 가능해지는 것을 확인할 수 있다.

한 가지 고려해야하는 것은 글 작성 시의 영문 카테고리를 관리자 메뉴에서 English 선택 후 다시 작성해줘야 했다는 점이다.

카테고리 뿐 아니라 다른 모든 설정들도 마찬가지로 작성되지 않은 셈이기 때문에 polylang플러그인은 단순히 다국어 설정, 글의 관리와 노출을 편하게 해주는 정도이고 모든 콘텐츠는 수동으로 변환해야한다고 생각하면 편하겠다.

물론 이정도만 해도 직접 다국어 모드를 설정하는 것보다는 블로그 관리가 훨씬 간편해진다.