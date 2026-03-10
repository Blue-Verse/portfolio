# CONTEXT_codex

## 프로젝트 목적

Blue Verse 포트폴리오 사이트를 `ui-ux-pro-max` 기준의 전면 리디자인 패스로 다시 설계한다.
목표는 "예쁘게 보이는 포트폴리오"가 아니라, 신뢰 가능한 구축 사례 라이브러리처럼 보이는 정적 사이트를 만드는 것이다.

## 이번 세션 범위

- `index.html`과 `about.html`의 정보구조, 카피 흐름, 레이아웃, 시각 시스템을 전면 재설계한다.
- 현재 반복적인 glass 카드 패턴을 줄이고, 더 편집적이고 프리미엄한 case-study 사이트 톤으로 바꾼다.
- `core/docs/market-intel` 기준 12개 프로젝트는 그대로 유지하되, 표현 방식은 더 선별적이고 탐색 가능하게 바꾼다.
- `SUIT` 웹폰트는 유지한다. `ui-ux-pro-max`가 제안한 Noto Sans KR은 참고만 하고 실제 폰트는 사용자 요구를 따른다.
- `hero_glass_mac.png`는 계속 사용하지 않는다.
- CSS는 단일 거대 파일에서 벗어나 페이지/역할별로 분리한다.

## 디자인 시스템 기준

### 사용할 기준

- Skill: `ui-ux-pro-max`
- Query: `portfolio b2b case study premium trustworthy editorial light glass korean`
- 방향: `Portfolio Grid` + `Liquid Glass`를 참고하되, 장식적인 glassmorphism보다 "편집형 사례집"에 가깝게 조정

### 실제 적용 방향

- 색상: neutral white/ink 기반 + Blue Verse 블루만 강조색으로 사용
- 타이포: `SUIT` 단일 계열, 대신 큰 제목과 본문 밀도를 더 정교하게 조절
- 배경: 유리 질감은 포인트로만 사용하고, 기본 화면은 밝은 종이/패널/블루 헤이즈 계열로 안정감 있게 유지
- 구성: Hero -> Trust Ledger -> Flagship Case Study -> Filterable Project Library -> Method -> CTA
- About: Team Thesis -> Operating Principles -> Domain Matrix -> Collaboration Timeline -> Coverage -> CTA

## 기술 제약

- GitHub Pages에서 루트 정적 파일로 배포
- 상대 경로 자산만 사용
- SVG 생성 금지
- 빌드 도구 없는 정적 HTML + CSS + JS 유지
- 실제 로고는 `assets/BLUEVERSE.png`, `assets/1Asset 3@3x.png`만 사용

## 구현 제약

- `market-intel` 12개 프로젝트를 계속 반영한다
- 스크린샷이 있는 프로젝트는 실제 화면을 우선 노출한다
- 접근성 기본선 유지:
  - heading hierarchy
  - alt text
  - keyboard navigation
  - visible focus
  - `prefers-reduced-motion`

## 로컬 자산

- `assets/BLUEVERSE.png`
- `assets/1Asset 3@3x.png`
- `assets/showcase-screens/*.png|jpg`

## 배포 메모

- 로컬 `C:\Users\horim\GitHub\blue-verse-portfolio\.git`는 유효하지 않다
- 실제 배포는 `https://github.com/Blue-Verse/portfolio`의 fresh clone으로 반영한다
