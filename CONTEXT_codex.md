# CONTEXT_codex

## 프로젝트 목적

Blue Verse의 실전 구축 사례를 한국어 중심으로 소개하는 프리미엄 포트폴리오 웹사이트를 다시 설계한다.
이번 범위는 `index.html` 포트폴리오 페이지와 `about.html` About Us 페이지를 포함한다.

## 현재 세션 범위

- 현재 포트폴리오 사이트가 깨져 보이는 상태를 복구한다.
- `hero_glass_mac.png` 없이도 완성도 있게 보이도록 히어로와 카드 구조를 다시 정리한다.
- `C:\Users\horim\GitHub\ai-agent\core\docs\market-intel` 기준의 전체 프로젝트 셋을 다시 검증하고 반영한다.
- 카탈로그 편차가 있는 프로젝트는 `market-intel` 내부 원페이저/케이스 스터디까지 확인해 데이터 누락을 보정한다.
- `proposal-writer` persona를 적용해 과장 없는 신뢰형 한국어 카피로 문장 톤을 다시 정리한다.
- `designer` 관점으로 첫 화면 정보 위계, 섹션 리듬, 카드 밀도를 다시 다듬는다.

## 기술 제약

- GitHub Pages에서 루트 정적 파일로 배포
- 상대 경로 자산만 사용
- 빌드 도구 없이 정적 HTML + CSS + JS 구조 유지
- SVG 생성 금지
- 스크린샷 자산은 실제 앱 화면으로 보이는 품질이어야 하며, 더미 목업은 사용하지 않는다.

## 디자인 방향

- macOS liquid glass를 참고하되 과장된 유리 장식보다 더 엄격하고 차분한 기업형 톤으로 조정
- 과도한 폰트 크기와 장식보다 정보 위계와 가독성을 우선
- 주색은 Blue Verse 블루 계열
- 폰트는 CDN으로 검증된 `SUIT` 웹폰트

## 콘텐츠 출처

- `C:\Users\horim\GitHub\ai-agent\core\docs\market-intel`
- 포함 프로젝트: `templates` 제외 기준 `market-intel` 전 프로젝트
- 현재 기준 12개: ai-agent, calendar-share, casual-game, connectin, daystarter, ez-approve, harmony-link, life3, nft-defi, p2p-funding, pilates-app, series-b

## 로컬 자산

- `assets/BLUEVERSE.png`
- `assets/1Asset 3@3x.png`

## 배포 메모

- 현재 작업 디렉터리의 `.git`는 비어 있어 유효하지 않음
- 실제 배포는 `https://github.com/Blue-Verse/portfolio`의 fresh clone을 통해 반영
