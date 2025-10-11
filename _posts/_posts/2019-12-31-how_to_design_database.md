---
layout: post
title: 데이터베이스 설계 시 고려사항
description:
tags: [develop, database]
categories: [develop, database]
---

> 신규 요건의 데이터베이스 설계 중에 기억할 만한 것들이 있어서 적어둔다. 나중에 하나하나 자세히 공부해봐야겠다

***

1. 많은 양 + 컬럼의 데이터는 NoSQL이 더 적절(향후 다양하게 활용 가능)

2. SQL이 나오고 DB 테이블 컬럼이 적용될 수 있음. 즉 어떤 데이터를 뽑아서 어디에 쓸지가 결정되어야 함

3. 굳이 RDBMS로 많은 양의 데이터를 처리한다면, 조건별 샤딩 or 해시를 이용

4. NoSQL에 몽고디비나 AWS의 DynamoDB 이용 가능