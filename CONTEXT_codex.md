# CONTEXT_codex

## 프로젝트 목적

Blue Verse 포트폴리오 사이트를 한 단계 더 차분하고 신뢰감 있게 다시 정리한다.
이번 패스의 핵심은 "정보를 더 넣는 것"이 아니라 "큰 로고와 핵심 메시지가 버틸 수 있도록 화면을 비우는 것"이다.

## 이번 세션 범위

- 헤더 바의 로고를 실제 PNG 자산 기준으로 더 크게 반영한다.
- 현재 사이트의 과도한 카드 반복, 칩 반복, 보조 패널 반복을 줄인다.
- `index.html`과 `about.html`의 섹션 수와 정보 밀도를 낮춘다.
- 한국어 카피를 더 차분하고 신뢰감 있는 톤으로 다시 작성한다.
- `SUIT` 웹폰트는 유지한다.
- `hero_glass_mac.png`는 계속 사용하지 않는다.

## 현재 문제 인식

- 첫 화면이 Hero, proof card, problem strip, CTA, featured intro까지 동시에 보여 줘 과밀하게 느껴진다.
- `surface-glass`, `surface-panel`, metric box, chip, preview item이 비슷한 위계로 반복돼 시선이 분산된다.
- 프로젝트 라이브러리는 overview, filters, cards가 한 번에 쏟아져 판단 포인트가 많다.
- About 페이지는 3열 카드와 통계 패널이 반복돼 읽기보다 스캔 피로가 먼저 온다.
- 헤더는 작은 로고와 많은 캡슐형 요소가 겹쳐 브랜드 존재감보다 UI 장식이 먼저 보인다.

## 리디자인 방향

### 구조 방향

- Home: `Hero -> Featured 3 -> Project Library -> Compact Method/Trust Strip -> CTA`
- About: `Hero -> Positioning -> Process -> Coverage -> CTA`
- Home과 About 모두 "섹션 수는 줄이고, 각 섹션 안의 내부 박스 수는 더 크게 줄인다"

### 시각 방향

- 더 넓은 여백
- 더 적은 glass
- 더 적은 칩
- 더 큰 로고
- 더 명확한 텍스트 위계
- 더 조용한 배경

### 콘텐츠 방향

- 과장형 표현보다 구조·근거·태도 중심 문장 사용
- 한국어 헤드라인은 짧고 단정하게 유지
- "무엇을 많이 했다"보다 "어떤 운영 문제를 다뤘다"가 먼저 보이게 정리

## 로고 자산 기준

- `assets/1Asset 3@3x.png` : 593x117
- `assets/BLUEVERSE.png` : 842x595
- 헤더에는 가로형 워드마크 PNG를 중심으로 사용한다.

## 기술 제약

- GitHub Pages용 정적 HTML + CSS + JS 유지
- 상대 경로 자산만 사용
- SVG 생성 금지
- 로고는 제공된 PNG만 사용

## 데이터 제약

- `market-intel` 기반 12개 프로젝트는 유지
- 데이터 스키마는 유지하되, 화면에서 노출하는 정보량은 줄일 수 있다
- 스크린샷이 있는 프로젝트는 계속 우선 활용 가능

## 배포 메모

- 로컬 `C:\Users\horim\GitHub\blue-verse-portfolio\.git`는 유효하지 않다
- 실제 배포는 `https://github.com/Blue-Verse/portfolio`의 fresh clone 경로를 사용한다
