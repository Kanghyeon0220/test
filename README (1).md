# Lemonade For All 🍋

청소년이 주도하는 비영리 단체 **레모네이드 포 올(Lemonade For All)** 의 공식 웹사이트입니다.
캄보디아 아동 보호시설에 의류·보건 물품을 전달하고, 모든 기부금의 사용 내역을 공개합니다.

- 설립: 2025년 12월 23일
- 활동: 캄보디아 물품 지원(Lemonade For Cambodia), 기부 인식 캠페인
- 문의: lfageneralx@gmail.com

## 페이지 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 홈 — 소개, 실적 숫자, 프로젝트, 최근 소식, 후원금 사용 기준 |
| `about.html` | 단체 소개 — 개요, 미션·비전, 핵심 가치, 아동 보호 원칙, 팀 |
| `activity.html` | 활동 — 프로젝트, 활동 소식, 사진 |
| `project-cambodia.html` | Lemonade For Cambodia 상세 |
| `project-campaign.html` | 기부 인식 캠페인 상세 |
| `transparency.html` | 투명성 — 사용 기준, 정산 내역 표, 보고서 |
| `donate.html` | 후원하기 — 금전·물품·봉사 |
| `404.html` | 없는 주소로 들어왔을 때 보이는 페이지 |
| `projects.html`, `news.html`, `gallery.html` | 예전 주소 → `activity.html`로 자동 이동 |

## 폴더 구조

```
css/style.css     모든 스타일 (색상은 맨 위 :root 변수에서 변경)
js/data.js        ★ 사이트 내용 데이터 — 소식·사진·정산·팀·계좌 등
js/i18n.js        영어 번역 사전 (한국어 원문은 각 HTML 안에 있음)
js/site.js        공통 헤더/푸터, 모바일 메뉴, 한/영 전환, 화면 그리기
images/           로고, 아이콘, 공유 이미지 (원본 로고는 images/source/)
images/gallery/   활동 사진
reports/          보고서·영수증 PDF
```

## 자주 하는 작업

**새 소식 올리기** — `js/data.js`의 `news` 배열에 항목 하나를 추가합니다. 날짜순 정렬과 홈 화면 반영은 자동입니다.

**사진 올리기** — `images/gallery/`에 사진을 넣고 `data.js`의 `gallery`에 추가합니다. 사진이 하나도 없으면 사진 영역은 자동으로 숨겨집니다.

**정산 내역 공개** — `data.js`의 `ledger`에서 `null`로 된 금액·수량을 채웁니다. 모든 금액이 채워지면 합계가 자동 계산되고 상태가 "정산 완료"로 바뀝니다.

**팀 소개·SNS·계좌·봉사 신청 폼** — `data.js`의 `team`, `org.social`, `donate.bankAccount`, `donate.volunteerFormUrl`을 채우면 해당 영역이 나타납니다.

**문구 고치기** — 한국어는 해당 HTML 파일에서, 영어는 `js/i18n.js`에서 같은 키(`data-i18n="키"`)를 찾아 고칩니다.

## 로컬에서 보기

```bash
# 이 폴더에서
python3 -m http.server 8080
# 브라우저에서 http://localhost:8080
```

## 배포 후 할 일

- 도메인이 정해지면 각 HTML의 `og:image`를 `https://도메인/images/og-image.png` 같은 **전체 주소**로 바꿔 주세요. (카카오톡·SNS 공유 미리보기에 필요)
- 도메인이 정해지면 `sitemap.xml`을 추가하고 `robots.txt`에 경로를 적어 주세요.
- 방문자 분석이 필요하면 Google Analytics 등의 코드를 각 HTML `<head>`에 추가하세요.
