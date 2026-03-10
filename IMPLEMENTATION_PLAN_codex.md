# IMPLEMENTATION_PLAN_codex

## 구현 구조

- `index.html`: 리디자인된 포트폴리오 페이지
- `about.html`: 리디자인된 팀 소개 페이지
- `css/base.css`: 토큰, 리셋, 타이포, 공통 유틸리티
- `css/shell.css`: 헤더, 푸터, 공통 패널, 버튼, 배경
- `css/portfolio.css`: 메인 페이지 전용 섹션
- `css/about.css`: About 페이지 전용 섹션
- `js/projects-data.js`: 프로젝트 데이터 소스 유지
- `js/site-shell.js`: 공통 내비게이션, reveal, year
- `js/project-modal.js`: 모달 전용 로직 분리
- `js/project-catalog.js`: 카드/필터/featured 렌더링 분리
- `js/portfolio.js`: 페이지 조립만 담당
- `js/about.js`: About 파생 데이터 렌더링

## 디자인 실행 원칙

1. Hero는 한 문장, 한 행동, 한 증거군만 남긴다
2. 첫 featured는 case-study panel로 크게 보여준다
3. Secondary featured와 archive는 비교 가능한 카드로 압축한다
4. About은 카드 반복이 아니라 band / matrix / timeline 조합으로 리듬을 만든다
5. glass는 핵심 패널에만 쓰고 기본 패널은 종이 같은 밝은 면으로 정리한다

## 구현 순서

1. `_codex` 계획 문서 갱신
2. CSS 구조 분리
3. 공통 shell과 page layout 재구성
4. 프로젝트 렌더링 로직을 featured / library / modal / filter 단위로 분리
5. `index.html` 리디자인
6. `about.html` 리디자인
7. 반응형 정리
8. 로컬 정적 검증
9. handoff / changelog / 배포 판단

## 검증 계획

- `python -m http.server` 기준 응답 200 확인
- 데스크톱 1440px, 태블릿 1024px, 모바일 390px 뷰포트 확인
- 첫 화면, featured, project library, about top 캡처
- modal 동작과 필터 동작 확인
