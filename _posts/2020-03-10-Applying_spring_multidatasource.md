---
layout: post
title: Spring MultiDatasource(Master/Slave) 연동 방법
description:
tags: [develop, spring, multidatasource]
categories: [develop, spring]
---

> RDBS를 쓰고 있는 개발 환경에서 multi datasource를 설정하여 DB를 사용해야하는 상황에서 Spring 설정방법
> 검색 결과 아래와 같은 세가지 방안이 있음

**1.DB proxy**

DB에 내장된 프록시 서버로 쿼리를 보내서 쿼리에 따라서 slave인지 master인지 분기가 되도록 함.

```
장점: 다양한 sql언어들이 이미 지원, 비교적 간편
단점: 분기 처리 로직이 어플리케이션단과 프록시 서버단에 나눠지게 됨
```

**2.Mysql Replication JDBC 드라이버 사용**

MySQL의 내장된 Replication JDBC 드라이버를 사용하여, setReadOnly 속성을 읽고 master/slave를 분기처리 할 수 있다.

```
장점: 매우 간편
단점: MySQL에서만 가능. 4.1이전 버전에는 에러가 있는듯 함
```

**3.Spring LazyConnectionDataSourceProxy + AbstractRoutingDataSource**

Spring의 Transaction Readonly 속성을 보고 분기처리. 대신에 LazyConnection을 통해 transaction시에 실제 datasource와 connection해주는 걸 지연시켜서 분기처리가 실행시 되도록 도와줘야 함

```
장점: 어플리케이션 단에서 처리 가능
단점: 모든 트랜잭션에 어노테이션 추가 필요
```

- 참고 

[http://egloos.zum.com/kwon37xi/v/5364167](http://egloos.zum.com/kwon37xi/v/5364167)
