---
layout: post
title: Builder패턴에서 Mybatis mapper 이용법 정리
description:
tags: [develop, mybatis]
categories: [develop, mybatis]
---

> Builder 패턴을 사용한 DTO클래스에서 Mybatis를 이용해 select해오던 중 'No constructor...' error가 발생했다
> 구글링을 해보니 아래와 같은 해결방법이 있어서 정리.. 
> 간단하게는 Private으로 기본 생성자를 만들어주는게 가장 속편하겠다

**1. 기본 생성자를 private으로 만들어줌**

빌더 패턴을 사용하여 불변 객체로 만들어준 객체에, 다시 접근가능한 기본 생성자를 만들어주기는 싫고.. 커스텀 objectFactory를 만들어 Mybatis가 인식하게 할 만큼 귀찮을 때는 아래처럼 처리하는게 젤 속편할 듯 하다

```java
public class Outer {
   private int a;
   private int b;

   private Outer() {} // 디폴트 생성자

   // 인스턴스 생성 메소드
   public static Outer create(int a, int b) {
      Outer out = new Outer();
      out.a = a;
      out.b = b;
      return out;
   }
   // getter..
} 
```
참고:
[https://marobiana.tistory.com/119](https://marobiana.tistory.com/119)


**2.Mybatis constructor를 이용해 Builder 객체를 만든 후 외부에서 생성**

참고 코드에서 작성자는 Mybatis constructor를 통해 builder를 생성한 후, stream을 이용해 row들을 list로 받아 처리하고 있다

```xml
<resultMap id="Person" type="com.xyz.domain.Person$PersonBuilder">
    <constructor>
        <idArg name="id" column="id" />
        <arg name="firstName" column="first_name" />
        <arg name="lastName" column="last_name" />
    </constructor>
    <result property="middleName" column="middle_name" />
    <result property="address" column="address" />
    <result property="country" column="country" />
</resultMap>
```

이후 호출부에서 아래와 같이 선언

```java
personBuilderList.stream().map(Person.PersonBuilder::build).collect(toList())
```
참고:
[https://stackoverflow.com/questions/51914016/mybatis-resultmap-with-a-builder-in-the-pojo](https://stackoverflow.com/questions/51914016/mybatis-resultmap-with-a-builder-in-the-pojo)

**3. custom objectFactory 선언**

Mybatis가 사용하는 ObjectFactory를 Override 시켜서 선언하면 사용이 가능하다. 2번과 비슷하지만 stream과정을 factory 클래스에서 처리한다고 생각하면 될것 같다
(이 코드는 아직 확인해보지 않았으니 사용시 확인 필요)

```java
public class MyObjectFactory extends DefaultObjectFactory {

    private static final long serialVersionUID = 1L;

    @Override
    public <T> T create(Class<T> type) {
        System.out.println("create:" + type);
         if (type.equals(PersonBuilder.class)){
             PersonBuilder personbuilder = (PersonBuilder)super.create(type);
             Person person = personbuilder.build();
             return (T) person;
         }
        return super.create(type);
    }
    
    ... omit...
}
```

configuration에 위의 선언된 팩토리의 사용을 선언해야한다

```xml
<objectFactory type="com.mybatis.myObjectFactory.MyObjectFactory"> 
            <property name="name" value="MyObjectFactory"/> 
</objectFactory>
```
참고:
[https://developpaper.com/object-factory-of-mybatis/](https://developpaper.com/object-factory-of-mybatis/)

> Mybatis의 mapper는 objectFactory를 이용해 객체를 생성하고, reflection을 통해 데이터를 바인딩한다고 한다

[mybatis 문서](http://devdoc.net/javaweb/mybatis/mybatis-3.3.0-site/ko/configuration.html#objectFactory)

[ObjectFactory 설명](https://developpaper.com/object-factory-of-mybatis/))

