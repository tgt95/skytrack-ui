# Kế hoạch Tổ chức Source & Nâng cao Chất lượng (`skytrack-ui`) — v2

**Trạng thái:** `EXECUTED` — Phase 0-6 hoàn tất ngày 2026-11-12. Phase 7 (tách file lớn), Phase 8 (smoke test 56 component) và Phase 9 (đóng gói/phát hành) tách thành task riêng. Báo cáo kết quả: `agents/task-work/T-441/verification.md`.
**Bản:** v2, thay thế v1. Bản v1 lưu tại `agents/task-work/_plan-backups/FOLDER-RESTRUCTURE-PLAN-v1-2026-11-12.md`.
**Phạm vi:** chỉ repository `designs/components/skytrack-ui` (nested git repo, remote `github.com/tgt95/skytrack-ui`). Mọi path tương đối so với thư mục gốc package.
**Ngoài phạm vi:** workspace root `SkyTrack/`, `skytrack-design-guide`, `skytrack-mission-studio`, `skytrack-ui-android`, `skytrack-ui-dev`, `prototype-hub`. Phát hiện liên quan ghi ở Mục 7, không thực hiện trong task này.
**Ngày audit:** 2026-11-12 · **Cập nhật:** 2026-11-12.
**Lý do lên v2:** v1 chứa 5 lỗi chặn (xem Mục 9) và nhiều số liệu lệch. v2 sửa số liệu, đảo thứ tự thực thi, thêm Phase 0 baseline và gate xanh trước CI.

---

## 1. Mục tiêu & nguyên tắc bất biến

1. **Giữ cấu trúc phẳng `src/components/ui/<component>.tsx`** — 1-1 với `package.json#exports`, `scripts/generate-exports.mjs` và `vite.lib.config.ts`. Không tách thành `src/components/ui/<component>/index.tsx`.
2. **Bảo toàn 100% Public API** — mọi export ở root (`skytrack-ui`), subpath (`skytrack-ui/<component>`) và stylesheet (`skytrack-ui/styles.css`) giữ nguyên tên và kiểu dữ liệu.
3. **Tách bạch 4 tầng trách nhiệm:**
   - **Tầng 1 — Core UI Components** (`src/components/ui/*.tsx`): đúng 1 file `.tsx` cho mỗi public subpath. Test đặt cạnh component với hậu tố `.test.tsx` được phép.
   - **Tầng 2 — Internal Shared Primitives** (`src/lib/`): barrel entry (`index.ts`, `entries.json`), `utils.ts` (`cn`), primitives dùng chung nội bộ.
   - **Tầng 3 — Theme & Styles** (`src/styles/`, `src/index.css`, `src/styles.css`): chỉ CSS/tokens của thư viện. CSS riêng của trang showcase nằm ở `src/showcase/`.
   - **Tầng 4 — Showcase, Docs, Skills & Tooling** (`src/showcase/`, `src/demos/`, `src/stories/`, `skills/`, `docs/`, `scripts/`): demo, tài liệu, tooling.
4. **Không có CSS showcase trong artifact publish.** `dist-lib/styles.css` là thứ consumer nhận; rule chỉ phục vụ trang demo không được nằm trong đó.
5. **Không có file sinh tự động vi phạm style repo.** Mọi generator phải xuất đúng Prettier config của package, hoặc file sinh phải nằm trong `.prettierignore` có chủ đích.
6. **Gate xanh trước CI.** Không bật workflow khi 6 gate còn đỏ. Thứ tự: sửa baseline, rồi mới thêm CI.
7. **`docs/carbon-ds-reference` là input runtime của test**, không phải rác. Chỉ gỡ khỏi git sau quyết định D0 và sau khi có cơ chế thay thế.
8. **Guardrail chỉ cấm cycle và sai tầng.** Import chéo giữa `src/components/ui/*` là hợp lệ. `src/lib/index.ts` được phép import `components/ui` vì là barrel public.
9. **Mỗi phase một commit sạch.** Không trộn thay đổi WIP đang có trong working tree. Baseline phải được ghi trước khi sửa.

---

## 2. Baseline đo ngày 2026-11-12

### 2.1. Trạng thái gate

| Gate | Kết quả | Bằng chứng |
|---|---|---|
| `npm run typecheck` | PASS | `tsc -p tsconfig.json`, không lỗi |
| `npm run lint` | FAIL | `sync-sheet-specs.mjs` thiếu `code-block-tree` |
| `npm test` | FAIL | 3 failed / 73 passed / 76 test, 1 failed / 5 passed test file |
| `npm run format:check` | FAIL | 80 file lỗi style |
| `npm run build:lib` | PASS | 8 bước, output `dist-lib/` |
| `npm run verify:lib` | PASS | 6 nhóm check, gồm 415 export và 56 subpath |
| `npm run generate:exports` | PASS, idempotent | 56 component, 415 root value, 74 root type, 489 subpath export |
| `npm run pack:local && npm run test:consumer` | NOT_RUN | Chưa chạy trong audit này |

### 2.2. Số liệu đã kiểm chứng

| Hạng mục | Số liệu | Cách đo |
|---|---|---|
| Component files | 56 `.tsx` (không tính `.test.tsx`) | `ls src/components/ui/*.tsx` |
| Public subpath | 56 | `package.json#exports` trừ `.`, `./package.json`, `./styles.css` |
| Root barrel | 415 value export + 74 type export | `npm run generate:exports` |
| Subpath import | 56/56 sạch | `npm run verify:lib` |
| Tailwind coverage | 442/442 class compile vào `styles.css` | `npm run verify:lib` |
| `src/lib/` | `control-sizes.ts`, `date-input.ts`, `focus-ring.ts`, `popup-arrow.tsx`, `utils.ts` | `ls src/lib` |
| `focus-ring` import | 21 file | `grep -rln "@/lib/focus-ring" src` |
| `popup-arrow` import | 4 file | `grep -rln "popup-arrow" src` |
| Demo files | 62 | `ls src/demos/*.demo.tsx` |
| Story files | 62, 61 lỗi format | `ls src/stories`, `format:check` |
| Component guide | 56 guide + `_template.md` | `ls skills/.../components/*.md` |
| Test files | 6 file, trong đó 3 test component | `find src -name '*.test.*'` |
| `dist-lib/styles.css` | 119.310 byte, 552 custom prop unique (714 declaration) | `ls -l`, `grep -o` |

### 2.3. Cấu trúc đang hoạt động tốt — không đụng

1. Cấu trúc phẳng `src/components/ui/*.tsx` khớp 1-1 với 56 public subpath. Không có file dư, không subpath thiếu.
2. `src/lib/index.ts` là barrel public duy nhất; generator deterministic, không timestamp.
3. `verify:lib` phủ 6 nhóm: package contract, build output, stylesheet asset, utility coverage, runtime export, sideEffects.
4. `dist-lib/styles.css` self-contained: 90 `url()` reference resolve trong `dist-lib`, consumer không cần Tailwind scan.

---

## 3. Phát hiện

Mức độ: **Cao** = chặn release hoặc chặn CI; **Trung bình** = nợ kỹ thuật có rủi ro; **Thấp** = vệ sinh.

### 3.1. Vòng đời package

| ID | Vấn đề | Bằng chứng | Mức |
|---|---|---|---|
| **V1** | **Token layer lệch tên.** `brand.css` tham chiếu `--primitive-color-<name>`, nhưng `primitive.css` định nghĩa `--<name>` (không prefix). 100/100 ref không resolve. 8 dòng fallback là `#NaNNaNNaN` tại `brand.css:40-43, 82-85`; trong đó 4 dòng trỏ token không tồn tại (`white-a0`, `black-a0`), 4 dòng trỏ token primitive định nghĩa bằng `#NaNNaNNaN` (`white-a35`, `black-a30`, `white-a5`, `black-a3`). `primitive.css` còn **70 token active** mang giá trị `#NaNNaNNaN`. | `src/styles/brand.css`, `src/styles/primitive.css` | Cao |
| **V2** | **CSS showcase lọt vào artifact publish.** `src/index.css:196` chứa `body[data-showcase-view='style-overview']`; rule này có trong `dist-lib/styles.css` mà consumer nhận. | `grep data-showcase-view dist-lib/styles.css` | Cao |
| **V3** | **Generator sai style repo.** `generate-stories.mjs` và `generate-exports.mjs` xuất double quote + semicolon; `.prettierrc` đặt `singleQuote` + `semi: false`. Hệ quả: `src/lib/index.ts` và 61 story lỗi format. Tổng 80 file lỗi, gồm 19 file không do generator sinh. | `npm run format:check` | Cao |
| **V4** | **Hai nguồn cho spec component.** `buttonVariants`/`toggleVariants` (cva) và bản hardcode `BUTTON_VARIANTS`, `BUTTON_SIZES` trong `src/showcase/sheet.tsx:332-333`. `sync-sheet-specs.mjs` đã check value cho 8 axis cụ thể (input, avatar, combobox, select, autocomplete, number-field, toggle, toggle-group) nhưng không check tổng quát cho button variants và không derive từ cva. | `sheet.tsx:332`, `scripts/sync-sheet-specs.mjs` | Trung bình |
| **V5** | **Test coverage mỏng.** 3/56 component có test (`inline-edit`, `sidebar`, `code-block`). Không có smoke test theo component, không có a11y regression. `@testing-library/react` đã có sẵn. | `find src -name '*.test.*'` | Cao |
| **V6** | **File quá lớn, không guardrail.** `pattern-library/page-content.ts` 12.173 dòng (26 pattern object); `sheet-specimens.tsx` 2.600; `App.tsx` 1.433; `sheet.tsx` 1.271. Package không có `file-size-baseline.json` và `architecture-guardrails.cjs`; pattern này đã có ở `skytrack-mission-studio`. | `wc -l` | Trung bình |
| **V7** | **`zod` nằm ở `dependencies`, chỉ demo dùng.** Consumer cài `skytrack-ui` bị kéo `zod` vô ích. | `grep -rn "from 'zod'" src` → chỉ `src/demos/form.demo.tsx` | Thấp |
| **V8** | **Hai bản render cho story.** 62 story chỉ gọi `demo.variants[i].render()`; Storybook import `VariantBlock` từ `src/showcase/demo.tsx`, nên package dev phụ thuộc showcase. Đây là wrapper lặp, không phải logic lặp. | `scripts/generate-stories.mjs`, `src/stories/*` | Thấp |
| **V9** | **Repo bloat.** Track `docs/carbon-ds-reference/` (2.447 file, 94 MB), `artifact/skytrack-ui-probe.html` (26 MB), `draft/` (5 file). `.git` package 166 MB. | `git ls-files`, `du -sh` | Cao |
| **V10** | **Không có CI.** Không có `.github/`; không workflow chạy typecheck/lint/test/format/verify. | `ls -a` | Cao |
| **V11** | **`npm run lint` FAIL.** `sync-sheet-specs.mjs` báo thiếu `code-block-tree` trong `sheet.tsx`. Component đang untracked. | `npm run lint` | Cao |
| **V12** | **File tham chiếu chết.** `src/shadcn-tokens-original.css` (3,4 KB) không được import ở đâu. | `grep -rn "shadcn-tokens-original" src` → 0 | Thấp |
| **V13** | **Comment generator gây hiểu nhầm, không phải mất dấu.** `src/styles/shared-tokens.css` ghi "Generated by tokens/generate.py. Do not edit."; generator thật nằm ở `../skytrack-ui-android/tokens/generate.py`. `src/index.css:16` đã ghi nguồn token là `skytrack-ui-android`. | `find .. -name generate.py` | Thấp |
| **V14** | **Guide ↔ component lệch.** 56 guide + `_template.md`; `code-block-tree.md` mới chỉ untracked. | `git status`, `ls` | Thấp |
| **V15** | **Baseline test đỏ.** `npm test` FAIL 3 test trong `src/showcase/pattern-library/pattern-library.test.tsx`: source-shaped content, persistent Callout, interactive use-case control. | `npm test` | Cao |
| **V16** | **Working tree bẩn trước khi thực thi.** 40+ file modified, 14 path untracked (gồm `code-block-tree`, `date-input`, 7 shell demo/story, `agents/`); `package.json`, `scripts/verify-lib.mjs`, `src/lib/index.ts` đã sửa. Số đo trong tài liệu lấy từ trạng thái này. | `git status --short` | Cao |

### 3.2. Phát hiện phụ (đưa vào checklist, không thành phase riêng)

1. `src/stories` có 62 file nhưng comment đầu `generate-stories.mjs` ghi "37 story files" — comment lỗi thời.
2. `src/demos` có 62 file cho 56 component: thiếu `calendar.demo.tsx`; 7 demo shell dư (`canvas-shell`, `combined-shell`, `command-first-shell`, `left-nav-shell`, `multi-pane-shell`, `multi-tab-shell`, `top-nav-shell`). `sync-sheet-specs.mjs` không kiểm quan hệ demo ↔ component, nên tuyên bố "1-1" trong v1 là sai.
3. `.gitignore` của package thiếu newline cuối và thiếu entry cho `docs/carbon-ds-reference/`, `artifact/`.
4. `agents/` đang untracked toàn bộ; B7 cần commit `agents/` cùng baseline file.
5. `.prettierignore` không tồn tại; nếu chọn ignore file sinh phải tạo mới.

---

## 4. Lộ trình thực thi

Mỗi phase có gate riêng. Không bắt đầu phase sau khi gate phase trước chưa `PASS`, trừ khi Owner chấp thuận ngoại lệ bằng văn bản trong task file.

### Phase 0 — Baseline & chốt an toàn (mới)

**Mục tiêu:** biết chính xác điểm xuất phát, không trộn WIP.

1. Tạo task file theo workspace rule: `_tasks/YYYY-MM-DD-skytrack-ui-folder-restructure.md`, gán `Record ID`, thêm dòng vào `DASHBOARD.md`.
2. Trong package, ghi baseline vào `agents/task-work/<record>/baseline.md`:
   - `git status --short`, `git diff --stat`, `git rev-parse HEAD`.
   - Hash `dist-lib/styles.css` trước mọi thay đổi.
   - Kết quả 6 gate ở Mục 2.1.
3. Chốt cách xử lý WIP hiện có: commit có chủ đích lên nhánh riêng, hoặc tách nhánh `chore/folder-restructure` từ HEAD và giữ WIP ngoài phạm vi. Không dùng `git stash` cho workspace dùng chung.
4. Owner xác nhận baseline đỏ hiện tại là đã biết, không phải regression do task này.

**Gate 0:** baseline ghi đủ; Owner xác nhận; không còn path mơ hồ giữa "WIP cũ" và "thay đổi của task".

### Phase 1 — Đưa baseline về xanh

**Mục tiêu:** 4 gate đỏ về `PASS` trước khi bật CI.

1. **A3 — Đăng ký `code-block-tree`:** thêm vào `SPECS` trong `src/showcase/sheet.tsx`. Quyết định commit component + demo + story + guide cùng phase hay tách (D6).
2. **Sửa 3 test đỏ** trong `pattern-library.test.tsx`: chẩn nguyên nhân, sửa source hoặc dữ liệu pattern. Không nới assertion, không skip.
3. **B4 — Format:** thêm bước Prettier vào cuối `generate-stories.mjs` và `generate-exports.mjs` (gọi `prettier --write` programmatically hoặc CLI). Sau đó format 19 file còn lại (README, `scripts/sync-to-design-guide.mjs`, 8 demo shell, 6 component/showcase, `src/lib/index.ts`). Nếu chọn hướng ignore file sinh, tạo `.prettierignore` và ghi rõ lý do.
4. **B3 — `zod` sang `devDependencies`.**

**Gate 1:** `npm run lint`, `npm test`, `npm run format:check` đều PASS; `typecheck` vẫn PASS.

**Bằng chứng:** log 4 lệnh; `git diff --stat` chỉ chứa file thuộc phase.

### Phase 2 — Git hygiene (A1), sau quyết định carbon

**Mục tiêu:** giảm bloat nhưng không làm hỏng test citation.

**D0 — chốt cơ chế carbon trước khi làm bất kỳ bước nào:**
- **D0a — Giữ tracked** (an toàn nhất, repo tiếp tục 94 MB).
- **D0b — Submodule** trỏ repo Carbon đã pin commit.
- **D0c — Fetch script** `scripts/fetch-carbon-reference.mjs` tải archive pin commit + checksum; CI chạy trước `npm test`; test báo lỗi rõ nếu thiếu.
- **D0d — Bỏ hẳn** khỏi package, chuyển citation test sang skip có điều kiện và ghi limitation.

Đề xuất: **D0c** nếu xác nhận được license cho phép phân phối lại; nếu không, **D0a** cho tới khi có nguồn hợp lệ.

Sau D0:
1. `git rm --cached -r artifact` + thêm `artifact/` vào `.gitignore`.
2. `git rm --cached -r draft` (đã có trong `.gitignore` nhưng vẫn track từ trước).
3. Carbon theo D0.
4. Xoá `src/shadcn-tokens-original.css` (V12), `.DS_Store` trong `src/showcase/`.
5. **Không** chạy `git filter-repo` trong task này. Quyết định D2 riêng.

**Gate 2:** `git ls-files` không còn `artifact/`, `draft/`; carbon đúng phương án D0. Chạy full gate tại chỗ và trong một `git clone` tạm; test citation PASS.

### Phase 3 — CI (A2)

1. Tạo `.github/workflows/ci.yml`, chạy trên `pull_request` + `push`:
   - `npm ci`
   - `npm run typecheck`
   - `npm run lint`
   - `npm test`
   - `npm run format:check`
   - `npm run build:lib && npm run verify:lib`
   - `npm run pack:local && npm run test:consumer`
2. Ghim Node 22, bật cache npm.
3. Bỏ `build:lib` trùng: `pack:local` đã gọi `build:lib`. Chọn một trong hai: bỏ step `build:lib` riêng, hoặc bỏ `build:lib` khỏi `pack:local`.
4. Nếu D0c: thêm step fetch carbon trước `npm test`.
5. Không publish, không deploy. `prepack` guard giữ nguyên.

**Gate 3:** workflow xanh trên PR thử; không có secret; thời gian chạy ghi lại.

### Phase 4 — Token & CSS publish

1. **B1 — sửa root cause thay vì xoá mù:**
   - Chọn một: bỏ prefix `--primitive-color-` trong `brand.css`, hoặc thêm alias block `--primitive-color-*: var(--*)`.
   - Điền giá trị hợp lệ cho 4 token thiếu (`white-a0`, `black-a0`) và 4 token NaN đang dùng (`white-a35`, `black-a30`, `white-a5`, `black-a3`).
   - Xử lý 70 token `#NaNNaNNaN` còn lại trong `primitive.css`: sửa giá trị, hoặc chuyển `primitive.css` sang `docs/tokens/` dạng reference-only, bỏ `@import` khỏi `brand.css`.
   - Cập nhật comment "Generated by tokens/generate.py" theo V13; ghi rõ nguồn `skytrack-ui-android`.
2. **B2 — tách CSS showcase:** tạo `src/showcase/showcase.css`, import trong `src/main.tsx`, xoá rule khỏi `src/index.css`.
3. **Kiểm chứng trực quan:** chụp `dist-lib/styles.css` trước/sau; so token và class; ghi rõ điểm đổi màu nếu có.

**Gate 4:** `verify:lib` PASS; `dist-lib/styles.css` không còn `data-showcase-view`; không còn `#NaNNaNNaN` trong file ship; không đổi tên token public.

### Phase 5 — Một nguồn spec

1. `sheet.tsx` derive variant/size từ `buttonVariants`/`toggleVariants` thay vì hardcode; nếu không import được cva runtime, sinh dữ liệu từ component bằng script.
2. `sync-sheet-specs.mjs` so **giá trị** option list, không chỉ kiểm component có mặt.
3. V14: mỗi component mới phải có guide cùng commit; thêm check số guide = số component, loại `_template.md`.

**Gate 5:** `lint` PASS; thêm component giả không có guide thì check đỏ đúng; sửa một variant trong component mà không cập nhật sheet thì check đỏ.

### Phase 6 — Guardrail (thiết kế lại)

Theo pattern `skytrack-mission-studio`, nhưng rule đúng với package này:

1. `agents/file-size-baseline.json`: ngưỡng bằng số dòng hiện tại, không đặt mục tiêu lý tưởng.
2. `scripts/architecture-guardrails.cjs`, chỉ cấm:
   - Cycle import giữa các file trong `src/components/ui/`.
   - `src/components/ui/*` hoặc `src/lib/*` import `src/showcase/*` hoặc `src/demos/*`.
   - Deep import nội bộ không qua public file (trừ `@/lib/*`).
3. Cho phép rõ ràng: `components/ui/*` import `components/ui/*`; `src/lib/index.ts` import `components/ui/*`.
4. Thêm fixture âm trong test để chứng minh guardrail bắt được vi phạm.

**Gate 6:** guardrail PASS trên code hiện tại; 3 fixture âm đều bị bắt; `agents/` được commit.

### Phase 7 — Tách file lớn (task riêng)

Chỉ bắt đầu sau Gate 6. Tách theo ranh giới dữ liệu/render, không sửa logic.

**Trạng thái 2026-11-12:** `COMPLETE`. Chi tiết + bằng chứng: `agents/task-work/T-442/verification.md` (sheet) và `agents/task-work/T-443/verification.md` (các file còn lại).

| File | Hiện tại | Mục tiêu | Trạng thái |
|---|---|---|---|
| `src/showcase/pattern-library/page-content.ts` | 12.173 → 1 dòng (barrel) | 1 file / pattern (26 file) trong `pattern-library/pages/` | `COMPLETE` (`T-443`) |
| `src/showcase/pattern-library/demos.tsx` | 5.800 → 1 dòng (barrel) | 1 file / pattern trong `pattern-library/demos/` | `COMPLETE` (`T-443`) |
| `src/showcase/sheet-specimens.tsx` | 2.600 → 1 dòng (barrel) | tách theo nhóm component trong `specimens/` | `COMPLETE` (`T-443`) |
| `src/showcase/App.tsx` | 1.433 → 518 dòng | tách router (`app/registry.ts`) và thumbnail (`app/thumbnails.tsx`) | `COMPLETE` (`T-443`) |
| `src/showcase/sheet.tsx` | 1.283 → 682 dòng | tách `SPECS` (dữ liệu) khỏi render | `COMPLETE` (`T-442`) |

**Gate 7:** PASS — `typecheck`, `lint`, `guardrails`, `test`, `format:check`, `build`, `build:lib`, `verify:lib`; ảnh before/after route `/`, `sheet`, `showcase`, `showcase&panel=dashboard`, `pattern` diff 0 pixel (trừ Progress demo tự đổi `52%`/`45%`); text hash khớp cho 11 pattern page; CSS bundle hash không đổi; public API không đổi.

### Phase 8 — Smoke test theo component (task riêng)

**Trạng thái 2026-11-12:** `COMPLETE`. Bằng chứng: `agents/task-work/T-444/verification.md`.

1. Một file parametrized cho 56 component — `src/showcase/component-smoke.test.tsx` (đặt ngoài `src/components/ui/` để không vi phạm guardrail layer UI→showcase).
2. Assertion tối thiểu: render không crash; có `data-slot`, role ARIA hoặc form element; không có `[data-demo-error]`.
3. Component cần provider/browser API phải có wrapper trong test, không skip: demo tự bọc provider; `calendar` chưa có demo nên dùng `MANUAL_CASES`; `matchMedia`/`ResizeObserver`/`IntersectionObserver` được stub trong `beforeAll`.

**Gate 8:** PASS — 56/56 case PASS; component mới thiếu demo/case thì test đỏ; demo lạ không có spec hoặc không nằm trong danh sách shell cũng đỏ.

### Phase 9 — Đóng gói & phát hành (Owner quyết định)

1. **C1 — nội dung tarball:** giữ `["dist-lib","README.md"]` hoặc thêm `AGENTS.md` + `skills/skytrack-ui`. Nếu thêm, cập nhật `scripts/test-consumer.mjs`.
2. **C2 — registry:** giữ `"private": true`, không `publishConfig`. Chưa chọn registry.

**Gate 9:** `pack:local` + `test:consumer` PASS theo nội dung tarball đã chốt.

---

## 5. Tiêu chí nghiệm thu

- [ ] `src/components/ui/` có đúng 1 file `.tsx` cho mỗi subpath; file test `.test.tsx` được phép; không có helper `.ts` lẻ.
- [ ] `npm run generate:exports` chạy thành công và không làm đổi `src/lib/index.ts`, `src/lib/entries.json`.
- [ ] `npm run typecheck` PASS.
- [ ] `npm run lint` PASS (gồm `sync-sheet-specs.mjs`).
- [ ] `npm test` PASS, gồm 3 test citation/pattern hiện đang đỏ.
- [ ] `npm run format:check` PASS. File sinh tự động hoặc đúng format, hoặc nằm trong `.prettierignore` có ghi lý do.
- [ ] `npm run build:lib` + `npm run verify:lib` PASS cả 6 nhóm.
- [ ] `dist-lib/styles.css` không chứa `data-showcase-view`; không chứa `#NaNNaNNaN`; không chứa token chỉ dùng cho showcase.
- [ ] 100 ref `--primitive-color-*` trong `brand.css` resolve đúng, hoặc đã chuyển sang alias được kiểm chứng.
- [ ] `git ls-files` không còn `artifact/`, `draft/`; carbon đúng phương án D0.
- [ ] Clone sạch chạy full gate PASS.
- [ ] `.github/workflows/ci.yml` tồn tại, chạy đủ bước, xanh trên PR thử.
- [ ] Guardrail bắt đúng 3 fixture âm; không đỏ trên code hiện tại.
- [ ] Không file nào vượt ngưỡng `agents/file-size-baseline.json`.
- [ ] `package.json#dependencies` không chứa `zod`.
- [ ] Guide count khớp component count (loại `_template.md`); `code-block-tree` có guide.
- [ ] Không có thay đổi public API: 415 root value, 74 root type, 56 subpath.

---

## 6. Rủi ro & biện pháp

| Rủi ro | Biện pháp |
|---|---|
| A1 làm mất input của test citation | Chốt D0 trước; test trong `git clone` tạm sau khi gỡ |
| B1 đổi giá trị màu consumer thấy | So `dist-lib/styles.css` trước/sau; 94/100 fallback đã trùng giá trị primitive, chỉ 6 điểm lỗi cần xử lý |
| B2 làm đổi nền trang demo | Screenshot trước/sau; `verify:lib` + diff CSS |
| Phase 1 format 80 file gây diff lớn | Commit riêng chỉ chứa format, không trộn logic |
| B4 đổi output generator | So `git diff --stat src/stories`, chỉ khác whitespace/quote |
| B7 guardrail đỏ ngay | Ngưỡng = baseline; rule chỉ cycle + tầng; fixture âm chạy riêng |
| Phase 7 tách file gây regression | Không sửa logic; screenshot + test + lint trước/sau |
| A1 `git rm --cached` làm mất file trên máy | Dùng `--cached`, giữ file trên đĩa; xác nhận trước commit |
| WIP hiện có bị commit lẫn | Phase 0 chốt baseline và nhánh; mỗi phase một commit |
| Nested repo và workspace repo cùng track file | Commit chỉ vào `designs/components/skytrack-ui`; X1 giải quyết ở task riêng |

---

## 7. Phát hiện ngoài phạm vi package

Không thực hiện trong task này. Ghi để Owner mở task khác.

| ID | Vấn đề | Vị trí |
|---|---|---|
| X1 | Workspace repo vẫn track 146 file trong `skytrack-ui/`; `git diff --stat` tới HEAD = 132 file khác; workspace còn track `AGENT_GUIDE.md` đã xoá trên đĩa, trong khi package track `AGENTS.md` | workspace `git ls-files`, `git diff --stat` |
| X2 | `skytrack-design-guide` sync 1 chiều từ package, hiện drift 52 file, repo có 158 file dirty | `diff -rq`, `git status` |
| X3 | Workspace `.gitignore` có `_tasks` nhưng 540 file `_tasks` đã track từ trước | workspace `git status --ignored` |
| X4 | `DASHBOARD.md` untracked; `skills/` workspace 0 file track; `decisions/` 1/35 file track | workspace `git ls-files` |
| X5 | Workspace `.git` 8,3 GB; `designs/3d-assets/**` chứa `.dae` 339 MB, `.blend` 77 MB, `.glb` 99 MB, mp4 | workspace `git ls-files` |
| X6 | `skytrack-design-guide/ci/validate-tokens.yml` gọi `scripts/validate_tokens.py` không tồn tại | guide repo |
| X7 | `prototype-hub` track `dist-3d/` (479 file build output) + `singles/` | hub repo |
| X8 | `skytrack-mission-studio/src/features/library/database/worlds/*.glb` — 3 file ~340 MB trong `src/` | mission-studio repo |

X2–X8 chưa được kiểm lại trong v2; cần verify trước khi mở task.

---

## 8. Quyết định cần Owner chốt

| ID | Quyết định | Đề xuất |
|---|---|---|
| D0 | Carbon reference cho test: tracked, submodule, fetch script, hay bỏ | Fetch script nếu license cho phép; nếu không, giữ tracked |
| D1 | `primitive.css`: sửa giá trị và giữ, hay chuyển `docs/` reference-only | Sửa 6 token lỗi, chuyển reference-only nếu không còn consumer |
| D2 | Lịch sử git 166 MB: `git filter-repo` hay chỉ gỡ ở commit hiện tại | Chỉ gỡ hiện tại trong task này; filter-repo task riêng |
| D3 | Storybook: giữ generator (đề xuất) hay bỏ hẳn | Giữ generator, sửa format |
| D4 | Tarball: `["dist-lib","README.md"]` hay thêm `AGENTS.md` + `skills/skytrack-ui` | Giữ nguyên; mở task riêng nếu muốn agent đọc trong `node_modules` |
| D5 | `code-block-tree`: commit cùng task hay tách | Tách task riêng, vì đang untracked và có 4 file |
| D6 | Guardrail: chấp nhận rule cycle + tầng như Phase 6 | Chấp nhận |
| D7 | Tách Phase 7 và Phase 8 thành task riêng ngay | Tách |
| D8 | Workspace repo tiếp tục track 146 file trong package | Chờ nghị quyết X1 trước khi commit CI/plan |

---

## 9. Vì sao v2 thay v1

1. **v1 A1 đá A2/B9.** Test đọc `docs/carbon-ds-reference`; gỡ tracked làm CI và clone sạch đỏ. v2 thêm D0 và gate clone sạch.
2. **v1 bật CI khi baseline đỏ.** v1 không ghi `npm test` FAIL 3 test. v2 thêm V15, Phase 0 và Phase 1 trước CI.
3. **v1 B7 sai rule.** Cấm import chéo `components/ui/*` và cấm `lib → components/ui` sẽ đỏ ngay vì barrel và composite component. v2 chỉ cấm cycle và sai tầng.
4. **v1 B5 không khả thi.** Demo là `DemoMeta` object, không phải CSF; đổi glob Storybook sang `src/demos` không sinh story. v2 giữ generator.
5. **v1 V1 sai root cause.** Vấn đề là lệch prefix `--primitive-color-*`, không phải "371 token chết"; xoá `primitive.css` không sửa `brand.css`. v2 sửa theo root cause và tính cả 70 token NaN.
6. **Số liệu v1 lệch:** 414 thành 415 export, 55/55 thành 56/56 subpath, 20 thành 21 file `focus-ring`, V13 sai nguồn generator, V14 thiếu `_template`, "demo 1-1" sai.
7. **v1 thiếu baseline vận hành:** không task file, không record baseline, không xử lý 40+ file modified và 14 path untracked, nên dễ commit lẫn.
8. **v1 scope quá rộng:** 10 việc lớn trong một phase B. v2 chia phase có gate và tách Phase 7/8 thành task riêng.
9. **v1 B4 không đủ đạt `format:check` 0:** chỉ sửa 2 generator, còn 19 file thủ công lỗi format. v2 thêm bước format toàn repo hoặc `.prettierignore`.
