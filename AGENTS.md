# Blue Verse Portfolio Agent Guide

이 저장소에서 작업하는 모든 AI 에이전트는 구현 전에 아래 문서를 순서대로 읽어야 합니다.

1. `CONTEXT_codex.md`
2. `SPEC_codex.md`
3. `IMPLEMENTATION_PLAN_codex.md`
4. `TODOS_LIST_codex.md`
5. `HANDOFF_codex.md`

작업 원칙:

- 기존 디자인과 코드를 재사용하지 않고 새 구조로 구현합니다.
- 정적 GitHub Pages 배포를 유지합니다.
- `index.html`은 진입점만 담당하고, 스타일과 스크립트는 분리합니다.
- 로고는 `assets/BLUEVERSE.png`, `assets/1Asset 3@3x.png`만 사용합니다.
- 문서 파일은 다른 에이전트와 충돌을 피하기 위해 `_codex` suffix를 유지합니다.
- 세션 종료 전 `HANDOFF_codex.md`와 changelog를 반드시 갱신합니다.
