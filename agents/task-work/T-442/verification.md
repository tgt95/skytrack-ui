# T-442 — Phase 7 slice 1: tách `SPECS` khỏi `sheet.tsx`

**Ngày:** 2026-11-12 · **Loại:** refactor dữ liệu/render · **Phạm vi:** `designs/components/skytrack-ui`

## Thay đổi

| File | Trước | Sau |
|---|---|---|
| `src/showcase/sheet.tsx` | 1.283 dòng | 682 dòng (chỉ còn render) |
| `src/showcase/specs/component-specs.ts` | — | 608 dòng (types + `SPECS`) |
| `scripts/sync-sheet-specs.mjs` | đọc `sheet.tsx` | đọc `src/showcase/specs/component-specs.ts` |
| `agents/file-size-baseline.json` | `sheet.tsx: 1284` | `sheet.tsx: 683`, `specs/component-specs.ts: 609` |

- `ComponentGroup`, `Axis`, `ComponentSpec`, `SPECS` chuyển sang module mới; `BUTTON_VARIANTS/BUTTON_SIZES/TOGGLE_VARIANTS/TOGGLE_SIZES` đi kèm để giữ nguyên cách suy ra từ cva.
- `sheet.tsx` chỉ còn `import { SPECS, type ComponentSpec } from './specs/component-specs'`.
- Không đổi public API: không file nào trong `src/components/ui`, `src/lib`, `package.json#exports` bị sửa.
- Không đổi logic render: `AXIS_COUNT`, `OPTION_COUNT`, `combinationCount`, `ComponentLevelRow` giữ nguyên.

## Gate

| Gate | Kết quả |
|---|---|
| `typecheck` | PASS |
| `lint` (kèm `sync-sheet-specs`) | PASS — 56 component + variant axes khớp module mới |
| `guardrails` | PASS — size budgets, cycles, layers, deep imports |
| `guardrails:selftest` | PASS — 3/3 |
| `test` | PASS — 76/76 (6 file) |
| `format:check` | PASS |
| `build` | PASS |
| `build:lib` | PASS — 8 bước |
| `verify:lib` | PASS — 442 class / 415 root value / 56 subpath |

## Kiểm tra hình ảnh — route `?view=sheet`

Ảnh: `screenshots/sheet-before.png` (trước khi tách) và `screenshots/sheet-after.png` (sau khi build lại).

| Số đo | Trước | Sau |
|---|---|---|
| `h1` | `Tokens and component props` | `Tokens and component props` |
| dòng spec | 70 | 70 |
| `document.body.scrollHeight` | 28.514 | 28.514 |
| kích thước ảnh | 1280×577 | 1280×577 |
| pixel khác | — | **0 / 738.560** |

**Giới hạn:** ảnh là viewport (577px đầu), không phải full-page. Chiều cao toàn trang và số dòng spec trùng khớp nên nội dung phía dưới không đổi độ dài, nhưng chưa có diff pixel cho phần dưới màn hình đầu.

## Còn lại của Phase 7

| File | Dòng | Ghi chú |
|---|---|---|
| `pattern-library/page-content.ts` | 12.173 | tách 1 file / pattern (26 file) |
| `pattern-library/demos.tsx` | 5.800 | tách theo pattern |
| `sheet-specimens.tsx` | 2.600 | tách theo nhóm component |
| `App.tsx` | 1.433 | tách router, showcase panel, header |

Phase 8 (smoke test 56 component) và Phase 9 (đóng gói/phát hành) vẫn chờ.
