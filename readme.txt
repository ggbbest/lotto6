select @@global.time_zone, @@session.time_zone,@@system_time_zone;
SET GLOBAL time_zone='+09:00';
SET time_zone='+09:00';
commit

Node+Express 서버와 React 연동하기
https://codingapple.com/unit/nodejs-react-integration/

1. 작업폴더를 에디터로 오픈 한 뒤에 터미널을 열어서 npm init 입력 후 뭐 선택하라고 하면 엔터 여러번 
2. npm install express 입력  

yarn add express
yarn add mysql
yarn add cors
yarn add dotenv
3. server.js 파일을 만드시고 다음 코드 작성

npx create-react-app lotto

깃이상으로 마스터 소스받아옴
2022-03-08 lotto
1장 1klay
1장 최대 5게임
1게임당 번호 6개

총 당첨금은 로또 전체 판매액의 50%이며, 42% 이상은 복권기금으로 활용됩니다.
1, 2, 3등 당첨금은 해당 회차의 총 판매액에 의해 결정되며, 
등위별 해당금액을 당첨자 수로 나누어 지급합니다.


당첨방법
1등 : 6개 번호 일치
2등 : 5개 번호 일치 + 보너스 번호일치
3등 : 5개 번호 일치
4등 : 4개 번호 일치
5등 : 3개 번호 일치

당첨확률
1등: 1 / 8,145,060
2등: 1 / 1,357,510
3등: 1 / 35,724
4등: 1 / 733
5등: 1 / 45

당첨금의 배분 비율
1등: 총 당첨금 중 4등, 5등 금액을 제외한 금액의 75%
2등: 총 당첨금 중 4등, 5등 금액을 제외한 금액의 12.5%
3등: 총 당첨금 중 4등, 5등 금액을 제외한 금액의 12.5%
4등: 50,000원 --> 50klay
5등: 5,000원 --> 5klay

