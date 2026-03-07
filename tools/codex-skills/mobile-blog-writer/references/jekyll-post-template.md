# Jekyll 포스트 템플릿

이 저장소의 글은 기본적으로 아래 front matter 구조를 따른다.

```md
---
layout: post
title: 제목
description:
tags: [tag1, tag2]
categories: [blog]
---
```

## 작성 규칙

- `layout`은 `post`로 둔다.
- `title`은 낚시성보다 구체성을 우선한다.
- `description`은 비워 둘 수 있지만, 사용자가 요청하면 1문장 요약으로 채운다.
- `tags`는 2~4개 정도로 제한한다.
- `categories`는 특별한 요청이 없으면 `blog`를 기본값으로 둔다.

## 본문 템플릿

```md
---
layout: post
title: 제목
description:
tags: [tag1, tag2]
categories: [blog]
---

첫 문단에서 글의 대상과 맥락을 소개한다.

## 첫 번째 소제목

핵심 내용 1

![이미지 설명](/assets/path/to/image.png){: width="350" class="normal"}

## 두 번째 소제목

핵심 내용 2

## 마무리

읽은 사람이 가져갈 포인트를 정리한다.
```

## 이미지 배치 규칙

- 이미지는 관련 문단 바로 뒤에 둔다.
- 이미지 설명은 `Desktop View` 같은 고정 문구 대신 내용 기반으로 쓴다.
- 이미지의 의미가 약하면 본문 연결 문장을 먼저 추가한다.
- 경로가 확정되지 않았으면 `TODO: 이미지 경로` 형태로 남겨도 된다.
