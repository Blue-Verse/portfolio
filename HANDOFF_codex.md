# HANDOFF_codex

## 디자인/CSS 복구 세션 메모

- 새 요청 범위: GitHub Pages 호환성을 유지한 채 포트폴리오의 디자인/CSS 품질을 다시 끌어올리고, 이어서 카피도 persona 기반으로 재작성
- `proposal-writer` persona를 적용해 히어로, 섹션 헤드라인, CTA, About 문장을 더 단단한 한국어 톤으로 재작성
- `designer` 관점으로 헤더, 히어로, featured 카드, fallback cover, 모바일 헤더를 다시 정리
- `hero_glass_mac.png`는 계속 사용하지 않았고, 상대 경로 정적 자산 구조도 유지

## 이번 세션 핵심 변경

1. `index.html`의 hero를 더 낮고 단단한 정보구조로 다시 설계
2. 프로젝트 12개 로스터를 칩 난립 구조에서 정돈된 패널형 레이아웃으로 변경
3. featured/archive 카드의 밀도와 위계를 재조정하고, 이미지 없는 프로젝트의 fallback cover를 텍스트 중심 신뢰형 커버로 재설계
4. `about.html` 카피를 더 명확한 팀 소개 문장으로 재작성
5. 모바일 헤더를 2단 구조로 바꿔 네비게이션 텍스트가 세로로 깨지는 문제를 수정

## 이번 세션 주요 파일

- `index.html`
- `about.html`
- `css/styles.css`
- `js/portfolio.js`
- `CONTEXT_codex.md`
- `IMPLEMENTATION_PLAN_codex.md`
- `TODOS_LIST_codex.md`

## 이번 세션 검증 메모

1. GitHub Pages 서브패스 대응 관점에서 상대 경로 구조를 다시 확인
2. Playwright CLI로 데스크톱 뷰포트 기준 `index` 상단, `featured` 섹션, `about` 상단 캡처 확인
3. Playwright CLI로 모바일 뷰포트 기준 `index` 상단 캡처 확인
4. 검증용 이미지:
   - `C:\Users\horim\AppData\Local\Temp\portfolio-repair-check-viewport\index-top.png`
   - `C:\Users\horim\AppData\Local\Temp\portfolio-repair-check-viewport\index-featured.png`
   - `C:\Users\horim\AppData\Local\Temp\portfolio-repair-check-viewport\about-top.png`
   - `C:\Users\horim\AppData\Local\Temp\portfolio-repair-check-viewport\index-mobile-top-4.png`
5. 검증용 임시 서버 포트 `4194`, `4195`, `4196`, `4197` 종료 완료

## 스크린샷 캡처 세션 메모

- 새 요청 범위: `ai-agent`, `calendar-share`, `connectin`, `ez-approve` 대표 스크린샷 확보
- `ai-agent`, `connectin`, `ez-approve`는 실제 로컬/브라우저 렌더 기준 캡처 확정
- `calendar-share`는 저장소에 웹 플랫폼 구성이 없어 fresh render가 실패했고, repo 포함 실기기 캡처를 fallback으로 사용
- 확보한 스크린샷은 포트폴리오 카드와 상세 모달에 연결 완료

## 현재 상태

- 포트폴리오 사이트 2차 전면 재설계 및 원격 배포 완료
- `index.html` 단일 소개 페이지 + `about.html` 팀 소개 페이지 구조로 확장
- `market-intel` 기준 분석 프로젝트 12개 전체 반영
- 기존 `js/main.js` 구조 제거 후 `site-shell.js`, `portfolio.js`, `about.js`, `projects-data.js`로 분리
- 원격 반영 커밋: `ba9a019` (`feat: redesign portfolio and add about page`)

## 이번 버전 핵심 변경

1. 과도한 glass 반복을 줄이고, 더 차분한 light 톤과 작은 타이포 중심으로 UI 재설계
2. `SUIT` 웹폰트를 CDN으로 적용
3. 대표 프로젝트 3건은 별도 featured 섹션으로 상단 배치
4. 전체 프로젝트 12건은 동일 데이터 계약으로 카드/상세 모달 렌더링
5. `about.html`에서 팀 포지셔닝, 작업 방식, 프로젝트 범위를 별도 소개
6. `?project=<slug>` 쿼리로 상세 모달 바로 열기 지원
7. `ai-agent`, `calendar-share`, `connectin`, `ez-approve` 쇼케이스 스크린샷 자산 추가 및 UI 연동

## 주요 파일

- `index.html`
- `about.html`
- `css/styles.css`
- `js/projects-data.js`
- `js/site-shell.js`
- `js/portfolio.js`
- `js/about.js`
- `assets/showcase-screens/ai-agent.png`
- `assets/showcase-screens/calendar-share.jpg`
- `assets/showcase-screens/connectin.png`
- `assets/showcase-screens/ez-approve.png`

## 스크린샷 결과

1. `ai-agent` : `assets/showcase-screens/ai-agent.png` / fresh render 성공 / `Control Panel` 화면 기준
2. `connectin` : `assets/showcase-screens/connectin.png` / fresh render 성공 / 웹 랜딩 hero 기준
3. `ez-approve` : `assets/showcase-screens/ez-approve.png` / fresh render 성공 / 로그인 화면 기준
4. `calendar-share` : `assets/showcase-screens/calendar-share.jpg` / fresh render 실패 / repo 포함 실기기 캡처 fallback

## 스크린샷 관련 구현 변경

1. `js/projects-data.js`에 `showcaseImage` 메타데이터 추가
2. `js/portfolio.js`에서 카드/모달용 이미지 프레임 렌더링 추가
3. `css/styles.css`에 screenshot frame, note 스타일 추가

## 검증 메모

1. 로컬 정적 서버 `python -m http.server 4173` 기준 `index.html`, `about.html`, CSS, JS 응답 200 확인
2. `SUIT.css` CDN 응답 200 확인
3. Edge headless 스크린샷으로 메인/어바웃/모달 렌더 확인
4. 프로젝트 데이터 개수 12건 확인
5. 사이트 HTML/CSS/JS 범위에서 `<svg` / `.svg` 참조 없음 확인
6. `ai-agent`, `connectin`, `ez-approve`는 실제 브라우저/앱 렌더 캡처 파일 직접 검수 완료
7. 검증용 임시 서버 포트 `4173`, `4334`, `4332`는 종료 처리

## 배포 메모

- 로컬 `C:\Users\horim\GitHub\blue-verse-portfolio\.git`는 정상 저장소가 아니므로 fresh clone 경로로 publish
- 대상 원격: `https://github.com/Blue-Verse/portfolio`
- 복사 대상은 사이트 결과물과 `_codex` 문서, `.github/workflows/deploy.yml`만 선택적으로 반영
- 이번 세션의 스크린샷 반영 변경은 아직 원격 배포하지 않음

## 다음 세션 참고

1. 원격 반영이 필요하면 fresh clone 경로에서 `assets/showcase-screens/*`, `js/projects-data.js`, `js/portfolio.js`, `css/styles.css`, `_codex` 문서를 함께 배포
2. 새로운 사례를 추가할 때는 `js/projects-data.js`에 `showcaseImage`만 보강하면 카드/모달에 자동 노출 가능
3. About 페이지의 통계는 `PROJECTS` 배열에서 파생되므로 수동 숫자 수정이 필요 없음
4. 공개 링크가 검증된 프로젝트만 외부 링크를 추가하고, private 저장소 URL은 계속 노출하지 않음
