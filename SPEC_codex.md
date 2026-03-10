# SPEC_codex

## 목표 사용자

- Blue Verse의 신뢰도를 빠르게 판단해야 하는 잠재 고객
- 구축 파트너를 찾는 의사결정자
- 한국 실무형 사례와 글로벌 확장 경험을 함께 보고 싶은 방문자

## 사용자 스토리

- 방문자는 첫 화면에서 "이 팀이 어떤 복잡도를 다뤄왔는지"를 몇 초 안에 이해할 수 있어야 한다.
- 방문자는 대표 사례 1건을 깊게 읽고, 나머지 사례는 짧게 비교할 수 있어야 한다.
- 방문자는 필터를 통해 자신과 가까운 산업/시장/문제 유형의 프로젝트를 빠르게 찾을 수 있어야 한다.
- 방문자는 About 페이지에서 팀의 포지션과 작업 방식을 더 강하게 이해할 수 있어야 한다.
- 방문자는 저장소 링크보다 구축 사례와 팀 설명을 먼저 보게 되어야 한다.

## 핵심 문제

- 현재 사이트는 정보는 많지만 리듬이 단조롭고, 카드 시스템이 반복적이다.
- Hero가 여전히 신뢰를 쌓기보다 정보를 나열하는 인상에 가깝다.
- Featured와 Archive의 위계 차이가 충분히 크지 않다.
- About 페이지는 구조는 단정하지만 기억에 남는 리듬이 부족하다.

## 리디자인 요구사항

### 정보구조

#### index.html

1. Narrative Hero
2. Trust Ledger
3. Flagship Case Study
4. Secondary Featured Cases
5. Filterable Project Library
6. Operating Method
7. CTA / Footer

#### about.html

1. Team Thesis Hero
2. Principles Band
3. Domain Matrix
4. Collaboration Timeline
5. Coverage Metrics
6. CTA / Footer

### 시각 요구사항

- 더 적은 glass, 더 강한 위계
- 패널 크기와 섹션 구성이 반복되지 않도록 대비를 준다
- 큰 제목은 강하게, 보조 텍스트는 짧게 유지한다
- 모바일에서는 첫 화면에 핵심 문장과 첫 행동만 남긴다

### 인터랙션 요구사항

- 필터 칩으로 프로젝트 라이브러리 정렬/축소
- 프로젝트 상세 modal 유지
- reveal motion은 줄이고 더 자연스럽게 정리
- `prefers-reduced-motion` 대응

### 콘텐츠 요구사항

- 내부 용어(`market-intel`, `data contract` 등)는 직접 노출하지 않는다
- 카피는 한국어 중심, 신뢰형 톤 유지
- 각 프로젝트는 "무엇을 만들었나"보다 "어떤 복잡도를 풀었나"가 먼저 드러나야 한다

## 데이터 계약

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
- `showcaseImage`
