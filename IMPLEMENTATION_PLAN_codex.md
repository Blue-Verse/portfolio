# IMPLEMENTATION_PLAN_codex

## 구조

- `index.html`: 포트폴리오 진입점
- `about.html`: About Us 페이지
- `css/styles.css`: 디자인 토큰, 레이아웃, glass 컴포넌트, 반응형 규칙
- `js/projects-data.js`: 6개 프로젝트 정규화 데이터
- `js/site-shell.js`: 공통 내비게이션과 인터랙션
- `js/portfolio.js`: 포트폴리오 섹션 렌더링과 상세 레이어

## 구현 순서

1. 문서 및 가이드 파일 갱신
2. 12개 프로젝트 데이터 정규화
3. `index.html` / `about.html` 구조 재작성
4. 작은 폰트 스케일과 높은 대비 중심 CSS 재작성
5. 공통 셸 스크립트와 포트폴리오 렌더링 스크립트 분리
6. 로컬 정적 서버 검증
7. 원격 저장소 fresh clone 후 재배포

## 주요 결정

- 빌드 도구 없이 정적 배포 유지
- 대표 프로젝트는 `시리즈비`, `이지어프루브`, `하모니 링크`
- 전체 프로젝트 12개를 모두 소개하되 `templates`는 제외
- 시각 톤은 glass 장식을 줄이고 정보 위계를 강화
