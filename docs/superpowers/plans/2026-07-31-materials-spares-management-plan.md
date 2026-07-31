# 자재·예비품 관리 기능 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** COG Booster 사이트에 5열 설비 배치, 자재관리, 예비품관리, CSV 업로드, 브라우저 저장 기반 CRUD를 추가한다.

**Architecture:** 현재의 단일 정적 앱 구조를 유지한다. `dist/index.html`에 화면과 메뉴를 추가하고, `dist/app.js`에서 자재·예비품 상태와 CSV 파싱·CRUD를 관리한다. `dist/styles.css`에 5열 배치와 관리 화면 스타일을 추가하며, 정적 Worker 생성 스크립트로 배포 자산을 다시 포함한다.

**Tech Stack:** HTML, CSS, vanilla JavaScript, browser localStorage, FileReader, Node.js 검증 스크립트, Sites 배포.

## Global Constraints

- 자재 CSV 헤더는 `자재명,수량,납기일,상태`이다.
- 자재 상태는 `구매중` 또는 `입고완료`이다.
- 예비품 CSV 헤더는 `예비품명,수량,수리상태,메모`이다.
- 예비품 수리상태는 `수리 필요`, `수리 진행중`, `수리 완료`이다.
- CSV 업로드는 같은 이름의 기존 항목만 갱신하고 새 이름은 추가한다.
- 저장은 현재 앱의 localStorage 방식을 유지한다.
- 설비 카드는 데스크톱에서 5열로 표시한다.

---

### Task 1: 화면 구조와 레이아웃 변경

**Files:**
- Modify: `dist/index.html`
- Modify: `dist/styles.css`
- Test: `scripts/test-materials-spares.js`

**Interfaces:**
- Produces navigation views `materials` and `spares`, containers `[data-material-list]` and `[data-spare-list]`, and 5-column equipment grid styling.

- [ ] **Step 1: Write the failing test**

```js
const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const css = fs.readFileSync('dist/styles.css', 'utf8');
if (!html.includes('data-view="materials"')) throw new Error('자재관리 메뉴 없음');
if (!html.includes('data-view="spares"')) throw new Error('예비품관리 메뉴 없음');
if (!html.includes('data-material-list')) throw new Error('자재 목록 없음');
if (!html.includes('data-spare-list')) throw new Error('예비품 목록 없음');
if (!css.includes('grid-template-columns:repeat(5,1fr)')) throw new Error('설비 5열 스타일 없음');
console.log('화면 구조 테스트 통과');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/test-materials-spares.js`
Expected: FAIL with the first missing menu message.

- [ ] **Step 3: Write minimal implementation**

Add the two sidebar buttons and two view sections to `dist/index.html`. Add `data-material-list`, `data-spare-list`, registration buttons, CSV file inputs, and forms/dialog targets. Change the default equipment grid to `repeat(5,1fr)` and use `repeat(3,1fr)` at the medium breakpoint.

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/test-materials-spares.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```text
git add dist/index.html dist/styles.css scripts/test-materials-spares.js
git commit -m "feat: add materials and spares views"
```

### Task 2: 상태 모델과 CSV 파서

**Files:**
- Modify: `dist/app.js`
- Create: `data/materials.csv`
- Create: `data/spares.csv`
- Test: `scripts/test-data-model.js`

**Interfaces:**
- `parseMaterialsCsv(text)` returns `{name, quantity, dueDate, status}` rows.
- `parseSparesCsv(text)` returns `{name, quantity, repairStatus, memo}` rows.
- `state.materials` and `state.spares` are persisted in the existing `stitch-cog-single-app` localStorage object.

- [ ] **Step 1: Write the failing test**

```js
const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('parseMaterialsCsv')) throw new Error('자재 CSV 파서 없음');
if (!app.includes('parseSparesCsv')) throw new Error('예비품 CSV 파서 없음');
if (!app.includes('materials:[]')) throw new Error('자재 상태 없음');
if (!app.includes('spares:[]')) throw new Error('예비품 상태 없음');
console.log('데이터 모델 테스트 통과');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/test-data-model.js`
Expected: FAIL with the missing parser message.

- [ ] **Step 3: Write minimal implementation**

Add empty `data/materials.csv` and `data/spares.csv` templates with the approved headers. Add parser functions that skip headers, validate names and numeric quantities, map Korean statuses, and ignore malformed rows. Extend `freshState`, `loadState`, and `saveState` with `materials` and `spares`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/test-data-model.js`
Expected: PASS, then run `node --check dist/app.js`.

- [ ] **Step 5: Commit**

```text
git add dist/app.js data/materials.csv data/spares.csv scripts/test-data-model.js
git commit -m "feat: add materials and spares data model"
```

### Task 3: 목록 표시와 등록·수정·삭제

**Files:**
- Modify: `dist/app.js`
- Modify: `dist/styles.css`
- Test: `scripts/test-crud.js`

**Interfaces:**
- `renderMaterials()` and `renderSpares()` update the two list containers.
- Material forms use `data-material-form`; spare forms use `data-spare-form`.
- Existing equipment, alerts, and map behavior remains unchanged.

- [ ] **Step 1: Write the failing test**

```js
const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
for (const name of ['renderMaterials','renderSpares','data-material-form','data-spare-form']) {
  if (!app.includes(name)) throw new Error(`${name} 없음`);
}
console.log('CRUD 코드 테스트 통과');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/test-crud.js`
Expected: FAIL with the first missing function message.

- [ ] **Step 3: Write minimal implementation**

Render responsive tables/cards with empty states. Add dialog forms for creating and editing materials and spares. Add edit and delete actions, update localStorage after each mutation, and show a toast with the result. Use the exact approved status choices.

- [ ] **Step 4: Run test to verify it passes**

Run: `node scripts/test-crud.js` and `node --check dist/app.js`
Expected: PASS with no syntax errors.

- [ ] **Step 5: Commit**

```text
git add dist/app.js dist/styles.css scripts/test-crud.js
git commit -m "feat: add materials and spares CRUD"
```

### Task 4: CSV 업로드와 배포 검증

**Files:**
- Modify: `dist/app.js`
- Modify: `dist/server/index.js`
- Test: `scripts/test-upload-feature.js`

**Interfaces:**
- `[data-material-upload]` and `[data-spare-upload]` accept CSV files.
- Upload merges by name, calls `saveState()`, calls `render()`, and reports the number of updated/added rows.

- [ ] **Step 1: Write the failing test**

```js
const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
for (const name of ['data-material-upload','data-spare-upload','FileReader','parseMaterialsCsv','parseSparesCsv']) {
  if (!app.includes(name)) throw new Error(`${name} 없음`);
}
console.log('CSV 업로드 테스트 통과');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/test-upload-feature.js`
Expected: FAIL with the first missing upload feature message.

- [ ] **Step 3: Write minimal implementation**

Wire the two file inputs to `FileReader`, merge parsed rows by name, preserve unrelated records, save state, render the active view, and clear the file input after processing. Regenerate the embedded static worker assets.

- [ ] **Step 4: Run tests and package**

Run:

```text
node scripts/test-materials-spares.js
node scripts/test-data-model.js
node scripts/test-crud.js
node scripts/test-upload-feature.js
node --check dist/app.js
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/generate-static-worker.ps1
```

Expected: all tests PASS and the worker syntax check succeeds.

- [ ] **Step 5: Commit and deploy**

Commit the exact source, push the current branch, package the site with `package-site.sh`, save one Sites version, deploy it, and poll until the deployment status is `succeeded`.

```text
git add dist scripts
git commit -m "feat: support material and spare CSV uploads"
```

