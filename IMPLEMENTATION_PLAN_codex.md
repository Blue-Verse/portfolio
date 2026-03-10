# IMPLEMENTATION_PLAN_codex

## 구조

- `index.html`: 포트폴리오 진입점
- `about.html`: About Us 페이지
- `css/styles.css`: 디자인 토큰, 레이아웃, glass 컴포넌트, 반응형 규칙
- `js/projects-data.js`: `market-intel` 기준 12개 프로젝트 정규화 데이터
- `js/site-shell.js`: 공통 내비게이션과 인터랙션
- `js/portfolio.js`: 포트폴리오 섹션 렌더링과 상세 레이어

## 이번 세션 산출물

- 사이트 복구 기준으로 갱신된 `_codex` 문서
- `hero_glass_mac.png` 미사용 상태의 새 히어로/카드 레이아웃
- `market-intel` 프로젝트 셋과 일치하는 `projects-data.js`
- `proposal-writer` persona 기준으로 다듬은 한국어 카피
- `orchestrator` persona 기준 병렬 점검 결과를 통합한 레이아웃/카피 수정
- 로컬 검증 스크린샷과 handoff/changelog

## 구현 순서

1. 현재 사이트의 깨짐/품질 저하 상태 재현
2. 복구 범위 기준으로 `_codex` 문서 갱신
3. `market-intel` 12개 프로젝트 데이터 재정규화
4. `index.html` / `about.html`의 정보구조와 브랜드 밸런스 재조정
5. `proposal-writer` persona 기준으로 핵심 카피와 섹션 문장 재작성
6. 카드/모달/커버 시스템 재설계
7. `orchestrator` 기준 카피/레이아웃 점검 결과 통합
8. 로컬 렌더 검증
9. handoff 및 changelog 기록

## 주요 결정

- 빌드 도구 없이 정적 배포 유지
- 대표 프로젝트는 `시리즈비`, `이지어프루브`, `하모니 링크`
- 전체 프로젝트 12개를 모두 소개하되 `templates`는 제외
- 시각 톤은 light glass를 유지하되, 깨져 보이지 않는 안정감과 정보 밀도를 우선한다.
- `hero_glass_mac.png`는 이번 범위에서 사용하지 않는다.
- 카피는 마케팅 과장보다 심사·평가 문장에 가까운 신뢰형 한국어 톤으로 정리한다.
