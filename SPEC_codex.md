# SPEC_codex

## 사용자 스토리

- 잠재 고객은 Blue Verse가 어떤 난이도의 프로젝트를 얼마나 안정적으로 수행했는지 빠르게 파악할 수 있어야 한다.
- 의사결정자는 한국 시장 중심의 실적과 신뢰 요소를 먼저 보고, 이후 AI/글로벌/Web3 확장 역량까지 자연스럽게 확인할 수 있어야 한다.
- 방문자는 개별 프로젝트 카드에서 상세 내용을 페이지 이탈 없이 확인할 수 있어야 한다.

## 핵심 섹션

### index.html

1. Hero
2. 실행 신호 스트립
3. 대표 프로젝트 3선
4. 전체 프로젝트 포트폴리오
5. 전달 가능한 역량
6. 작업 원칙 / 품질 관점
7. CTA / Footer

### about.html

1. 팀 포지셔닝 Hero
2. 회사 소개
3. 우리가 다루는 복잡도
4. 작업 방식
5. 연혁 / 분야 범위
6. 포트폴리오로 돌아가는 CTA

## 콘텐츠 계약

각 프로젝트는 아래 필드를 가진 단일 데이터 소스에서 렌더링한다.

- `slug`
- `titleKo`
- `titleEn`
- `tagline`
- `sector`
- `market`
- `period`
- `summary`
- `challenge`
- `approach`
- `impactMetrics`
- `stack`
- `highlights`
- `status`
- `evidenceNote`
- `featured`

## 인터랙션 요구사항

- 앵커 내비게이션
- 부드러운 스크롤
- 카드 hover depth
- 프로젝트 상세 modal
- ESC / overlay / close button으로 modal 종료

## 비기능 요구사항

- 모바일 대응
- 상대 경로 자산만 사용
- 키보드 접근 가능
- 외부 링크는 최소화하고 확인된 링크만 사용
