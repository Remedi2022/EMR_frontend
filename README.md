## 1. 서류 발급 필요 없는 보험금 청구 자동화, REMEDi

REMEDi는 서류 발급과 보험금 청구 과정을 생략하여 환자에게 편리함을 제공하고자 하는 프로젝트입니다.

<details>
<summary>REMEDi 이름 알아보기</summary>
<div markdown="1">
REMEDi는 원격을 의미하는 remote와 의료를 의미하는 medical에서 따온 이름입니다.
<br/>
처리 방안, 해결책, 치료약이라는 뜻을 가진 단어 remedy와도 유사하여,
<br/>불편한 보험금 청구 과정을 해결해 줄 서비스라는 의미 또한 담았습니다.
</div>
</details>

<br/>

## 2. 실행하는 방법
### 개발환경 실행
npm start

### 빌드
npm run build
<br/>
npm install -g serve
<br/>
npx serve -s build

<br/>

## 3. 사용하는 기술

- **코어**: React
- **분산 버전 관리**: Git with Github-flow
- **협업**: Github

<details>
<summary>System Design</summary>
<div markdown="1">

<br/>
- Tools
<br/>
![tools](https://user-images.githubusercontent.com/102170253/207873673-352e742a-cf4f-4080-a1ef-233ef40834b8.png)
<br/>
- System design
![sys design](https://user-images.githubusercontent.com/102170253/207918278-25e8cd9f-85ab-4591-8b5f-ecf18c8c677b.png)

</div>
</details>

<br/>

# 4. EMR 주요 기능

![emr_home](https://user-images.githubusercontent.com/102170253/207537231-498200df-b95a-4f9d-9679-7e08e5d2dde3.png)
<br/>

### 4.1. 원무 (원무과)

|                       신환 등록                              |                     환자 접수                    |
| :----------------------------------------------------------: | :----------------------------------------------: |
|          신환 등록하기 → 환자 정보 작성 → 환자 등록           |  환자 이름 검색 → 접수 정보 기입 → 환자 접수 |
| ![administration_home](https://user-images.githubusercontent.com/102170253/207537274-3f4a3b1b-ea71-49e8-a6bc-3697c5878989.png) | ![searching_patient](https://user-images.githubusercontent.com/102170253/207537271-bd6adbab-27bc-485d-93cf-450d834a0141.png) |
| ![register_new](https://user-images.githubusercontent.com/102170253/207537268-eaab742b-ada8-45ac-9bd6-85015767dcdb.png) | ![reception](https://user-images.githubusercontent.com/102170253/207537263-4ba78a0a-90b7-46c7-a33c-7c1b9a8ea477.png) |

<details>
<summary>자세히</summary>
<div markdown="1">

  - 환자의 정보를 기입하여 신규환자를 등록합니다.
  - 환자의 보험정보, 접수정보, 바이탈 싸인을 기입하여 접수를 완료합니다.
</div>
</details>

<br/>

### 4.2. 진료 (의료진)

|                         진료                         |                         MD 등록                         |
| :--------------------------------------------------: | :-----------------------------------------------------: |
|    진료 기록 작성 → 처방 및 진단 → 진료 완료  |     제품 정보 입력 → 등록     |
| ![chart_start](https://user-images.githubusercontent.com/102170253/208050235-0a17d8f0-de4d-490e-9f1a-c5d0ff8eefb6.png)![examination](https://user-images.githubusercontent.com/102170253/207537277-d09d1ed9-137b-48fc-91d7-f12980ce5fe5.png) | ![md_register_1](https://user-images.githubusercontent.com/102170253/207537287-4a65b00f-e966-4409-a654-3bfe263c7fa0.png) ![md_register_2](https://user-images.githubusercontent.com/102170253/207537292-4beaae22-b26e-45a4-9c84-9ef5478be099.png) |

<details>
<summary>자세히</summary>
<div markdown="1">

  - 진료화면의 왼쪽 내원이력을 클릭하여 환자의 이전 내원이력을 확인할 수 있습니다.
  - 진료화면의 오른쪽 MD 리스트에서 항목을 클릭하여 MD를 처방할 수 있습니다.
  - 진료홈에서 새로운 MD를 직접 등록할 수 있습니다.

</div>
</details>

<br/>

### 4.3. 원무 (원무과)

|                     수납                     |
| :----------------------------------------------------------: |
| 수납 진행하기 → 수납 완료  |
| ![payment_1](https://user-images.githubusercontent.com/102170253/207537296-b6b6f870-a74a-4df9-864a-dc895037ee4b.png) ![payment_2](https://user-images.githubusercontent.com/102170253/207537255-3fd4c7df-089c-4da5-86cd-c4b12330fb32.png) |

<div markdown="1">

  - 진료가 완료된 환자의 수납정보를 확인하고 수납을 완료합니다.

</div>

<br/>

# 5. 프로젝트 팀원

| [박선민](https://github.com/miiiniii) | [우성주](https://github.com/seongjoow) | [이연수](https://github.com/yeonsu97) |
|              EMR Web Page             |              EMR Web Page             |      Insurance Company Web Page       |

<br/>



