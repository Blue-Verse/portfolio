# IMPLEMENTATION_PLAN_codex

## 구현 구조

- `index.html`: 더 단순해진 메인 구조와 새 카피 반영
- `about.html`: 더 적은 섹션 수와 차분한 톤 반영
- `css/base.css`: 배경, 타이포 스케일, 공통 간격 재조정
- `css/shell.css`: 헤더 로고, 내비게이션, 푸터, 모달 공통 구조 재정리
- `css/portfolio.css`: 홈 섹션 단순화, featured/library 카드 밀도 축소
- `css/about.css`: About 섹션 수와 카드 밀도 축소
- `js/project-library.js`: Hero/featured/library 렌더링 정보량 축소
- `js/project-shared.js`: 카드/쇼케이스 공통 출력 단순화
- `js/project-modal.js`: 모달은 유지하되 홈 카드에 숨긴 정보 중심으로 정리

## 실행 원칙

1. 헤더는 큰 워드마크 + 적은 링크로 정리한다
2. Hero는 한 문장, 한 설명, 한 행동 위주로 줄인다
3. Featured는 첫 사례 1개를 깊게, 나머지 2개는 짧게 보여 준다
4. Library는 overview 박스 수를 줄이고 카드 정보량을 압축한다
5. About은 3열 반복보다 2열/1열 위주로 차분하게 재배치한다
6. 카피는 `proposal-writer` 톤을 따라 차분하고 검증 가능한 어조로 다시 쓴다

## 구현 순서

1. `_codex` 문서 갱신
2. 헤더 로고 및 공통 shell 구조 수정
3. Home 정보구조 단순화
4. About 정보구조 단순화
5. 카드/필터/메타데이터 출력량 축소
6. 카피 전면 재작성
7. 반응형 검증
8. handoff / changelog 갱신

## 검증 계획

- `python -m http.server` 기준 정적 응답 200 확인
- 데스크톱 1440px, 태블릿 1024px, 모바일 390px 뷰포트 확인
- 헤더 로고 크기와 줄바꿈 검증
- Home 첫 화면, featured, library, About 상단 캡처
- 모달과 메뉴 동작 확인
