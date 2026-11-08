# Kế hoạch Tổ chức lại Cấu trúc Thư mục & Refactor Nội bộ (`skytrack-ui`)

**Trạng thái:** `DRAFT` (Chờ Owner duyệt trước khi thực thi)  
**Phạm vi:** Repository [`designs/components/skytrack-ui`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui)  
**Ngoài phạm vi (Out of scope):** Chuẩn hóa token `--radius` trên các UI controls (sẽ thực hiện ở đợt cập nhật riêng theo yêu cầu của Owner).

---

## 1. Mục tiêu & Nguyên tắc bất biến

1. **Giữ nguyên cấu trúc phẳng `src/components/ui/<component>.tsx` (53 files):**
   - Không chia nhỏ thành `src/components/ui/<component>/index.tsx`. Cấu trúc phẳng hiện tại là best practice cho thư viện dạng shadcn/Base UI, khớp 1-1 với `package.json#exports`, [`scripts/generate-exports.mjs`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/scripts/generate-exports.mjs) và [`vite.lib.config.ts`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/vite.lib.config.ts).
2. **Bảo toàn 100% Public API:**
   - Mọi export tại root (`skytrack-ui`), các subpath (`skytrack-ui/<component>`) và stylesheet (`skytrack-ui/styles.css`) giữ nguyên tên và kiểu dữ liệu.
3. **Tách bạch 4 tầng trách nhiệm:**
   - **Tầng 1 — Core UI Components (`src/components/ui/*.tsx`):** Chỉ chứa các file `.tsx` tương ứng 1-1 với public subpath exports.
   - **Tầng 2 — Internal Shared Primitives & Entry (`src/lib/`):** Chứa barrel entry (`index.ts`, `entries.json`), `utils.ts` (`cn`) và các primitive dùng chung nội bộ (`control-sizes.ts`, `focus-ring.ts`, `popup-arrow.tsx`) để xóa bỏ việc các component phải import chéo nhau.
   - **Tầng 3 — Theme & Styles (`src/styles/`, `src/index.css`, `src/styles.css`):** Chỉ chứa CSS/tokens của thư viện; tách CSS riêng của trang Showcase sang `src/showcase/`.
   - **Tầng 4 — Showcase, Docs, Skills & Tooling (`src/showcase/`, `src/demos/`, `src/stories/`, `skills/`, `docs/`, `scripts/`):** Dọn sạch các file rác, file backup cũ và đồng bộ cấu hình đóng gói (`package.json`).

---

## 2. So sánh Cấu trúc Trước & Sau khi Tổ chức lại

```text
skytrack-ui/
├── AGENTS.md                         # Entrypoint định tuyến cho AI Agent
├── README.md                         # Tài liệu hướng dẫn sử dụng package
├── package.json                      # [CẬP NHẬT] Đồng bộ "files" và chuyển zod -> devDependencies
├── .gitignore                        # [CẬP NHẬT] Bổ sung artifact/ và docs/carbon-ds-reference/
│
├── skills/
│   └── skytrack-ui/                  # Skill & references chính thức (thay thế knowledge/ cũ ở root)
│
├── docs/                             # Tài liệu kỹ thuật & kế hoạch nội bộ
│   ├── FOLDER-RESTRUCTURE-PLAN.md    # File kế hoạch này
│   ├── PATTERN-BACKLOG.md
│   ├── base-ui-api-audit.md
│   └── carbon-vs-skytrack-ui-analysis.md
│   # [DỌN DẸP] Dời hoặc gitignore docs/carbon-ds-reference/ (bản sao docs Carbon bên ngoài)
│
├──# [XÓA] artifact/skytrack-ui-probe.html (file probe tạm ở root)
├──# [UNTRACK GIT] draft/ (đã có trong .gitignore nhưng vẫn bị git track)
│
├── src/
│   ├── components/
│   │   └── ui/                       # [CHUẨN HÓA] Chỉ chứa đúng 53 file .tsx public components
│   │       ├── accordion.tsx
│   │       ├── button.tsx            # Re-export focusRing & controlSizeClasses từ @/lib/*
│   │       └── ... (53 file .tsx)
│   │       # [DỜI ĐI] control-sizes.ts -> src/lib/control-sizes.ts
│   │
│   ├── lib/                          # [MỞ RỘNG] Public barrel + Internal shared primitives
│   │   ├── index.ts                  # (Auto-generated) Root barrel
│   │   ├── entries.json              # (Auto-generated) Export map
│   │   ├── utils.ts                  # cn() helper (cải thiện generic typing)
│   │   ├── control-sizes.ts          # [MỚI - dời từ components/ui] CONTROL_SIZE_CLASSES, ControlSize
│   │   ├── focus-ring.ts             # [MỚI - tách từ button.tsx] Hằng số focusRing dùng chung
│   │   └── popup-arrow.tsx           # [MỚI - gom từ 4 component] PopupArrowGlyph (20x10 SVG)
│   │
│   ├── styles/                       # [LÀM SẠCH] Token CSS
│   │   ├── primitive.css             # Xóa ~170 dòng comment rác & #NaNNaNNaN
│   │   └── brand.css                 # Sửa 8 biến fallback #NaNNaNNaN & xóa comment thừa
│   ├── index.css                     # Theme core (fonts, :root, .dark, @theme, @layer)
│   ├── styles.css                    # Entrypoint CSS khi build:lib
│   ├──# [XÓA] shadcn-tokens-original.css (file backup cũ không còn sử dụng)
│   │
│   ├── demos/                        # 51 file *.demo.tsx
│   ├── stories/                      # 53 file *.stories.tsx
│   ├── showcase/                     # App trưng bày component (Vite dev / GitHub Pages)
│   │   ├── showcase.css              # [MỚI] Tách CSS riêng của showcase (body[data-showcase-view=...])
│   │   └── ...
│   └── main.tsx                      # Entry của Showcase app
│
└── scripts/
    ├── build-lib.mjs                 # Giữ nguyên (đã hỗ trợ rewrite alias @/lib/* trong .d.ts)
    ├── generate-exports.mjs          # Cải thiện stripComments để an toàn với string literal
    ├── verify-lib.mjs                # Giữ nguyên
    └── test-consumer.mjs             # [CẬP NHẬT] Khớp danh sách topLevel files với package.json mới
```

---

## 3. Lộ trình Thực thi Chi tiết (5 Phases)

### Phase 1: Tách Internal Shared Primitives về `src/lib/` (Xóa phụ thuộc chéo)

**Vấn đề hiện tại:**
- [`src/components/ui/control-sizes.ts`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/control-sizes.ts) là file `.ts` duy nhất nằm lẫn trong `src/components/ui/`.
- `focusRing` được định nghĩa trong [`src/components/ui/button.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/button.tsx#L8), khiến 18 component độc lập (`checkbox`, `radio`, `switch`, `select`, `combobox`, `autocomplete`, `input`, `field`, `number-field`, `otp-field`, `tabs`, `toggle`, `toolbar`, `accordion`, `popover`, `navigation-menu`, `scroll-area`, `toast`) phải import `@/components/ui/button` dù không hề render `<Button />`.
- Component SVG mũi tên `20x10` bị copy-paste 4 lần tại [`popover.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/popover.tsx#L74-L93), [`preview-card.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/preview-card.tsx#L73-L92), [`navigation-menu.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/navigation-menu.tsx#L143-L158), và [`toast.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/toast.tsx#L161-L176).

**Các bước thực hiện:**
1. Di chuyển [`src/components/ui/control-sizes.ts`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/control-sizes.ts) sang `src/lib/control-sizes.ts`.
2. Tạo `src/lib/focus-ring.ts` chứa hằng số `focusRing`.
3. Trong [`src/components/ui/button.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/button.tsx#L7-L12), re-export `focusRing` từ `@/lib/focus-ring` và `CONTROL_SIZE_CLASSES as controlSizeClasses`, `type ControlSize` từ `@/lib/control-sizes` để **không làm gãy** public export của `skytrack-ui` và `skytrack-ui/button`.
4. Cập nhật 18 component chỉ dùng `focusRing` (không dùng `Button`/`buttonVariants`) sang `import { focusRing } from '@/lib/focus-ring'`, và 7 component dùng `CONTROL_SIZE_CLASSES` sang `import { CONTROL_SIZE_CLASSES, type ControlSize } from '@/lib/control-sizes'`.
5. Tạo `src/lib/popup-arrow.tsx` xuất `PopupArrowGlyph` và thay thế 4 hàm `*ArrowGlyph` trùng lặp trong `popover.tsx`, `preview-card.tsx`, `navigation-menu.tsx`, `toast.tsx`.
6. *(Lưu ý kỹ thuật)*: [`tsconfig.lib.json`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/tsconfig.lib.json#L14) đã có `"include": ["src/lib", "src/components"]` và [`scripts/build-lib.mjs`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/scripts/build-lib.mjs#L72-L103) đã tự động rewrite mọi `@/lib/...` trong `.d.ts` sang đường dẫn tương đối `../../lib/*.js`, nên không cần sửa pipeline build.

---

### Phase 2: Làm sạch & Tách bạch Cấu trúc Styles (`src/styles/`, `src/index.css`)

**Vấn đề hiện tại:**
- [`src/shadcn-tokens-original.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/shadcn-tokens-original.css) là file tham chiếu cũ, không được import ở bất kỳ đâu.
- [`src/index.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/index.css#L227-L229) chứa selector phục vụ riêng cho Showcase (`body[data-showcase-view='style-overview']`), khiến file `dist-lib/styles.css` xuất cho consumer cũng bị dính CSS của trang demo.
- [`src/styles/brand.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/styles/brand.css#L40-L43) chứa 8 dòng mã màu lỗi `#NaNNaNNaN` (do script export token từ Figma trước đây chia cho 0/NaN ở kênh alpha) và ~70 dòng comment không dùng.
- [`src/styles/primitive.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/styles/primitive.css#L214-L385) chứa ~170 dòng comment `#NaNNaNNaN` và block `:root {}` rỗng ở cuối file.

**Các bước thực hiện:**
1. Xóa [`src/shadcn-tokens-original.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/shadcn-tokens-original.css).
2. Chuyển rule `body[data-showcase-view='style-overview']` từ [`src/index.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/index.css#L227-L229) sang [`src/main.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/main.tsx) (hoặc `src/showcase/showcase.css` được import trong `src/main.tsx`).
3. Trong [`src/styles/brand.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/styles/brand.css):
   - Sửa 8 giá trị fallback `#NaNNaNNaN` (dòng 40–43, 82–85) sang giá trị CSS hợp lệ (`transparent` hoặc `rgb(255 255 255 / 0.35)`, `rgb(0 0 0 / 0.3)`, `rgb(255 255 255 / 0.05)`, `rgb(0 0 0 / 0.03)`).
   - Xóa khối comment dead-code ở dòng 174–245.
4. Trong [`src/styles/primitive.css`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/styles/primitive.css):
   - Xóa khối comment dead-code và `:root {}` rỗng ở dòng 214–385.

---

### Phase 3: Đồng bộ Cấu trúc `skills/` với `package.json` & `scripts/`

**Vấn đề hiện tại:**
- Toàn bộ tài liệu `AGENT_GUIDE.md`, `UI_RULES.md`, `knowledge/*` ở root đã được dời vào [`skills/skytrack-ui/references/`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/skills/skytrack-ui/references/README.md) và thay bằng [`AGENTS.md`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/AGENTS.md) ở root.
- Tuy nhiên, [`package.json`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/package.json#L291-L295) vẫn khai báo `"files": ["dist-lib", "README.md", "AGENT_GUIDE.md"]`, và [`scripts/test-consumer.mjs`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/scripts/test-consumer.mjs#L96) vẫn kiểm tra cứng `['AGENT_GUIDE.md', 'README.md', 'dist-lib', 'package.json']` (sẽ gây fail bài test tarball).
- `zod` nằm ở `dependencies` trong [`package.json`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/package.json#L326) dù chỉ được dùng trong [`src/demos/form.demo.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/demos/form.demo.tsx#L3).

**Các bước thực hiện:**
1. Cập nhật `"files"` trong [`package.json`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/package.json#L291-L295) thành:
   ```json
   "files": [
     "dist-lib",
     "README.md",
     "AGENTS.md",
     "skills/skytrack-ui"
   ]
   ```
   *(Hoặc chỉ `["dist-lib", "README.md", "AGENTS.md"]` nếu không muốn đóng gói kèm thư mục `skills/` vào npm tarball).*
2. Cập nhật [`scripts/test-consumer.mjs`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/scripts/test-consumer.mjs#L65-L99) để danh sách `topLevel` và hàm `isForbidden` khớp với `"files"` mới.
3. Chuyển `"zod": "^4.6.5"` từ `dependencies` sang `devDependencies` trong [`package.json`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/package.json#L326).

---

### Phase 4: Dọn dẹp Thư mục Root & Git Hygiene

**Vấn đề hiện tại:**
- Thư mục `draft/` đã có trong [`.gitignore`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/.gitignore#L8) nhưng từng được commit trước đó nên Git vẫn tiếp tục theo dõi (`M draft/*`).
- Thư mục `artifact/skytrack-ui-probe.html` là file test phát sinh ở root.
- Thư mục `docs/carbon-ds-reference/` chứa hàng trăm file markdown copy từ Carbon Design System đang ở trạng thái untracked (`?? docs/carbon-ds-reference/`).

**Các bước thực hiện:**
1. Gỡ `draft/` khỏi Git index mà **không xóa file trên đĩa**:
   ```sh
   git rm -r --cached draft
   ```
2. Xóa `artifact/skytrack-ui-probe.html` (hoặc giữ trên đĩa nhưng thêm `artifact` vào `.gitignore`).
3. Thêm `docs/carbon-ds-reference` vào [`.gitignore`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/.gitignore) (hoặc dời sang thư mục `research/` của workspace cha nếu muốn lưu trữ lâu dài ngoài repo component).

---

### Phase 5: Sửa các lỗi nhỏ về Code Hygiene đi kèm (Optional nhưng khuyến nghị)

1. [`src/showcase/App.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/showcase/App.tsx):
   - Dòng 244: Bỏ `aria-hidden='true'` trên thẻ `<a href='/'>` (chuyển vào `<svg>` hoặc dùng `sr-only` text) để sửa lỗi a11y focus.
   - Dòng 374: Đổi template string ``className={`min-w-0 outline-none ${view === 'style-overview' && 'bg-muted'}`}`` sang `cn('min-w-0 outline-none', view === 'style-overview' && 'bg-muted')`.
2. [`src/components/ui/radio.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/radio.tsx#L8): Xóa biến trung gian `const newLocal = ...` và đưa chuỗi class trực tiếp vào `cn(...)`.
3. [`src/components/ui/inline-edit.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/inline-edit.tsx#L194-L226): Tách `useLayoutEffect` đo `getBoundingClientRect` + `getComputedStyle` (chỉ chạy khi `context.editing` bật) khỏi effect cập nhật `scrollHeight` (chạy khi `context.draft` thay đổi).
4. [`src/components/ui/sidebar.tsx`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/components/ui/sidebar.tsx#L92-L95): Giữ ổn định tham chiếu `toggleSidebar` để không re-bind `window.addEventListener('keydown')` mỗi lần đóng/mở sidebar.

---

## 4. Tiêu chí Nghiệm thu (Acceptance Criteria)

- [ ] Trong `src/components/ui/` chỉ còn đúng 53 file `.tsx` tương ứng với 53 subpath trong `package.json#exports`; không còn file `.ts` helper lẻ.
- [ ] `npm run generate:exports` chạy thành công và không làm thay đổi danh sách exports trong [`src/lib/index.ts`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/lib/index.ts) hay [`src/lib/entries.json`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/src/lib/entries.json).
- [ ] `npm run typecheck` (`tsc -p tsconfig.json`) và `tsc -p tsconfig.lib.json --noEmit` đều `PASS` (0 lỗi).
- [ ] Không còn mã màu `#NaNNaNNaN` trong `src/styles/brand.css` và `src/styles/primitive.css`; không còn file `src/shadcn-tokens-original.css`.
- [ ] Khi chạy kiểm định đóng gói (`npm run build:lib` và `npm run verify:lib`), tất cả 6 nhóm kiểm tra trong [`scripts/verify-lib.mjs`](file:///Users/tuan.tg/Documents/Tuan'sVault/obsidian-resources/03_Work/Projects/SkyTrack/designs/components/skytrack-ui/scripts/verify-lib.mjs) đều `PASS`.

---

## 5. Câu hỏi cần Owner chốt trước khi chạy

1. **Đóng gói `skills/` trong tarball (`package.json#files`):** Khi đóng gói `skytrack-ui` thành file `.tgz` cho consumer, bạn muốn gói kèm cả `"AGENTS.md"` và `"skills/skytrack-ui"` (để AI agent ở project consumer đọc được ngay trong `node_modules/skytrack-ui/`), hay chỉ gói `["dist-lib", "README.md"]`?
2. **Thư mục `docs/carbon-ds-reference/`:** Bạn muốn thêm vào `.gitignore` tại chỗ hay dời hẳn sang thư mục `/research/` ở root workspace SkyTrack?
