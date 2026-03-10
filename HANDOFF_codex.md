# HANDOFF_codex

## 현재 상태

- 포트폴리오 사이트를 2차 전면 재설계 완료
- `index.html` 단일 소개 페이지 + `about.html` 팀 소개 페이지 구조로 확장
- `market-intel` 기준 분석 프로젝트 12개 전체 반영
- 기존 `js/main.js` 구조 제거 후 `site-shell.js`, `portfolio.js`, `about.js`, `projects-data.js`로 분리

## 이번 버전 핵심 변경

1. 과도한 glass 반복을 줄이고, 더 차분한 light 톤과 작은 타이포 중심으로 UI 재설계
2. `SUIT` 웹폰트를 CDN으로 적용
3. 대표 프로젝트 3건은 별도 featured 섹션으로 상단 배치
4. 전체 프로젝트 12건은 동일 데이터 계약으로 카드/상세 모달 렌더링
5. `about.html`에서 팀 포지셔닝, 작업 방식, 프로젝트 범위를 별도 소개
6. `?project=<slug>` 쿼리로 상세 모달 바로 열기 지원

## 주요 파일

- `index.html`
- `about.html`
- `css/styles.css`
- `js/projects-data.js`
- `js/site-shell.js`
- `js/portfolio.js`
- `js/about.js`

## 검증 메모

1. 로컬 정적 서버 `python -m http.server 4173` 기준 `index.html`, `about.html`, CSS, JS 응답 200 확인
2. `SUIT.css` CDN 응답 200 확인
3. Edge headless 스크린샷으로 메인/어바웃/모달 렌더 확인
4. 프로젝트 데이터 개수 12건 확인
5. 사이트 HTML/CSS/JS 범위에서 `<svg` / `.svg` 참조 없음 확인

## 배포 메모

- 로컬 `C:\Users\horim\GitHub\blue-verse-portfolio\.git`는 정상 저장소가 아니므로 fresh clone 경로로 publish
- 대상 원격: `https://github.com/Blue-Verse/portfolio`
- 복사 대상은 사이트 결과물과 `_codex` 문서만 선택적으로 반영

## 다음 세션 참고

1. 새로운 사례를 추가할 때는 `js/projects-data.js`만 수정하고 두 페이지는 렌더 구조를 유지
2. About 페이지의 통계는 `PROJECTS` 배열에서 파생되므로 수동 숫자 수정이 필요 없음
3. 공개 링크가 검증된 프로젝트만 외부 링크를 추가하고, private 저장소 URL은 계속 노출하지 않음
