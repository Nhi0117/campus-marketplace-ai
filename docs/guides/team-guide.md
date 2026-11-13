# 📘 Hướng dẫn làm việc nhóm & Quy trình Git (Dành cho 5 thành viên)

Tài liệu này giúp các thành viên trong nhóm biết cách lấy mã nguồn về máy, chạy thử nghiệm và phối hợp đẩy code lên GitHub an toàn mà **không bao giờ bị xung đột (Merge Conflict)**.

---

## 1. Chuẩn bị môi trường trên máy cá nhân

Mỗi thành viên chỉ cần làm bước này **1 lần duy nhất**:
1. Tải và cài đặt **Node.js LTS** (bản 20 hoặc 22) tại: [https://nodejs.org](https://nodejs.org).
2. Cài đặt **Git** tại: [https://git-scm.com](https://git-scm.com).
3. Mở Terminal / PowerShell và kiểm tra:
   ```bash
   node -v
   npm -v
   git --version
   ```

---

## 2. Lấy mã nguồn và khởi chạy dự án

### Bước 1: Clone repository về máy
```bash
git clone https://github.com/Nhi0117/campus-marketplace-ai.git
cd campus-marketplace-ai
```

### Bước 2: Cài đặt thư viện cho Frontend
```bash
cd Frontend
npm install
```

### Bước 3: Khởi chạy website ở môi trường phát triển (Localhost)
```bash
npm run dev
```
👉 Mở trình duyệt và truy cập vào: `http://localhost:5173` để trải nghiệm web.

---

## 3. Quy tắc làm việc với Git cho từng thành viên

> ⚠️ **Nguyên tắc vàng:** KHÔNG BAO GIỜ code trực tiếp trên nhánh `main`.

### Khi bắt đầu làm một tính năng mới:
```bash
# 1. Chuyển về nhánh main và cập nhật code mới nhất từ nhóm
git checkout main
git pull origin main

# 2. Tạo một nhánh mới theo tên tính năng của bạn
# Ví dụ bạn làm trang chi tiết sản phẩm:
git checkout -b feature/product-detail
```

### Khi đã code xong và kiểm tra chạy tốt:
```bash
# 3. Lưu lại các thay đổi
git add .
git commit -m "feat: hoàn thiện giao diện chi tiết sản phẩm"

# 4. Đẩy nhánh của bạn lên GitHub
git push -u origin feature/product-detail
```

### Tạo Pull Request (PR) để Leader gộp vào `main`:
1. Mở trang GitHub của repository: `https://github.com/Nhi0117/campus-marketplace-ai`.
2. Bạn sẽ thấy nút màu xanh **"Compare & pull request"**.
3. Bấm vào đó, điền mô tả ngắn và bấm **Create pull request**.
4. Báo cho bạn phụ trách duyệt code (Leader) để kiểm tra và bấm **Merge**.
