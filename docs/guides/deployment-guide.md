# 🌐 Hướng dẫn đưa Website lên Internet (Deploy hoàn toàn miễn phí)

Dự án đã được cấu hình sẵn file `vercel.json` ở thư mục gốc. Bạn có thể đưa website lên mạng internet chỉ với 3 phút để gửi link báo cáo cho giảng viên hoặc chia sẻ cho các bạn sinh viên dùng thử!

---

## Cách 1: Deploy tự động bằng Vercel qua GitHub (Khuyên dùng - Cực dễ)

Mỗi khi bạn đẩy code lên nhánh `main` của GitHub, Vercel sẽ tự động build và cập nhật website ngay lập tức.

### Bước 1: Đăng nhập Vercel
1. Truy cập vào trang: [https://vercel.com](https://vercel.com).
2. Chọn **Sign Up** hoặc **Log In** bằng tài khoản **GitHub**.

### Bước 2: Nhập Repository
1. Tại màn hình Dashboard của Vercel, bấm nút **"Add New..."** $\rightarrow$ chọn **"Project"**.
2. Tìm và chọn repository `campus-marketplace-ai` $\rightarrow$ bấm **"Import"**.

### Bước 3: Cấu hình Project (Tất cả đã sẵn sàng!)
* **Framework Preset:** Vite
* **Root Directory:** Chọn biểu tượng Edit và chọn thư mục `Frontend` (hoặc để mặc định vì đã có file `vercel.json`).
* **Environment Variables (Biến môi trường - Không bắt buộc):**
  * `VITE_GEMINI_API_KEY`: Dán Gemini API Key của bạn (nếu muốn Chatbot gọi AI thật).

### Bước 4: Bấm Deploy
* Bấm nút **"Deploy"** màu xanh.
* Đợi khoảng 1 phút, Vercel sẽ cung cấp cho bạn một đường link miễn phí dạng:
  👉 `https://campus-marketplace-ai.vercel.app`

---

## Cách 2: Deploy trực tiếp từ máy tính bằng Vercel CLI

Nếu bạn muốn deploy ngay từ dòng lệnh trên máy tính mà không cần qua GitHub:

```bash
# 1. Cài đặt Vercel CLI (chạy 1 lần)
npm install -g vercel

# 2. Đăng nhập
vercel login

# 3. Deploy ngay từ thư mục dự án
cd d:\ProjectWeb\campus-marketplace-ai
vercel --prod
```
Bấm Enter chấp nhận các lựa chọn mặc định, bạn sẽ nhận được đường link website trực tiếp!
