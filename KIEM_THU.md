# Kiểm thử Góc Nhỏ

Ngày kiểm tra: 14 tháng 10 năm 2026. Phiên bản này là frontend HTML CSS JavaScript, có đặt hàng mô phỏng và dữ liệu sản phẩm minh họa.

## Những kiểm tra đã thực sự chạy

Đã kiểm tra cú pháp JavaScript và chạy 16 kiểm tra logic trên chính mã nguồn. Phần logic dùng môi trường DOM giả lập để gọi hàm, không dùng nó làm bằng chứng về layout trình duyệt.

| Kiểm tra logic | Kết quả |
| --- | --- |
| Bỏ dấu tiếng Việt, đ/Đ, chữ hoa và khoảng trắng đầu cuối | Đạt |
| Giỏ có ID lạ, số lượng thập phân, 0 và dòng trùng | Đạt, dữ liệu sai bị loại/gộp |
| localStorage có JSON lỗi hoặc object thay vì mảng | Đạt, về giỏ trống |
| Giỏ trống không có phí giao hàng | Đạt |
| Một đèn 249.000 cộng phí 25.000 | Đạt, tổng 274.000 |
| Đèn và sổ tổng 308.000 được miễn phí giao hàng | Đạt |
| Biên đúng 300.000 miễn phí, 299.999 có phí | Đạt bằng giá fixture tạm thời, đã khôi phục |
| Thêm trùng gộp một dòng; không vượt 20 món | Đạt |
| Giảm từ một về không xóa dòng | Đạt |
| Tìm kiếm không dấu và từ khóa không có kết quả | Đạt |
| Lọc kết hợp bàn 60 cm, giá 100.000 và nhóm sắp xếp | Đạt |
| Sort giá tăng/giảm | Đạt |
| Cả 9 kết hợp bàn/ngân sách có món, không vượt tiền, đủ ngưỡng bàn và không trùng công dụng | Đạt |
| Thêm bộ bị chặn toàn bộ nếu một món đạt giới hạn | Đạt |
| Escape ký tự HTML trong text | Đạt |
| Storage bị chặn vẫn giữ giỏ trong phiên | Đạt |

Đã thao tác trong trình duyệt và quan sát kết quả:

| Thao tác | Kết quả quan sát |
| --- | --- |
| Mở trang bằng HTTP cục bộ | Trả 200 và hiện đầy đủ trang |
| Tìm `den` | 1/8 sản phẩm |
| Tìm từ không tồn tại | Hiện empty state và nút xóa bộ lọc |
| Bàn 60 cm + giá tối đa 100.000 | 4/8 sản phẩm |
| Giá tăng dần | Kẹp dây → Sổ → Ống bút → Khay → Đồng hồ → Giá laptop → Tấm lót → Đèn |
| Thêm một đèn, mở giỏ | 249.000 + 25.000 = 274.000 |
| Tăng đèn lên 2 | Tổng 498.000, miễn phí giao hàng |
| Giảm lại, vào checkout, submit chưa chọn | Không hiện trạng thái thành công |
| Chọn nhận tại cửa hàng và xác nhận mô phỏng | Thành công, tổng 249.000; không gửi đơn thật |
| Chọn đèn và khay để so sánh | Hiện bảng giá, công dụng, số đo, chất liệu và ngưỡng bàn |
| Chọn món thứ tư để so sánh | Chỉ giữ 3/3; checkbox thứ tư không được chọn |
| Tìm bộ cho bàn 60 cm, ngân sách 400.000 | Đèn và khay, tổng 348.000 |
| Thêm bộ khi giỏ đã có một đèn | Giỏ có hai đèn và một khay, tổng 597.000 |
| Xóa mọi món | Giỏ trống; nút checkout disabled |
| Thêm trong dialog chi tiết | Có thông báo đã thêm ngay trong dialog |
| Escape trong dialog | Dialog đóng |
| Tải lại sau thêm một món | Giỏ giữ số lượng 1 |
| Console sau các thao tác | Không ghi nhận warning/error |

Đã xem screenshot desktop mặc định và viewport 390 × 844, 320 × 740, 768 × 1024. Đã đo chiều rộng nội dung ở các viewport nhỏ; không có tràn ngang. Tablet hiển thị 3 cột, mobile 2 cột. Phát hiện ảnh chi tiết giữ height cố định khi width co và đã sửa bằng `height:auto`; đã tải lại và xem screenshot xác nhận tỷ lệ. Kiểm tra ảnh tải không ghi nhận ảnh lỗi tại thời điểm kiểm tra.

Kiểm tra tĩnh bổ sung: 50 ID không trùng, 9 link nội bộ có đích thật, tất cả tài nguyên HTML và 8 ảnh sản phẩm tồn tại, 10 SVG phân tích XML hợp lệ. Đã chuyển CSS thành từng rule dễ đọc, tải lại và xác nhận desktop 1280 px có hero hai cột và sản phẩm bốn cột, không tràn ngang. Đây là kiểm tra cấu trúc cơ bản, không thay cho trình kiểm định HTML đầy đủ.

## Những phần chưa xác minh

Chưa chạy Lighthouse, trình kiểm định HTML chuẩn đầy đủ, screen reader hoặc kiểm tra nhiều engine trình duyệt. Chưa đo toàn bộ contrast bằng công cụ chuyên dụng. Đã kiểm tra bàn phím Escape và focus cơ bản; chưa audit toàn bộ thứ tự Tab. Chưa thử đồng bộ bằng hai tab độc lập. Không có backend/payment thực để kiểm thử hoặc kiểm toán bảo mật.

Phiên bản trực tuyến qua Sites chưa được xuất bản: bước gửi input tới công cụ đồng bộ nguồn bị chính sách phê duyệt của phiên chặn. Các kết quả trên thuộc bản chạy cục bộ.

## Checklist để bạn tự thử

1. Mở toàn bộ project, xác nhận ảnh, chữ, màu và menu đều hiện.
2. Gõ `đèn`, `den`, `ĐÈN`, `go tre`; quan sát kết quả và không có lỗi console.
3. Gõ từ không tồn tại; dùng nút Xóa bộ lọc, đảm bảo trở về 8 món.
4. Chọn nhóm Sắp xếp, bàn 60 cm, giá 100.000: phải có khay, kẹp dây và ống bút; không có giá laptop.
5. Sort tăng rồi giảm, xác nhận giá lần lượt có thứ tự đúng. Sort tên và kiểm tra thứ tự tiếng Việt.
6. Mở chi tiết một món, so tên/giá/ảnh với card. Đọc số đo. Thêm và đóng bằng Escape.
7. Chọn hai rồi ba món so sánh; thử món thứ tư; bỏ chọn và xóa danh sách.
8. Đổi bàn/ngân sách sau khi đã tạo bộ: gợi ý cũ phải mất, cần bấm tìm lại.
9. Thử cả 9 lựa chọn bộ: tổng sản phẩm không vượt ngân sách. Thêm bộ hai lần và quan sát số lượng gộp.
10. Một đèn: tổng giao 274.000; hai đèn: 498.000; thêm sổ vào một đèn: 308.000. Xóa và giảm về không.
11. Tăng một món tới 20: không tăng thêm được; giảm vẫn hoạt động. Đây là giới hạn mẫu, không phải tồn kho.
12. Tải lại hoặc mở lại cùng origin: giỏ giữ được nếu browser cho lưu. Thử hai tab cùng origin để kiểm tra event storage.
13. Trong Developer Tools → Application → Local Storage, thử dữ liệu sai dưới key `goc-nho-cart-v1`, rồi tải lại. Chỉ thử dữ liệu demo của dự án này; không sửa dữ liệu trang khác.
14. Mở checkout khi giỏ có hàng; submit chưa chọn method/checkbox phải bị chặn. Chọn giao hàng và nhận tại cửa hàng, đối chiếu phí. Thành công phải ghi rõ mô phỏng.
15. Dùng Tab, Shift+Tab, Enter, Space và Escape xuyên suốt luồng; kiểm tra viền focus và modal không cho tương tác nền.
16. Dùng screen reader nếu có; kiểm tra tên field, tên nút icon, số kết quả và thông báo thêm giỏ.
17. Thử 320/390/768/1280 px và zoom chữ 200%; kiểm tra không cắt chữ, không che CTA, dialog cuộn được.
18. Mở chính sách và hướng dẫn footer; xác nhận có nội dung và đóng được.

Sau khi sửa code, chạy lại các case bị ảnh hưởng và một hành trình mua đầy đủ. Ghi “chưa chạy” cho kiểm tra chưa thực hiện, không đánh dấu đạt theo suy đoán.
