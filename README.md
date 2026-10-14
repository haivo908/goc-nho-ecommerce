# Góc Nhỏ

Website mẫu bán phụ kiện bàn học nhỏ dành cho người đang học HTML, CSS và JavaScript. Bản mẫu có đủ mã nguồn, ảnh SVG tự tạo và tài liệu giải thích tiếng Việt.

## Mở website

1. Giải nén toàn bộ thư mục `ecommerce-project`.
2. Mở `index.html` bằng trình duyệt hiện đại. Không chỉ mở riêng file JavaScript.
3. Không di chuyển `index.html` ra ngoài thư mục vì các đường dẫn CSS, JavaScript và hình ảnh là đường dẫn tương đối.
4. Để lưu giỏ hàng ổn định và thử đồng bộ giữa các tab, nên dùng một máy chủ tĩnh như Live Server trong trình soạn thảo. Nếu đã cài Python, có thể chạy `python -m http.server 8000` trong thư mục dự án và mở `http://localhost:8000`.

Không cần cài React, Node.js hoặc gói thư viện để sử dụng bản HTML này. Việc chạy máy chủ tĩnh là tùy chọn. Với địa chỉ `file:`, cách lưu localStorage tùy trình duyệt; nếu lưu bị chặn, giỏ vẫn hoạt động trong phiên hiện tại.

## Cấu trúc

```text
ecommerce-project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── mark.svg
│       ├── desk.svg
│       ├── lamp.svg
│       ├── stand.svg
│       ├── tray.svg
│       ├── timer.svg
│       ├── mat.svg
│       ├── notebook.svg
│       ├── cable.svg
│       └── holder.svg
├── README.md
├── PHAN_TICH_VA_HUONG_DAN.md
└── KIEM_THU.md
```

## Có thể thử gì

- Tìm kiếm không dấu: `den`, `go tre`, `laptop`.
- Lọc đồng thời danh mục, chiều rộng bàn và giá; sắp xếp theo giá hoặc tên.
- Mở chi tiết sản phẩm để đọc số đo và chất liệu.
- Chọn 2–3 món để so sánh.
- Tìm bộ theo bàn 60/80/120 cm và ngân sách 400.000/700.000/1.000.000 đồng.
- Thêm cả bộ hoặc từng món; tăng, giảm, xóa món trong giỏ.
- Thử đặt hàng mô phỏng với lựa chọn nhận tại cửa hàng hoặc giao hàng.

## Giới hạn

Giá, sản phẩm, số đo và chính sách giao hàng là dữ liệu minh họa. Các hình SVG là minh họa tự tạo, không phải ảnh hàng hóa thật. Không có tài khoản, thanh toán, tồn kho, đơn hàng thật hay máy chủ xử lý dữ liệu. Không yêu cầu thông tin cá nhân. Giới hạn 20 món mỗi sản phẩm chỉ là quy tắc giao diện mẫu.

Máy chủ thật phải xác thực lại mọi giá và số lượng; không dùng tổng tiền do trình duyệt gửi làm giá trị thanh toán đáng tin.

## Thay đổi nhanh

- Màu và chữ: sửa các biến trong `:root` ở `css/style.css`.
- Sản phẩm, giá, mô tả, ảnh: sửa mảng `products` đầu `js/script.js`; `id` phải duy nhất.
- Nội dung trang, menu, tiêu đề: sửa `index.html`.
- Cách tính phí: sửa `getTotals()` và đồng thời cập nhật nội dung chính sách đang hiển thị.
- Cách chọn bộ: sửa `recommend()`; kiểm tra lại ngân sách sau thay đổi.

Đọc `PHAN_TICH_VA_HUONG_DAN.md` để hiểu thiết kế và từng phần mã, sau đó làm checklist trong `KIEM_THU.md`.
