# Campus Marketplace AI — Frontend

Ứng dụng Frontend cho sàn giao dịch sinh viên Đại học Quốc gia TP.HCM (VNU-HCM).

## 🚀 Công nghệ sử dụng
- **React 18** + **Vite 5** (Nhanh, nhẹ, hiện đại)
- **Tailwind CSS** (Giao diện chuẩn xác, responsive di động)
- **Lucide React** (Bộ icons hiện đại)
- **React Router DOM v6** (Định tuyến SPA mượt mà)
- **AI Integration** (Google Gemini API & AI fallback engine)

## 💻 Cách cài đặt và chạy trên máy cá nhân

1. Cài đặt các thư viện phụ thuộc:
```bash
npm install
```

2. Khởi chạy server phát triển:
```bash
npm run dev
```

3. Mở trình duyệt và truy cập:
👉 `http://localhost:5173`

## 📁 Cấu trúc thư mục
- `src/components/common/`: Các nút bấm, thẻ sản phẩm, ô nhập dùng chung.
- `src/components/layout/`: Navbar, Footer, Layout wrapper.
- `src/components/ai/`: Widget Chatbot AI (AI01), Gợi ý (AI02), Viết mô tả (AI03).
- `src/pages/`: Các màn hình (Trang chủ, Chợ sinh viên, Chi tiết tin, Đăng tin, Chat, Profile, Auth).
- `src/data/`: Mock data trường ĐHQG, sản phẩm mẫu và người dùng.
- `src/services/`: AI service & API.
