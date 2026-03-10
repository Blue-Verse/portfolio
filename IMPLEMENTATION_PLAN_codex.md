# IMPLEMENTATION_PLAN_codex

## 구현 구조

- `css/base.css`: 공통 radius, section spacing, compact rhythm 조정
- `css/shell.css`: 헤더 워드마크를 더 작게 줄이고 헤더 높이/간격 압축
- `css/portfolio.css`: featured/library 카드 정렬, 폭, padding, gap, hover 밀도 재조정
- `css/about.css`: About 카드와 band spacing을 같은 톤으로 더 타이트하게 정리
- `js/project-library.js`: 13개 프로젝트 기준 카피 숫자 및 카드 표현 밀도 조정
- `js/projects-data.js`: `market-intel` 13개 프로젝트 반영 상태 유지 및 검증
- `index.html` / `about.html`: 구조는 유지하되 필요 시 카피와 헤더 밸런스 미세 조정

## 실행 원칙

1. 헤더는 브랜드보다 본문 흐름을 해치지 않는 수준까지 축소한다
2. 카드 너비, 라운드, 패딩은 각각 따로가 아니라 한 비율 체계로 함께 줄인다
3. Featured는 "큰 대표 카드 1개 + 짧은 비교 카드 2개" 위계를 더 분명히 만든다
4. Library는 카드가 눌려 보이지 않는 범위에서 열 수와 간격을 다시 맞춘다
5. 숫자와 프로젝트 범위는 반드시 `market-intel` 13개 기준으로 맞춘다
6. 카피는 이전 declutter 톤을 유지하되 현재 데이터셋과 불일치하는 문구를 제거한다

## 구현 순서

1. `_codex` 문서 갱신
2. `market-intel` 13개 프로젝트와 현재 데이터셋 일치 여부 확인
3. 헤더 로고, 공통 radius, section spacing 수정
4. Featured / Library 카드 레이아웃 안정화
5. Hero 및 overview 카피 숫자 보정
6. 반응형 검증과 시각 캡처
7. handoff / changelog 갱신
8. fresh clone 경로로 배포

## 검증 계획

- `python -m http.server` 기준 정적 응답 200 확인
- 데스크톱 1440px, 태블릿 1024px, 모바일 390px 뷰포트 확인
- 헤더 로고 축소 후 nav 충돌 여부 검증
- Home 첫 화면, featured, library, About 상단 캡처
- 모달과 메뉴 동작 확인
