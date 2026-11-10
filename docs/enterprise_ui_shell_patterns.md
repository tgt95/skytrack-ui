# Tổng Hợp Các Dạng UI Shell Cho Hệ Thống Enterprise, B2B, CRM, CMS & ERP

Tài liệu này tổng hợp chi tiết các mẫu kiến trúc giao diện khung (UI Shell Patterns) phổ biến được áp dụng trong thiết kế hệ thống phần mềm doanh nghiệp (Enterprise), B2B, quản lý quan hệ khách hàng (CRM), quản trị nội dung (CMS) và quản trị nguồn lực doanh nghiệp (ERP).

---

## 1. Left Navigation Shell (Khung Điều Hướng Bên Trái)

Đây là dạng UI Shell phổ biến nhất trong các hệ thống quản trị Enterprise. Thanh điều hướng dọc cố định bên trái giúp hiển thị cấu trúc thông tin phân cấp sâu và dễ dàng mở rộng khi hệ thống tăng thêm tính năng.

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| LOGO | SEARCH / GLOBAL ACTIONS                     | PROFILE / NOTIF  |
+------+----------------------------------------------------------------+
| SIDE | BREADCRUMB: Home / Sales / Deals                               |
| NAV  +----------------------------------------------------------------+
|      | MAIN CONTENT AREA                                              |
| [L1] |                                                                |
| [L2] |  +--------------------+  +----------------------------------+  |
| [L3] |  | Data Table / Form  |  | Analytics Widget                 |  |
|      |  |                    |  |                                  |  |
|      |  +--------------------+  +----------------------------------+  |
|      |                                                                |
+------+----------------------------------------------------------------+
| FOOTER (Optional / Minimal Status Bar)                                |
+-----------------------------------------------------------------------+
```

*   **Ứng dụng chính:** ERP (SAP, Odoo), CRM (Salesforce Lightning, HubSpot), CMS (WordPress Admin, Strapi).
*   **Ưu điểm:** Tận dụng không gian màn hình ngang (16:9), hỗ trợ menu nhiều cấp, dễ thu gọn (Collapsible SideNav).

---

## 2. Top Navigation Shell (Khung Điều Hướng Trên Cùng)

Tất cả menu điều hướng chính được đặt trên thanh ngang ở đỉnh màn hình. Phù hợp cho ứng dụng tập trung vào thao tác nguyên trang hoặc không có quá nhiều phân hệ con.

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| LOGO | Menu 1 | Menu 2 | Menu 3 | Menu 4 |    [Search] (User Profile) |
+-----------------------------------------------------------------------+
| BREADCRUMB / ACTION BAR: Dashboard > Revenue Report    [Export] [Filter]
+-----------------------------------------------------------------------+
|                                                                       |
|                       MAIN CONTENT AREA (FULL WIDTH)                  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | Full Width Chart / Data Grid                                    |  |
|  |                                                                 |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
+-----------------------------------------------------------------------+
```

*   **Ứng dụng chính:** Công cụ báo cáo/Analytics (Google Analytics, Metabase), CMS cho biên tập viên đơn giản, SaaS B2B chuyên biệt.
*   **Ưu điểm:** Giải phóng 100% chiều rộng màn hình cho nội dung chính.

---

## 3. Combined / Hybrid Shell (Khung Kết Hợp Trên - Trái)

Dành cho các hệ sinh thái doanh nghiệp phức tạp. Thanh Topbar dùng để chuyển đổi giữa các sản phẩm/phân hệ lớn (Product/Module Switcher), trong khi SideNav xử lý điều hướng nội bộ của phân hệ đó.

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| LOGO | [App Switcher] | Module A | Module B | Module C | (Global Tools)|
+------+----------------------------------------------------------------+
| SUB  | PAGE TITLE / TOP ACTIONS                                       |
| NAV  +----------------------------------------------------------------+
|      | MAIN CONTENT AREA                                              |
| Nav1 |                                                                |
| Nav2 |  +-----------------------+  +-------------------------------+  |
| Nav3 |  | Contextual Workspace  |  | Detail Panel                  |  |
|      |  +-----------------------+  +-------------------------------+  |
+------+----------------------------------------------------------------+
```

*   **Ứng dụng chính:** Cloud Platforms (AWS Console, Azure Portal, IBM Cloud), Enterprise ERP đa phân hệ (Oracle NetSuite, Microsoft Dynamics 365).
*   **Ưu điểm:** Phân tách rõ tầng điều hướng chiến lược (Top) và điều hướng tác vụ (Left).

---

## 4. Multi-Pane / Three-Column Shell (Khung Multi-Column Chia Cột)

Cấu trúc chia 3 cột: **Left Nav** (Điều hướng chung) $\rightarrow$ **Middle Master List** (Danh sách đối tượng) $\rightarrow$ **Right Detail View** (Nội dung chi tiết đối tượng được chọn).

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| HEADER / GLOBAL SEARCH                                                |
+------+----------------------+------------------------------------------+
| NAV  | MASTER LIST          | DETAIL VIEW PANEL                        |
|      | +------------------+ | Item Title: Invoice #INV-2026-001        |
| Filter| | [Active] Item A  | | Status: Paid                           |
|      | +------------------+ | +--------------------------------------+ |
| Inbox| | Item B           | | | Customer Info                        | |
| Sent | +------------------+ | +--------------------------------------+ |
| Draft| | Item C           | | | Itemized Line Items & Billing        | |
|      | +------------------+ | +--------------------------------------+ |
+------+----------------------+------------------------------------------+
```

*   **Ứng dụng chính:** CRM Service Desk / Support Ticketing (Zendesk, Salesforce Service Cloud), B2B Email/Communication Tools, CMS Quản lý tài sản truyền thông (Digital Asset Management).
*   **Ưu điểm:** Tra cứu và xử lý nhanh hàng loạt bản ghi mà không phải chuyển trang.

---

## 5. Workspace / Canvas-centric Shell (Khung Không Gian Làm Việc Vô Hạn)

Rút gọn tối đa các thanh điều hướng xung quanh thành các thanh công cụ mảnh (Toolbars/Inspectors), tập trung diện tích màn hình cho vùng tương tác đồ họa hoặc thiết kế luồng tự động.

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| LOGO | File  Edit  View | Document Title          [Share] [Export]    |
+---+---------------------------------------------------------------+---+
| T | TOOLBAR (Floating/Docked)                                     | P |
| O +---------------------------------------------------------------+ R |
| O |                                                               | O |
| L |                      CANVAS / WORKSPACE                       | P |
| S |                                                               | E |
|   |             [ Visual Workflow Node ]                          | R |
| | |                         |                                     | T |
| | |                         v                                     | I |
| | |             [ Action Executed Node ]                          | E |
|   |                                                               | S |
+---+---------------------------------------------------------------+---+
| FOOTER: Zoom Level / Coordinates / Execution Status                   |
+-----------------------------------------------------------------------+
```

*   **Ứng dụng chính:** B2B Workflow Automation (Make.com, n8n), ETL/Data Pipeline Builders (Palantir, Snowflake Streamlit), Headless CMS Visual Builder.
*   **Ưu điểm:** Tối đa hóa trải nghiệm tương tác trực quan (Drag-and-Drop, Visual Programming).

---

## 6. Multi-Tabbed Shell (Khung Tác Vụ Đa Thẻ Nội Bộ)

Cho phép mở đồng thời nhiều bản ghi, báo cáo hoặc chứng từ bên trong ứng dụng dưới dạng các tab nội bộ (In-app Tabs), tránh việc mở quá nhiều tab trên trình duyệt web.

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| HEADER / GLOBAL ACTIONS                                               |
+-----------------------------------------------------------------------+
| [Home] | [Tab 1: Cust #8839] x | [Tab 2: Order #9912] x | [+] New Tab   |
+------+----------------------------------------------------------------+
| SIDE | TAB CONTENT: Order #9912 Details                              |
| NAV  |                                                                |
|      | Customer: ACME Corp               Order Total: $45,000         |
|      | [Edit Order] [Cancel Order] [Generate Invoice]                 |
|      |                                                                |
+------+----------------------------------------------------------------+
```

*   **Ứng dụng chính:** Core Banking Systems, ERP Kế toán / Kho vận, CRM Call Center / Tele-sales.
*   **Ưu điểm:** Hỗ trợ người dùng thao tác đa nhiệm (multitasking) với tần suất cao mà không lo mất dữ liệu chưa lưu ở các form khác.

---

## 7. Command-driven / Search-first Shell (Khung Ưu Tiên Lệnh & Tìm Kiếm)

Tối giản hóa giao diện menu. Trung tâm điều hướng là thanh tìm kiếm toàn cục thông minh và bảng lệnh nhanh (Command Palette - `Cmd + K`).

### ASCII Wireframe
```text
+-----------------------------------------------------------------------+
| LOGO |      [ 🔍 Search or type a command... (Cmd + K) ]       | USER |
+-----------------------------------------------------------------------+
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | COMMAND PALETTE OVERLAY (Triggered via Cmd + K)                 |  |
|  | > Create new Invoice                                            |  |
|  | > Go to Customer: ACME Corp                                     |  |
|  | > Run Monthly Financial Report                                  |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
| MAIN CONTENT AREA                                                     |
|                                                                       |
+-----------------------------------------------------------------------+
```

*   **Ứng dụng chính:** B2B Developer Platforms (Vercel, Linear), Headless CMS, SaaS Productivity cho Power Users (Notion Enterprise).
*   **Ưu điểm:** Tốc độ truy xuất dữ liệu cực nhanh thông qua bàn phím, giao diện hiện đại và gọn gàng.

---

## Bảng Tổng Kết So Sánh Tựu Trung

| Loại UI Shell | Phù hợp cho Lĩnh vực | Mức độ phức tạp UI | Đặc trưng trải nghiệm (UX) |
| :--- | :--- | :--- | :--- |
| **Left Nav** | Enterprise ERP, CRM, CMS | Trung bình - Cao | Thống nhất, dễ định hướng phân cấp |
| **Top Nav** | Analytics, Single SaaS | Thấp - Trung bình | Rộng rãi, tập trung nội dung |
| **Combined** | Multi-product Cloud | Rất cao | Phân tách không gian hệ thống rõ rệt |
| **Multi-Pane** | Service Desk, Mail, DAM | Trung bình | Duyệt danh sách và xem chi tiết nhanh |
| **Canvas** | Workflow Builder, ETL | Cao | Tương tác kéo-thả, không giới hạn |
| **Multi-Tabbed**| Core Banking, Logistics ERP | Cao | Đa nhiệm chuyên sâu, lưu ngữ cảnh tác vụ |
| **Command-first**| Developer Tools, Modern SaaS| Thấp (Visual) / Cao (Logic) | Tốc độ bàn phím, tối ưu không gian |