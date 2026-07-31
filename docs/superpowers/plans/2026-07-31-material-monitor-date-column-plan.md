# 자재 재고 모니터·예비품 날짜 열 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 예비품 날짜 열, 자재 5종 재고 모니터, 중복 버튼 제거를 구현하고 Supabase에 저장한다.

**Architecture:** 기존 단일 HTML/JavaScript 앱의 렌더 함수와 localStorage/Supabase 동기화 계층을 확장한다. 별도 서버는 추가하지 않고 기존 `spare_monitor` 테이블에 자재 모니터 키를 저장한다.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, Supabase JS v2, Supabase Postgres.

## Global Constraints
- 공개 클라이언트에서는 Supabase publishable key만 사용한다.
- 기존 `수리 시작일`·`수리 완료일` 입력 필드와 CRUD 흐름을 유지한다.
- 기존 기능 테스트를 통과해야 한다.

### Task 1: 화면 구조 수정

**Files:** `dist/index.html`, `dist/styles.css`

- [ ] 대시보드의 중복 `data-action="csv-upload"` 버튼과 파일 입력을 하나 제거한다.
- [ ] 자재 화면에 `data-material-monitor` 카드 5개를 추가한다.
- [ ] 예비품 표에 날짜 열을 추가한다.
- [ ] 5개 카드가 한 줄 또는 반응형 그리드로 보이도록 기존 monitor 스타일을 재사용한다.

### Task 2: 상태·렌더링·저장 연결

**Files:** `dist/app.js`

- [ ] `materialMonitor` 기본 상태를 5개 키로 추가한다.
- [ ] Supabase hydrate/persist 매핑에 `material-*` 키를 포함한다.
- [ ] 자재 모니터 카드 클릭 시 수량을 입력하고 저장한다.
- [ ] 예비품 렌더링에서 날짜를 별도 셀로 출력한다.

### Task 3: 검증 및 배포

**Files:** `scripts/test-material-monitor.js`

- [ ] 중복 버튼이 하나인지, 5개 자재 키가 코드에 존재하는지 검사한다.
- [ ] `node --check dist/app.js`와 기존 테스트를 실행한다.
- [ ] Vercel production에 재배포하고 READY 상태와 HTTP 200을 확인한다.
