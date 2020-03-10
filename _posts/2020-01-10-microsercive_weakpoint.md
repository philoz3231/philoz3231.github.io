---
layout: post
title: Micro Service 단점
description:
tags: [develop, microservice]
categories: [develop]
---

> 서비스 어플리케이션을 개발하면서 다들 마이크로 서비스는 한 번쯤 들어봤음직한 단어이다. 여기저기를 찾아봐도 좋다는 이야기만 들었지 실제로 사용했을 때 어떠한 단점이 발생할 수 있을 지 정리해봤다

### Micro service의 개념
- 대규모 프로젝트를 각 기능별 모듈로 쪼개서 `독립적` 으로 수행하도록 하는 것이 Micro service임
- 각 Micro service는 분리됨으로써 dependency를 낮추고 scalability를 높이면서 서비스를 수행할 수 있게 함.
- 개별 서비스 간의 통신에는 REST API 등으로 원하는 정보를 주고 받음

### 생각나는 단점
- 이 가운데서 `atomic한 transaction`이 요구될 경우 서비스가 쪼개져 있기 때문에 문제가 될 수 있음
- 또한, 하나의 request에서 여러 모듈의 response가 필요할 경우 `퍼포먼스` 문제가 발생할 수 있음
  - 데이터를 각 모듈별로 가지고 있다면, 효율적인 데이터 트랜잭션이 어려워질 수 있음
  - 그러나 근본적으로 각 모듈별 통신이 필요하기 때문에, 필연적으로 모듈 내 통신으로 인한 `latency`가 발생

- 참고

[MSA의 개념-https://bcho.tistory.com/m/948](https://bcho.tistory.com/m/948)