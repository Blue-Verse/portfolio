# IMPLEMENTATION_PLAN_codex

## 구조

- `index.html`: 의미론적 레이아웃과 렌더링 마운트 포인트
- `css/styles.css`: 디자인 토큰, 레이아웃, glass 컴포넌트, 반응형 규칙
- `js/projects-data.js`: 6개 프로젝트 정규화 데이터
- `js/main.js`: 섹션 렌더링, modal, nav, intersection animation

## 구현 순서

1. 문서 및 가이드 파일 생성
2. 새 HTML 스켈레톤 작성
3. 데이터 모델 정의
4. CSS 토큰 및 섹션 스타일 구현
5. JS 렌더링과 modal 상호작용 구현
6. 로컬 정적 서버 검증
7. 원격 저장소 fresh clone 후 배포 반영

## 주요 결정

- 빌드 도구 없이 정적 배포 유지
- 대표 프로젝트는 `시리즈비`, `이지어프루브`, `하모니 링크`
- 상세 탐색은 repo 링크 대신 on-page modal 중심
- CTA는 GitHub org와 협업 문의 유도형 문구로 구성
