# Kế hoạch Tổ chức Source & Nâng cao Chất lượng (`skytrack-ui`)

**Trạng thái:** `DRAFT` (Chờ Owner duyệt trước khi thực thi)
**Phạm vi:** Chỉ repository [`designs/components/skytrack-ui`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui) — mọi path trong tài liệu này là tương đối so với thư mục gốc package.
**Ngoài phạm vi (Out of scope):** Workspace root `SkyTrack/`, repo `skytrack-design-guide`, `skytrack-mission-studio`, `skytrack-ui-android`, `prototype-hub`. Các phát hiện liên quan tới các repo đó được ghi ở Mục 6 làm đầu vào cho một task riêng, không thực hiện trong task này.
**Ngày audit:** 2026-11-12 · **Cập nhật:** 2026-11-12
**Ghi chú:** Bản này thay thế nội dung cũ của file (kế hoạch 5 phase ban đầu). Trạng thái thực tế của từng phase cũ được đánh dấu ở Mục 3.

---

## 1. Mục tiêu & Nguyên tắc bất biến

1. **Giữ nguyên cấu trúc phẳng `src/components/ui/<component>.tsx`** — 1-1 với `package.json#exports`, `scripts/generate-exports.mjs` và `vite.lib.config.ts`. Cấu trúc phẳng là best practice cho thư viện dạng shadcn/Base UI. Không tách thành `src/components/ui/<component>/index.tsx`.
2. **Bảo toàn 100% Public API** — mọi export ở root (`skytrack-ui`), subpath (`skytrack-ui/<component>`) và stylesheet (`skytrack-ui/styles.css`) giữ nguyên tên và kiểu dữ liệu.
3. **Tách bạch 4 tầng trách nhiệm:**
   - **Tầng 1 — Core UI Components** (`src/components/ui/*.tsx`): đúng 1 file `.tsx` cho mỗi public subpath.
   - **Tầng 2 — Internal Shared Primitives** (`src/lib/`): barrel entry (`index.ts`, `entries.json`), `utils.ts` (`cn`), primitives dùng chung nội bộ.
   - **Tầng 3 — Theme & Styles** (`src/styles/`, `src/index.css`, `src/styles.css`): chỉ CSS/tokens của thư viện. CSS riêng của trang showcase phải nằm ở `src/showcase/`.
   - **Tầng 4 — Showcase, Docs, Skills & Tooling** (`src/showcase/`, `src/demos/`, `src/stories/`, `skills/`, `docs/`, `scripts/`): demo, tài liệu, tooling.
4. **Không có CSS showcase trong artifact publish.** `dist-lib/styles.css` là thứ consumer nhận — mọi rule chỉ phục vụ trang demo không được nằm trong đó.
5. **Không có file sinh tự động vi phạm style repo.** Mọi script generator phải xuất ra đúng `prettier` config của package.

---

## 2. Trạng thái hiện tại (đo 2026-11-12)

### 2.1. Cấu trúc đang hoạt động tốt — không đụng

| Hạng mục | Số liệu | Kiểm chứng |
|---|---|---|
| Component files | 56 `.tsx` (không tính test) | `ls src/components/ui/*.tsx` |
| Public subpath | 56 | `package.json#exports` trừ `.`, `./package.json`, `./styles.css` — khớp 1-1, 0 file dư, 0 subpath thiếu |
| Root barrel | 414 tên export | `npm run verify:lib` → PASS |
| Subpath import | 55/55 import sạch | `npm run verify:lib` → PASS |
| Tailwind coverage | 442/442 class compile vào `styles.css` | `npm run verify:lib` → PASS |
| `src/lib/` | đã tách đúng (`control-sizes.ts`, `focus-ring.ts`, `popup-arrow.tsx`) | 20 file import `@/lib/focus-ring`; 4 file dùng `popup-arrow` |
| Demo ↔ component | 1-1 | `scripts/sync-sheet-specs.mjs` |

### 2.2. Phát hiện — tổ chức source

| ID | Vấn đề | Bằng chứng | Mức |
|---|---|---|---|
| **V1** | `src/styles/primitive.css` định nghĩa **371 token, 0 token nào được dùng** ở bất kỳ đâu ngoài chính file. `brand.css` tham chiếu **100 biến `--primitive-color-*` không tồn tại** trong bất kỳ file nào → rơi về fallback, **8 fallback là `#NaNNaNNaN`** (giá trị CSS không hợp lệ) | `src/styles/brand.css:40-43, 82-85`; `src/styles/primitive.css:214-288` | Cao |
| **V2** | `src/index.css:196` chứa `body[data-showcase-view='style-overview']` → **đóng gói vào `dist-lib/styles.css`** mà consumer nhận | `dist-lib/styles.css` 118 KB, 552 custom prop | Cao |
| **V3** | `generate-stories.mjs` + `generate-exports.mjs` xuất `doubleQuote` + `semicolon`, còn `.prettierrc` đặt `singleQuote` + `semi:false`. Hệ quả: **`npm run format:check` FAIL 80 file** (61 story sinh tự động + 19 file khác) | `npm run format:check` | Cao |
| **V4** | **Hai nguồn cho spec component.** Variant/size của Button định nghĩa ở `buttonVariants` (cva, trong component) *và* lặp lại ở `sheet.tsx:332` (`BUTTON_VARIANTS`, `BUTTON_SIZES`) cho 6 component dùng chung. `sync-sheet-specs.mjs` chỉ check *có mặt*, không check *giá trị* | `src/showcase/sheet.tsx:332-333` | Trung bình |
| **V5** | **Test coverage 3/56 component** (`inline-edit`, `sidebar`, `code-block`). Không có smoke test theo component, không có a11y regression. `@testing-library/react` đã có sẵn | `find src -name '*.test.*'` → 6 file | Cao |
| **V6** | **File quá lớn, không có guardrail.** `pattern-library/page-content.ts` = **12.173 dòng** (26 pattern dạng object trong 1 file); `sheet-specimens.tsx` 2.600; `App.tsx` 1.433; `sheet.tsx` 1.271. Package **không có** `file-size-baseline.json` + `architecture-guardrails.cjs` (pattern này đã có ở `skytrack-mission-studio`) | `wc -l` | Trung bình |
| **V7** | `zod` nằm ở `dependencies` nhưng **chỉ `src/demos/form.demo.tsx` dùng** → consumer cài `skytrack-ui` bị kéo `zod` vô ích | `grep -rn "from 'zod'" src` | Thấp |
| **V8** | `src/stories/` (62 file) chỉ re-render `demo.variants[i].render()` — **2 bản render cùng code**. Storybook import `VariantBlock` từ `src/showcase/demo.tsx` → package dev phụ thuộc showcase | `scripts/generate-stories.mjs` | Thấp |
| **V9** | **Repo bloat trong chính package.** Track `docs/carbon-ds-reference/` (**2.447 file, 94 MB** — ảnh/gif/mp4 của Carbon, tài liệu bên ngoài, không phải code SkyTrack), `artifact/skytrack-ui-probe.html` (26 MB), `draft/` (5 file). `.git` của package = 166 MB | `git ls-files` | Cao |
| **V10** | **Không có CI.** Package không có `.github/`. Không workflow nào chạy `typecheck` / `lint` / `test` / `format:check` / `verify:lib` | `ls -a` → không có `.github` | Cao |
| **V11** | **`npm run lint` đang FAIL (exit 1).** `sync-sheet-specs.mjs` báo thiếu component `code-block-tree` trong `sheet.tsx`. Component mới đang ở trạng thái untracked, chưa đăng ký vào sheet | `npm run lint` | Cao |

### 2.3. Phát hiện — vòng đời package

| ID | Vấn đề | Bằng chứng |
|---|---|---|
| **V12** | `src/shadcn-tokens-original.css` (3,4 KB) không được import ở bất kỳ đâu — file tham chiếu chết | `grep -rn "shadcn-tokens-original" src` → 0 |
| **V13** | `src/styles/shared-tokens.css` ghi "Generated by tokens/generate.py. Do not edit." nhưng **không có `tokens/` hay `generate.py`** trong repo → dấu vết generator đã mất | `find . -name "generate.py"` → 0 |
| **V14** | `skills/skytrack-ui/references/knowledge/components/` có 56 file guide cho 56 component, nhưng `code-block-tree.md` mới chỉ tồn tại dạng untracked → lệch số | `git status` |

---

## 3. Trạng thái 5 phase của kế hoạch cũ

| Phase | Nội dung | Trạng thái | Ghi chú |
|---|---|---|---|
| 1 | Tách internal shared primitives về `src/lib/` | `COMPLETE` | `control-sizes.ts`, `focus-ring.ts`, `popup-arrow.tsx` đã có; 20 file đã đổi import `focusRing` |
| 2 | Làm sạch & tách bạch styles | `NOT_STARTED` | `shadcn-tokens-original.css` còn; 8 fallback `#NaNNaNNaN` còn; `body[data-showcase-view]` còn trong `src/index.css` → xem Phase B1 + B2 |
| 3 | Đồng bộ `skills/` với `package.json` & `scripts/` | `PARTIAL` | `files` đã khớp `test-consumer.mjs` (`["dist-lib","README.md"]`); `zod` chưa chuyển sang `devDependencies` → xem Phase B3 |
| 4 | Dọn thư mục root & git hygiene | `NOT_STARTED` | `draft/`, `artifact/`, `docs/carbon-ds-reference/` vẫn được track → xem Phase A1 |
| 5 | Code hygiene kèm theo | `PARTIAL` | `radio.tsx` đã bỏ `newLocal`; `inline-edit.tsx` đã tách 2 `useLayoutEffect`; `sidebar.tsx` đã `useCallback` cho `toggleSidebar`; `App.tsx` đã bỏ `aria-hidden` trên `<a>`; `cn()` trong `App.tsx` đã được thay bằng class cố định |

**Câu hỏi Owner còn treo từ bản cũ (chuyển sang Mục 8):** đóng gói `skills/` trong tarball (`package.json#files`) — hiện đang **không** đóng gói, tức là consumer cài từ tarball không có `AGENTS.md`/`skills/` để agent đọc.

---

## 4. Lộ trình thực thi

### Phase A — Vệ sinh repository (không đụng runtime code)

**A1. Gỡ file tham chiếu chết + dung lượng git**
1. `git rm --cached -r docs/carbon-ds-reference` (giữ file trên đĩa; thêm `docs/carbon-ds-reference/` vào `.gitignore` của package). **Không** dùng `git filter-repo` trong task này — lịch sử 166 MB cần Owner chốt riêng.
2. `git rm --cached artifact/skytrack-ui-probe.html` + thêm `artifact` vào `.gitignore`.
3. `git rm --cached -r draft` (file đã có trong `.gitignore` nhưng vẫn được track từ trước) — giữ file trên đĩa.
4. Xoá `src/shadcn-tokens-original.css` (V12) — không còn import.
5. Xoá `.DS_Store` còn sót trong `src/showcase/` (đã được `.gitignore` bắt, chỉ dọn đĩa).

**A2. CI thật cho package**
Tạo `.github/workflows/ci.yml` trong package, chạy trên `pull_request` + `push`:
```
npm ci
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build:lib && npm run verify:lib
npm run pack:local && npm run test:consumer
```
Không publish, không deploy. `prepack` guard (`private: true`, không `publishConfig`) giữ nguyên vai trò.

**A3. Đăng ký component mới vào sheet (V11)**
Thêm `code-block-tree` vào `SPECS` trong `src/showcase/sheet.tsx` để `npm run lint` về xanh. Component `code-block-tree.tsx` + `code-block-tree.md` đang untracked → commit cùng đợt hoặc tách task riêng, tùy Owner.

---

### Phase B — Vệ sinh source trong package

**B1. Thu gọn token layer (V1, V13)**
1. Xoá 8 fallback `#NaNNaNNaN` tại `src/styles/brand.css:40-43, 82-85` → thay bằng giá trị hợp lệ (`transparent` / `rgb(255 255 255 / 0.05)` / `rgb(0 0 0 / 0.3)`).
2. Quyết định vòng đời `src/styles/primitive.css`: hoặc **xoá hẳn** (371 token không ai dùng), hoặc **giữ làm bảng màu tham chiếu cho Figma** và chuyển sang `docs/` + đánh dấu rõ "reference only, không ship". Không được để 2 nhánh này tồn tại song song mơ hồ.
3. Nếu giữ bảng màu: sửa dòng "Generated by tokens/generate.py. Do not edit." — không có generator trong repo, dấu vết này gây hiểu nhầm.

**B2. Tách CSS showcase khỏi package publish (V2)**
1. Tạo `src/showcase/showcase.css` chứa `body[data-showcase-view='style-overview']`.
2. Import trong `src/main.tsx`.
3. Xoá rule khỏi `src/index.css`.
4. Kiểm chứng: `dist-lib/styles.css` không còn chuỗi `data-showcase-view`.

**B3. `zod` → `devDependencies` (V7)**
Chuyển trong `package.json`. `zod` không được import ở bất kỳ file nào thuộc `src/components/` hay `src/lib/`.

**B4. Cho generator emit đúng style repo (V3)**
Thêm bước format vào cuối `generate-stories.mjs` và `generate-exports.mjs` (chạy Prettier programmatically, hoặc gọi `prettier --write` sau khi ghi file). Mục tiêu: `npm run format:check` về 0 warn, và file sinh tự động không bao giờ làm đỏ CI.

**B5. Một nguồn render demo (V8)**
Storybook import `demo` trực tiếp thay vì giữ 62 file re-export → xoá `src/stories/*.stories.tsx` sinh tự động, chuyển `.storybook/main.ts` trỏ sang `src/demos`. `src/demos/` thành nguồn duy nhất. *(Có thể bỏ hẳn Storybook nếu Owner thấy showcase đã đủ — xem Mục 8.)*

**B6. Derive spec từ component thay vì lặp (V4)**
`src/showcase/sheet.tsx` đọc `buttonVariants` / cva thật thay vì hardcode `BUTTON_VARIANTS`, `BUTTON_SIZES`. `scripts/sync-sheet-specs.mjs` kiểm tra **cả giá trị** (so sánh với option list trong component), không chỉ kiểm tra component có mặt.

**B7. Guardrail file-size + kiến trúc (V6)**
Thêm vào package, theo pattern đã chạy ở `skytrack-mission-studio`:
- `agents/file-size-baseline.json` — ngưỡng dòng/file hiện tại.
- `scripts/architecture-guardrails.cjs` — cấm import chéo giữa `components/ui/*`, cấm `lib` → `components/ui`, cấm `components/ui` → `showcase`/`demos`.
- Script fail khi file vượt ngưỡng (đặt ngưỡng chặt ở baseline hiện tại để không đột ngột đỏ).

**B8. Tách file lớn (V6)**
| File | Hiện tại | Mục tiêu |
|---|---|---|
| `src/showcase/pattern-library/page-content.ts` | 12.173 dòng | 1 file / pattern (26 file) trong `pattern-library/pages/` |
| `src/showcase/sheet-specimens.tsx` | 2.600 dòng | tách theo nhóm component |
| `src/showcase/App.tsx` | 1.433 dòng | tách router + showcase panel + header |
| `src/showcase/sheet.tsx` | 1.271 dòng | tách `SPECS` (dữ liệu) khỏi phần render |

**B9. Test theo component (V5)**
Mục tiêu: 1 smoke test / component — render, đúng vai trò ARIA, đúng `data-slot`. Dùng `@testing-library/react` sẵn có. Có thể làm 1 file test parametrized cho toàn bộ 56 component thay vì 56 file.

**B10. Đồng bộ guide component ↔ component mới (V14)**
Mỗi component mới phải có `skills/skytrack-ui/references/knowledge/components/<id>.md` trong cùng đợt commit. Thêm check vào `lint-ui-practices.mjs`: số file guide = số component file.

---

### Phase C — Đóng gói & phát hành (cần Owner chốt trước)

**C1. Chọn nội dung tarball**
Hiện `package.json#files` = `["dist-lib", "README.md"]`. Cân nhắc thêm `"AGENTS.md"` và `"skills/skytrack-ui"` để agent ở project consumer đọc được ngay trong `node_modules/skytrack-ui/`. Nếu thêm → `scripts/test-consumer.mjs` phải cập nhật `topLevel` và `isForbidden` cho khớp.
Cần Owner chốt: **C1a** chỉ `["dist-lib","README.md"]` (giữ nguyên) hay **C1b** kèm `AGENTS.md` + `skills/skytrack-ui`.

**C2. Chốt registry**
`package.json` giữ `"private": true`, không `publishConfig`. Chưa có đích registry — đây là quyết định của Owner, task này không thực hiện.

---

## 5. Tiêu chí nghiệm thu

- [ ] `src/components/ui/` chỉ còn file `.tsx` tương ứng 1-1 với subpath trong `package.json#exports`; `0` file `.ts` helper lẻ.
- [ ] `npm run generate:exports` chạy thành công và không làm đổi `src/lib/index.ts` / `src/lib/entries.json`.
- [ ] `npm run typecheck` PASS (0 lỗi).
- [ ] `npm run lint` PASS (exit 0) — gồm `sync-sheet-specs.mjs`.
- [ ] `npm test` PASS — có smoke test cho **mọi** component.
- [ ] `npm run format:check` PASS (0 warn) — kể cả file do generator sinh.
- [ ] `npm run build:lib` + `npm run verify:lib` PASS toàn bộ 6 nhóm check.
- [ ] `dist-lib/styles.css` **không** chứa `data-showcase-view` và không chứa token chết từ `primitive.css`.
- [ ] Không còn `#NaNNaNNaN` trong `src/styles/`.
- [ ] `git ls-files` không còn `docs/carbon-ds-reference/`, `artifact/`, `draft/`.
- [ ] `.github/workflows/ci.yml` tồn tại và chạy 7 bước ở Phase A2.
- [ ] Không file nào trong `src/` vượt ngưỡng của `agents/file-size-baseline.json`.
- [ ] `package.json#dependencies` không chứa dependency chỉ dùng bởi demo (`zod`).

---

## 6. Phát hiện ngoài phạm vi package (chuyển task riêng)

Không thực hiện trong task này. Ghi lại để Owner quyết định mở task khác:

| ID | Vấn đề | Vị trí |
|---|---|---|
| X1 | Workspace repo **vẫn track 146 file bên trong `skytrack-ui/`**; trong 145 file trùng path, **131 file khác nội dung** giữa HEAD workspace và HEAD package → 2 nguồn chân lý cho cùng 1 file | workspace `git ls-files` |
| X2 | `skytrack-design-guide` là **bản sync 1 chiều** từ package (`scripts/sync-to-design-guide.mjs`), hiện drift **52 file** và repo đó có 158 file dirty | `diff -rq` + `git status` |
| X3 | Workspace root `.gitignore` có `_tasks` nhưng **540 file `_tasks` đã được track** từ trước → 556 file task mới bị ignore, không vào git | workspace `git status --ignored` |
| X4 | `DASHBOARD.md` untracked; `skills/` (workspace) 0 file track; `decisions/` chỉ 1/35 file track | workspace `git ls-files` |
| X5 | Workspace `.git` = 8,3 GB; `designs/3d-assets/**` chứa `.dae` 339 MB, `.blend` 77 MB, `.glb` 99 MB, mp4 | workspace `git ls-files` |
| X6 | `skytrack-design-guide/ci/validate-tokens.yml` gọi `scripts/validate_tokens.py` — **file không tồn tại** → workflow đỏ ngay | guide repo |
| X7 | `prototype-hub` track `dist-3d/` (**479 file build output**) + `singles/` | hub repo |
| X8 | `skytrack-mission-studio/src/features/library/database/worlds/*.glb` — 3 file ~340 MB binary nằm trong `src/` | mission-studio repo |

---

## 7. Rủi ro & biện pháp

| Rủi ro | Biện pháp |
|---|---|
| B2/B1 làm đổi CSS đang publish → consumer thấy nền khác | Kiểm chứng bằng `npm run build:lib && npm run verify:lib` + so sánh `dist-lib/styles.css` trước/sau (giữ file cũ để diff) |
| B4 đổi output generator → story index đổi tên | Chạy `generate-stories.mjs` và so `git diff --stat src/stories` — chỉ được khác ở whitespace/quote |
| B7 guardrail đỏ ngay khi thêm | Đặt ngưỡng = baseline hiện tại, không đặt mục tiêu lý tưởng ngay |
| B8 tách file lớn → rủi ro regression logic | Tách theo ranh giới dữ liệu/render, không sửa logic; `npm test` + `npm run lint` trước/sau |
| A1 `git rm --cached` làm mất file trên máy Owner | Dùng `--cached` (giữ file trên đĩa), xác nhận trước khi commit |
| Package đang là nested git repo với remote riêng | Mọi commit trong task này commit vào repo `skytrack-ui` (`designs/components/skytrack-ui`), không commit vào workspace repo |

---

## 8. Câu hỏi cần Owner chốt

1. **C1** — Tarball: giữ `["dist-lib","README.md"]` hay thêm `AGENTS.md` + `skills/skytrack-ui`? (Ảnh hưởng trải nghiệm agent ở project consumer.)
2. **B1** — `primitive.css`: xoá hẳn 371 token, hay giữ làm bảng màu tham chiếu Figma (chuyển sang `docs/`, đánh dấu reference-only)?
3. **B5** — Storybook: giữ (chuyển sang import trực tiếp `src/demos`) hay bỏ hẳn vì showcase đã đủ?
4. **A1** — 166 MB lịch sử git của package: có chạy `git filter-repo` để cắt `docs/carbon-ds-reference` ra khỏi lịch sử không, hay chỉ gỡ ở commit hiện tại?
5. **A3** — `code-block-tree` (component + demo + story + guide, đang untracked): commit vào task này hay tách task riêng?
6. **X1** — Workspace repo có tiếp tục track 146 file trong package không? Cần nghị quyết nguồn chân lý (nested repo vs gộp) trước khi mọi việc git ở cả 2 repo an toàn.
