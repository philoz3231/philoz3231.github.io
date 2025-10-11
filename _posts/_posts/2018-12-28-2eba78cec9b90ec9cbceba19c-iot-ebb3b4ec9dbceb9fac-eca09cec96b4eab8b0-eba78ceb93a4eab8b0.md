---
id: 1124
title: 2만원으로 IoT 보일러 제어기 만들기
date: 2018-12-28T16:59:09+09:00
author: philoz
layout: post
guid: http://localhost/wordpress/?p=1124
permalink: '/2018/12/28/2%eb%a7%8c%ec%9b%90%ec%9c%bc%eb%a1%9c-iot-%eb%b3%b4%ec%9d%bc%eb%9f%ac-%ec%a0%9c%ec%96%b4%ea%b8%b0-%eb%a7%8c%eb%93%a4%ea%b8%b0/'
enclosure:
  - |
    http://localhost/wordpress/wp-content/uploads/2018/12/KakaoTalk_Video_2018-12-27-17-04-56.mp4
    7472582
    video/mp4
    
image: /wp-content/uploads/2018/12/microbots-push-screen7-item-on-light-switch-with-device-1024x768-1-360x270.png
tags: [develop]
categories: [develop, arduino]
---
<!-- wp:paragraph -->
<p>최근 이것저것 IoT 제품들을 구매하여 스마트홈을 구축해보고 있었지만, 제일 필요했던 것은 보일러 제어기였다.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>물론 IoT가 지원되는 보일러를 구매하거나 IoT 제어용 컨트롤러를 구매하여 부착하면 되지만, 원룸 보일러를 내 맘대로 고칠 수는 없는 노릇...</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>컨트롤러 같은 경우에도 가격이 상당한 지라 구매하기가 망설여졌다.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1128,"align":"center","linkDestination":"custom"} -->
<div class="wp-block-image"><figure class="aligncenter"><a href="https://microbot.is/ko/push/"><img src="/assets/wp-content/uploads/2018/12/microbots-push-screen7-item-on-light-switch-with-device-1024x768-300x225.png" alt="마이크로봇 푸쉬" class="wp-image-1128"/></a><figcaption>아날로그 버튼을 누르게 해주는 기존 IoT기기(마이크로봇 푸쉬)</figcaption></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>고민을 하다가 마이크로봇 푸시 or 스위치봇 같은 아날로그  버튼 제어 기기를 살까 싶었지만, 그 역시도 기기+허브 가격이 15만원 대라서 구매하기엔 너무 아까웠다.(허브가 10만원이라 배보다 배꼽이 훨씬 더 컷다)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>고민을 거듭하다가.. 혼자서 어떻게든 만들어볼 수 있지 않을까 싶어서 부품을 알아보기 시작!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>몇 년전만 하더라도 아두이노에 wifi를 연결하기 위해서는 wifi쉴드를 비싼 가격에 구매해야했던 걸로 아는데 요즘엔 wifi모듈이 결합된 호환 모듈이 딱 있었다!</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1129,"align":"center"} -->
<div class="wp-block-image"><figure class="aligncenter"><img src="/assets/wp-content/uploads/2018/12/113990105_1_1024x1024-300x225.jpg" alt="" class="wp-image-1129"/><figcaption>nodemcu 모듈</figcaption></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>nodemcu모듈 - 단돈 7천원 가량에 mcu + wifi 역할을 모두 할 수 있었다.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>여기에 직접 버튼을 누를 모터를 고민하다가 가격도 저렴하고 부착이 용이할 것 같은 서보모터로 결정. 버튼을 누를 힘이 되는 토크(Torque)를 고민하다가 3kg의 넉넉한 파워로 결정했다.(완성되고 보니 조금 더 약한 힘으로도 충분히 가능할 듯 하다)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>집 안에 무선공유기와 연결하고..</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>서보모터와 연결해서 외부에서도 작동이 가능하도록 만들어준다.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>이제 보일러 컨트롤러에 고정하여 버튼을 제대로 누르게만 만들면 된다. 평소에 외출을 누르고 다니고 집에 돌아와서는 외출을 끄면서 보일러를 사용하기 때문에 그 위치에 맞춰서 서보모터를 고정시켰다.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1130,"align":"center","width":279,"height":372} -->
<div class="wp-block-image"><figure class="aligncenter is-resized"><img src="/assets/wp-content/uploads/2018/12/KakaoTalk_Photo_2018-12-27-17-05-07-225x300.jpeg" alt="" class="wp-image-1130" width="279" height="372"/><figcaption>모터에 달린 horn이 외출버튼을 누르게 위치 조절</figcaption></figure></div>
<!-- /wp:image -->

<!-- wp:video {"id":1131} -->
<figure class="wp-block-video"><video controls src="/assets/wp-content/uploads/2018/12/KakaoTalk_Video_2018-12-27-17-04-56.mp4"></video><figcaption>작동영상</figcaption></figure>
<!-- /wp:video -->

<!-- wp:paragraph -->
<p>생각보다 고정도 잘되었고, 연동도 잘된다. 소모전류와 혹시 모를 전기 사고를 예방하기 위해서  사용용도를 찾아 헤메던 집 안의 스마트콘센트를 연결해주어서, 사용 시에만 전기가 흐를 수 있도록 세팅해주었다.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1132,"align":"center","width":433,"height":325} -->
<div class="wp-block-image"><figure class="aligncenter is-resized"><img src="/assets/wp-content/uploads/2018/12/KakaoTalk_Photo_2018-12-27-17-05-11-300x225.jpeg" alt="" class="wp-image-1132" width="433" height="325"/><figcaption>완성 후 선 정리 모습</figcaption></figure></div>
<!-- /wp:image -->

<!-- wp:code -->
<pre class="wp-block-code"><code>//서보모터 작동예시
#include &lt;Servo.h> 
 
int servoPin = 2;

Servo servo; 

int angle = 0; // servo position in degrees 

void setup() 
{ 
    servo.attach(servoPin); 
} 


void loop() 
{ 
  // scan from 0 to 180 degrees
  for(angle = 0; angle &lt; 120; angle++) 
  { 
    servo.write(angle);
    delay(15); 
  } 
  // now scan back from 120 to 0 degrees
  for(angle = 180; angle > 0; angle--) 
  { 
    servo.write(angle);
    delay(15); 
  } 
} </code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>//WiFi 연결 후 웹사이트 버튼 클릭으로 서보모터 제어예시
#include &lt;ESP8266WiFi.h>
#include &lt;Servo.h>

const char* ssid = "{와이파이 이름}";
const char* password = "{와이파이 비밀번호}";

int servoPin = 2;
Servo servo;
int angle = 0;
int value = LOW;

WiFiServer server(80); //웹서버용 포트 번호

void setup() {
  Serial.begin(9600);
  delay(100);
  servo.write(0) //서보모터 전원 on 시에 초기값 조절
  servo.attach(servoPin);
  
  //와이파이 네트워크에 접속
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("WiFi Connected!");

  //웹서버 개시
  server.begin();
  Serial.println("Server started");

  //접속할 IP주소 표시
  Serial.print("Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
  Serial.println("");
  
}

void loop() {
  //클라이언트가 접속되었는지 확인
  WiFiClient client = server.available();
  if(!client){
    return;
  }

  //클라이언트가 데이터를 보낼 때까지 기다림
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }

  //리퀘스트의 첫 번째 줄을 읽어들임
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();

  //리퀘스트에 따른 Servo제어
  if(request.indexOf("/BOILER=clicked") != -1){
    for(angle=0; angle&lt;55; angle++){
      servo.write(angle);
      delay(15);
    }
    for(angle=55; angle>0; angle--){
      servo.write(angle);
      delay(15);
    }
    if(value){
      value = LOW;
    } else{
      value = HIGH;
    }
  }

  //클라이언트 리퀘스트에 대한 응답메세지
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("");
  client.println("&lt;!DOCTYPE HTML>");
  client.println("&lt;html>");
  client.println("BOILER is turned ");
  if(value)
    client.print("On");
  else
    client.print("Off");
  client.println("&lt;br>&lt;br>");
  client.println("&lt;a href=\"/BOILER=clicked\"\">&lt;button>Turn On&lt;/button>&lt;/a>");
  client.println("&lt;/html>");

  delay(1);
  Serial.println("Client disconnected!!");
  Serial.println();



  
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>IoT보일러 프로젝트(?)를 진행하면서 알게 된 몇가지 사실이 있다</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>1. 서보모터의 초기값을 제어할 수 있다. <br>servo.attach 전에 servo.write를 해두면 전원이 켜지면서 서보모터가 돌아가는 것을 막을 수 있다. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>2. 정확하게는 모르지만, delay값에 따라서 서보모터의 작동여부가 조절될 수 있다. 움직이는 앵글에 비해 delay 값이 너무 작으면 속도를 맞추지 못해 서보모터가 아예 작동을 안하는 것 같다.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>3. 고속 휴대폰 충전기로도 아두이노 전원공급에 문제가 없다. 전기쪽을 잘 몰라서 몰랐지만 출력이 5v이상이지만 mcu 쪽의 전압변환기(?)를 통해 5v로 전기가 들어오는 듯하다. 문제없이 잘 작동한다.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>한가지 아쉬운 점은 버튼이 현재 클릭된 상태인지가 애매하다는 것...향후 조도센서 등을 통해서 현재 외출 버튼이 눌렸는지 확인하는 기능도 추가해야할 것 같다.</p>
<!-- /wp:paragraph -->