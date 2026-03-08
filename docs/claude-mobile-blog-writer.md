# Claude용 모바일 블로그 작성 커맨드

이 저장소에는 Claude Code에서 바로 사용할 수 있는 프로젝트 커스텀 slash command를 추가했다.

- 커맨드 파일: `/.claude/commands/mobile-blog-writer.md`
- 실행 이름: `/mobile-blog-writer`

## 사용 예시

### 1. 글감만 던지고 인터뷰로 시작

```text
/mobile-blog-writer 교토 첫날 여행 글 쓰고 싶어. 모바일에서 답하기 쉽게 필요한 것만 하나씩 물어봐줘.
```

### 2. 구조화된 입력으로 바로 작성

```text
/mobile-blog-writer
주제: 맥북 배터리 교체 후기
독자: 교체 고민 중인 사람
톤: 담백하고 정보성 있게
핵심 메모:
- 예약은 쉬웠음
- 수리 시간은 예상보다 길었음
- 비용은 비쌌지만 만족도는 높았음
이미지:
1. 접수 화면 - 진행 과정 소개
2. 교체 후 배터리 정보 - 결과 강조
이 블로그에 올릴 Jekyll 포스트 형식으로 작성해줘.
```

### 3. 파일까지 저장

```text
/mobile-blog-writer 지난 주말 아이패드로 블로그 초안 쓴 경험을 글로 쓰고 싶어. 하나씩 물어봐줘. 최종본은 _posts에 저장해줘.
```

## 동작 방식

- 입력이 짧으면 인터뷰 모드로 시작한다.
- 질문은 한 번에 하나만 한다.
- 정보가 충분해지면 Jekyll 포스트 초안을 만든다.
- 사용자가 원하면 `_posts/YYYY-MM-DD-slug.md`로 저장한다.

## 참고

Anthropic 공식 문서의 현재 공개 기준으로, Claude Code 프로젝트 확장은 `.claude/commands/` 아래 마크다운 파일을 두는 custom slash command 방식이 문서화돼 있다.

- [Anthropic Common Workflows: Create custom slash commands](https://docs.anthropic.com/en/docs/claude-code/common-workflows)
