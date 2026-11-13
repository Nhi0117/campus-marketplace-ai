# 👥 Bảng phân chia công việc chi tiết cho nhóm 5 người (Phase 1 - Frontend)

Dưới đây là checklist từng màn hình và tính năng, được tổ chức tương ứng với cấu trúc file trong thư mục `Frontend/src/`.

---

### Member 1: Core Layout & Authentication (Leader / Phụ trách chính)
- [x] Khởi tạo cấu trúc repository, cấu hình Vite + Tailwind CSS.
- [x] Thiết lập `src/components/layout/Navbar.jsx` (Thanh điều hướng, tìm kiếm, giỏ/lưu tin).
- [x] Thiết lập `src/components/layout/Footer.jsx` (Thông tin trường liên kết, điểm hẹn KTX).
- [x] Thiết lập `src/routes/index.jsx` và `src/context/AuthContext.jsx`.
- [x] Thiết lập màn hình Đăng nhập (`src/pages/Auth/Login.jsx`) và Đăng ký (`src/pages/Auth/Register.jsx`).

### Member 2: Trang chủ & Chợ sinh viên (Tìm kiếm & Lọc)
- [x] Xây dựng `src/pages/Home/index.jsx`:
  - Hero banner với khẩu hiệu và thanh tìm kiếm nhanh.
  - Danh mục sản phẩm (sách, laptop, đồ KTX, xe cộ).
  - Danh sách sản phẩm nổi bật.
- [x] Xây dựng `src/pages/ProductList/index.jsx`:
  - Bộ lọc theo trường thành viên ĐHQG (Bách Khoa, KHTN, CNTT, Nhân Văn, Kinh tế - Luật, Quốc tế...).
  - Bộ lọc theo danh mục và mức giá.
  - Sắp xếp giá tăng/giảm hoặc mới nhất.

### Member 3: Chi tiết sản phẩm & Đăng tin bán đồ
- [x] Xây dựng `src/pages/ProductDetail/index.jsx`:
  - Trình xem album ảnh sản phẩm phóng to.
  - Thông tin người bán, trường học, đánh giá uy tín (sao).
  - Nút lưu tin yêu thích & nút chia sẻ link.
  - Nút nhắn tin Zalo và chat trực tiếp.
- [x] Xây dựng `src/pages/CreateListing/index.jsx`:
  - Form nhập thông tin món đồ cần bán.
  - Chọn trường, điểm hẹn giao dịch (KTX Khu A, Khu B).
  - Tích hợp nút gọi AI hỗ trợ sinh bài viết.

### Member 4: Điểm nhấn 3 tính năng AI
- [x] **AI01 - AI Product Search Chatbot:** `src/components/ai/AIChatbot.jsx`
  - Widget bong bóng chat góc màn hình, hỏi đáp tìm đồ bằng ngôn ngữ tự nhiên.
  - Gợi ý sản phẩm kèm giá ngay trong câu trả lời.
- [x] **AI02 - AI Product Recommendation:** `src/components/ai/AIRecommendation.jsx`
  - Khối gợi ý sản phẩm thông minh dựa trên trường học và ngành.
- [x] **AI03 - AI Product Description Assistant:** `src/components/ai/AIDescriptionModal.jsx`
  - Tự động sinh bài viết mô tả sản phẩm hấp dẫn, chuẩn phong cách sinh viên.
- [x] Service kết nối Gemini API & Logic dự phòng: `src/services/ai.service.js`.

### Member 5: Trang cá nhân, Tin nhắn & Đánh giá uy tín
- [x] Xây dựng `src/pages/Profile/index.jsx`:
  - Tab quản lý các món đồ đang đăng bán.
  - Tab xem danh sách các món đồ đã lưu yêu thích.
  - Thông tin thẻ sinh viên xác thực (MSSV, Trường).
- [x] Xây dựng `src/pages/Chat/index.jsx`:
  - Giao diện nhắn tin mô phỏng giữa người mua và người bán để hẹn giờ, địa điểm giao dịch tại KTX hoặc Làng Đại Học.
