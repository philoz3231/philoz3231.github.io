---
layout: post
title: WordPress to Jekyll
description:
tags: [develop]
categories: [develop, wordpress]
---

> 워드프레스를 이용하다가 지킬을 사용하는 깃헙페이지로 블로그를 옮기기 위해 좀 고생했다;;
> 미리 제공되는 export 툴을 사용했더라면 훨씬 쉬웠을 텐데, 이미 서버와 이미지를 모두 지운터라서 아래와 같은 단계로 해결했다.



**1. 상황**

AWS lightsail에 올라간 워드프레스 이미지, 스냅샷 모두 삭제됨. 워드프레스 플러그인 중 All-in-one-migration 툴로 export 시킨 xxx.wordpress 파일만 남아있는 상태

**2. wordpress 파일 압축을 해제해서 긁어넣을까**

구글링을 통해 .wordpress 파일 압축해제 툴을 깃헙에서 내려받아 실행해보았지만, 압축해제된 파일을 일일이 찾아서 옮기기엔 무리라서 fail

**3. wordpress.com을 이용해서 .worpress 파일을 jekyll로 export 시키자**

wordpress.com을 생성했지만, wordpress.com을 이용하면 추가 플러그인이 모두 유료였다는 걸 몰랐다..
심지어 한두푼도 아니라 꽤 비쌌던 것 같았다(일회성으로 export 시키기엔 너무 부담스러움) 

**4. 로컬 서버로 임시로 wordpress를 생성해서 .wordpress 파일을 실행해보자**

결국 최후의 방법으로 로컬 서버에서 wordpress를 설치하고 돌려서 해당 .wordpress 파일을 import 시키고 블로그를 복원하는데 성공했다!
라고 좋아하던 순간, 비밀번호를 잊어먹어서 다시 좌절...ㅠㅠ

그러나 퍼뜩 사용자 아이디/암호 역시 로컬 DB에 저장된 형태일 것이라 생각하고 DB단에서 임의의 비밀번호를 요건에 맞게(md2 였나?) encrypt하여 직접 변경해주어서 로그인에 성공.

***

그 이후로는 일사천리로 jekyll로 export 시키는 플러그인을 설치하여 export 시키고, 현재 폴더 구조에 맞게 포스팅을 옮겼다.


역시 무언가를 하기 전에 좀 더 사전조사나 계획을 철저히 세우는게.. 나중에 덜 힘들다는 걸 뼈저리게 깨닫게 한 블로그 이사후기였다ㅠㅠ