---
id: 129
title: 'AWS lightsail에 워드프레스 설치 &#8211; 3'
date: 2017-07-03T03:38:47+09:00
author: luis
layout: post
guid: http://localhost/wordpress/?p=129
permalink: '/2017/07/03/aws-lightsail%ec%97%90-%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4-%ec%84%a4%ec%b9%98-3/'
image: /assets/wp-content/uploads/2017/07/2017-07-03-오전-1.33.07-1200x551.png
tags: [develop]
categories: [develop, wordpress]
---
<blockquote>3-2. 도메인 연결</blockquote>
이제 lightsail에 내가 구매한 도메인이 있다는 사실을 알려주고 해당 도메인과 sub domain을 생성된 인스턴스 중에 어디로 연결시킬 지 설정하면 된다.

<!--more-->

<img class="alignnone size-full wp-image-579" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-2.23.13.png" alt="" width="605" height="476">
lightsail의 메인화면에서 DNS Zone을 클릭하고 Create DNS Zone 버튼을 누른다.

<img class="alignnone size-full wp-image-580" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-2.23.40.png" alt="" width="1022" height="822">
여기서 도메인 네임 서비스(DNS)를 관리할 수 있게 하는 것이다. example.com이라고 쓰인 빈칸에 내가 구매한 도메인 주소를 입력하면 된다.

그 후 Create 버튼을 클릭하면

<img class="alignnone size-full wp-image-581" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-2.24.29.png" alt="" width="519" height="150">
이 같이 DNS 설정이 생성된 것을 확인할 수 있다. 이 설정을 클릭하면 상세설정이 가능하다.

<img class="alignnone size-full wp-image-574" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.44.26.png" alt="" width="774" height="479">
DNS records 에서 Add another를 통해 아까 설정했던 도메인과 sub domain을 모두 입력하고 워드프레스의 ip주소를 입력한다.
이를 통해 lightsail에 "이런 이런 도메인 주소는 이 아이피로 이동시켜!"라고 알려주는 것이다.

그리고 아래 Nameservers라고 되어있는 주소들을 가비아의 네임서버에 등록해주면 된다.
네임서버를 등록하는 과정은 위와 같은 일을 하기 위해서 AWS의 도메인 관리 서버가 일을 할 수 있도록 도메인과 AWS의 서버를 이어주는 것이다.

가비아 페이지에서 네임서버 버튼을 클릭하면 아래 같은 화면이 나온다.
<img class="alignnone size-large wp-image-575" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.44.41-1024x349.png" alt="" width="840" height="286">
여기에 나오는 네임서버 입력란에 아까 lightsail에서 본 주소를 모두 입력하면 등록과정이 끝난다.

호스팅을 가비아가 아닌 AWS에서 했기 때문에 가비아 서버가 아니라 AWS서버가 도메인 관리를 담당할 수 있도록 (네임)서버의 주소를 교체해주는 것이다.
<blockquote>4. Static IP</blockquote>
lightsail 기능 중에 Create static IP라는 기능이 있었다.
<img class="alignnone size-full wp-image-579" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-2.23.13.png" alt="" width="605" height="476">

이것은 고정 IP를 할당한다는 뜻이다. 지금 lightsail에 생성된 서버는 동적인 서버주소를 갖는다. 이 말은 사용자가 서버를 껐다키거나 혹은 오류가 나서 재작동을 할 때 IP주소가 변경된다는 뜻이다.

이렇게 되면 기존의 IP주소를 토대로 DNS가 작동하므로 바뀐 IP주소를 다시 lightsail과 가비아 페이지에 재입력해주어야하는 번거로움이 생긴다.

이를 막기 위해 고정 IP를 생성할 수 있게 한 것이다.

<img class="alignnone size-large wp-image-577" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.45.22-1024x719.png" alt="" width="840" height="590">
lightsail 홈에서 Create static IP 버튼을 클릭하면 내가 만든 인스턴스 중에 고정IP를 할당할 수 있는 인스턴스가 자동으로 추가된다.(현재화면에선 이미 추가했기 때문에 추가할 인스턴스가 없다고 나옴)

원하는 고정IP설정 이름을 써주고 생성해주면 아래 같이 기존의 IP주소가 아닌 고정 IP로 lightsail 인스턴스가 작동함을 알 수 있다.

<img class="alignnone size-full wp-image-578" src="/assets/wp-content/uploads/2017/07/2017-07-03-오전-1.45.29.png" alt="" width="525" height="224">