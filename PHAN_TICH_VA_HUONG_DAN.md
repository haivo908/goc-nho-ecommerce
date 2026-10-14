# Phân tích thiết kế thương mại điện tử và xây dự án Góc Nhỏ

Tài liệu này thực hiện yêu cầu phân tích, chọn concept khác biệt, cung cấp frontend chạy được và giải thích cách tự phát triển dự án. Kết quả là Góc Nhỏ, một cửa hàng phụ kiện bàn học với cách khám phá theo kích thước bàn và ngân sách. Học từng phần theo thứ tự: hiểu vấn đề của người mua, đọc HTML, đọc CSS, rồi theo luồng xử lý JavaScript.

## 1 Tổng quan Figma và phạm vi đã quan sát

Thiết kế tham chiếu: [Ecommerce interface web and mobile Community](https://www.figma.com/design/HDxdyMBiKO8qsxz8dOQmhe/Ecommerce-interface--web---mobile---Community-?node-id=229-6308).

Công cụ đọc web không mở được liên kết, nhưng trình duyệt mở được file dưới chế độ xem không đăng nhập. Đã phóng canvas tới 50% và xem trang chủ desktop, danh sách dạng hàng, danh sách dạng lưới, chi tiết sản phẩm, giỏ hàng, trang chủ mobile, mobile item list, mobile detail, mobile cart và menu mobile. Canvas có nhãn “Marketplace: Alibaba style”. Vì vậy, đây là một thiết kế marketplace rộng, có cả những yếu tố B2B như hỏi báo giá nhà cung cấp và giá theo số lượng.

Những nhận xét dưới đây dựa trên nội dung và bố cục nhìn thấy. Chưa kiểm tra interaction của prototype, chưa đo màu/font/khoảng cách bằng Inspect, chưa xác nhận toàn bộ frame trong file. Chưa thấy màn hình nhập địa chỉ và hoàn thành thanh toán trong khu vực đã xem. Không suy ra chúng không tồn tại ở phần khác của file.

Figma cho thấy ý tưởng giao diện, không chứng minh website thật sử dụng React, có backend, bảo mật thanh toán, tốc độ tải tốt hoặc tỷ lệ chuyển đổi cao. Cũng không đủ để chứng minh giao diện tự co giãn giữa mọi kích thước chỉ vì có thiết kế desktop và mobile riêng.

## 2 Phân tích UI UX chi tiết

UI là phần người dùng nhìn thấy và thao tác. UX là trải nghiệm hoàn thành một mục tiêu, chẳng hạn tìm đúng món, hiểu giá và đặt hàng. Một trang đẹp vẫn có UX kém nếu người mua không hiểu sản phẩm hoặc không biết tổng tiền.

### Những điểm có thể học từ thiết kế

- Header có thương hiệu, ô tìm kiếm, lựa chọn danh mục và các lối vào tài khoản, tin nhắn, đơn, giỏ. Người dùng có nhiều đường tới nhiệm vụ thường gặp.
- Hệ màu trắng/xám nhạt và xanh dương lặp lại tạo sự nhất quán. Các khối nội dung phân biệt bằng nền, viền và khoảng cách.
- Trang chủ có danh mục bên trái, banner trung tâm, ưu đãi và các nhóm hàng. Cách này phù hợp với việc khám phá nhiều ngành hàng trên marketplace.
- Trang danh sách có bộ lọc thương hiệu, đặc điểm, giá, tình trạng và đánh giá; có sắp xếp và lựa chọn hàng/lưới. Nhóm bộ lọc đã chọn xuất hiện thành nhãn có nút xóa trên bản lưới, giúp nhận biết vì sao kết quả bị thu hẹp.
- Thẻ hàng có ảnh, giá, giá cũ, đánh giá và nút lưu. Bản hàng bổ sung mô tả và “View details”; bản lưới tăng số sản phẩm nhìn thấy.
- Trang chi tiết có ảnh chính, ảnh nhỏ, bảng giá theo lượng, thông tin nhà cung cấp, “Send inquiry”, lưu sản phẩm, tab mô tả và thông số. Đây là cấu trúc hữu ích cho việc đánh giá nguồn hàng B2B.
- Giỏ có đổi số lượng, xóa, lưu mua sau, ô coupon, khối tổng tiền và CTA Checkout. Mobile có nút tăng/giảm trực tiếp thay cho cách trình bày desktop.
- Mobile tổ chức lại thành một cột, danh mục ngang, danh sách sản phẩm và nút Filter. Có thể học cách ưu tiên nội dung quan trọng trong không gian hẹp.

### Các vấn đề và cách cải thiện

| Quan sát có bằng chứng | Vì sao ảnh hưởng người mua | Cải thiện và ví dụ cụ thể | Ưu tiên |
| --- | --- | --- | --- |
| Hình điện thoại trong danh sách desktop đi với tên “Canon Cmera EOS 2000” hoặc “GoPro HERO6 4K Action Camera”. Bản lưới lặp tên camera cho nhiều hình khác nhau. | Người mua không biết mình đang xem hàng nào; so sánh hoặc đặt mua dễ nhầm. Với dữ liệu placeholder, vẫn cần sửa trước khi dùng làm mẫu triển khai. | Mỗi sản phẩm dùng một record thống nhất cho tên, ảnh, loại, thông số và giá; cùng một record phục vụ card, detail và cart. Ví dụ ảnh đèn đi với tên Đèn bàn Mầm ở mọi nơi. | P0 |
| Breadcrumb ở danh sách có nhóm quần áo trong khi nội dung và tiêu đề số lượng nói về phụ kiện mobile. | Người mua có thể hiểu nhầm danh mục đang duyệt. | Sinh breadcrumb từ danh mục thật; ví dụ Trang chủ → Phụ kiện công nghệ → Giá laptop. | P0 |
| Chi tiết cho hình áo polo nhưng tên đề cập áo dài tay; các thông số có nội dung như “Classic shoes”, “Plastic material”, RAM. | Thông số không giúp ra quyết định và làm giảm độ tin cậy. | Schema thông số theo nhóm hàng. Đồ bàn học dùng kích thước, chất liệu, công dụng; điện tử dùng thông số tương thích. | P0 |
| Mobile cart hiển thị Items $32, Shipping $10, Tax $7, nhưng Total $220. | Người mua không thể kiểm tra chi phí. Đây là bất nhất trong số liệu thiết kế, chưa phải bằng chứng code tính sai. | Tạo một hàm tính tiền chung; ghi rõ giá đơn vị, lượng, thành tiền, phí. Ví dụ 249.000 + 25.000 = 274.000 đồng. | P0 |
| Trang chủ có nhiều nhóm hàng, khối tài khoản, ưu đãi, hỏi báo giá và các banner cùng xuất hiện. | Độ phong phú phù hợp marketplace nhưng tăng số quyết định ban đầu; với cửa hàng nhỏ có thể khiến người mua mất trọng tâm. Đây là đánh giá UX, cần kiểm nghiệm với người dùng. | Chọn một nhiệm vụ chính cho vùng đầu trang; với Góc Nhỏ là khám phá món vừa bàn hoặc chọn bộ theo ngân sách. | P1 |
| Trang chi tiết ưu tiên “Send inquiry” và giá theo số lượng. | Phù hợp B2B; nếu chuyển sang bán lẻ mà giữ nguyên, khách có thể không hiểu mình có mua một món được không. | Xác định mô hình B2B/B2C trước khi thiết kế. Góc Nhỏ dùng giá một món và “Thêm vào giỏ”; không thêm hỏi báo giá khi không cần. | P1 |
| Danh sách có icon trái tim và chuyển hàng/lưới; nhiều nhãn, chữ và điều khiển trông khá nhỏ ở ảnh canvas. | Icon thiếu giải thích hoặc target nhỏ có thể khó dùng bằng bàn phím/cảm ứng. Chưa có số đo để kết luận vi phạm chuẩn. | Dùng tên truy cập như “Lưu Đèn bàn Mầm”, focus rõ, target cảm ứng đủ lớn; kiểm tra ở 100% và bằng bàn phím. | P1 |
| Mobile list có nút Filter và nhãn đang lọc; chưa quan sát panel lọc mở hoặc trạng thái không có kết quả. | Khách cần hiểu bộ lọc nào đang áp dụng và cách thoát khỏi kết quả rỗng. | Thiết kế panel có số kết quả, xóa từng nhãn, xóa tất cả; trạng thái rỗng có hướng dẫn cụ thể. | P1 |
| Chi tiết có ảnh nhỏ nhưng chưa kiểm tra thao tác chọn ảnh, zoom hoặc phương án alt text. | Với thương mại thật, ảnh cần đủ góc nhìn và hỗ trợ người không xem được ảnh. | Gallery bàn phím, alt mô tả vật phẩm, ảnh kích thước và ảnh sử dụng thực tế. Bản mẫu hiện dùng một minh họa mỗi món. | P1 |
| Trang chủ có đếm ngược ưu đãi, card có đánh giá, cart có icon thanh toán và “Secure payment”. | Những yếu tố này có thể hỗ trợ niềm tin nếu đúng; chỉ có hình thiết kế không xác minh thời hạn, đánh giá hay độ an toàn. | Chỉ hiển thị bằng chứng thật khi bán hàng. Dự án học tập ghi rõ minh họa, không tạo đánh giá hoặc khẳng định an toàn thanh toán. | P1 |
| Khối gửi yêu cầu nhà cung cấp và nhiều mô tả dùng placeholder. | Người đọc chưa hiểu phải nhập gì và điều gì xảy ra sau khi gửi. | Dùng nhãn, ví dụ nội dung, thông báo lỗi và trạng thái gửi thành công rõ; phân biệt request quote với mua hàng. | P2 |
| Có footer nhiều nhóm liên kết, khu vực email và icon mạng xã hội. | Cấu trúc tốt nhưng link trống hoặc nội dung giả sẽ phá trải nghiệm khi triển khai. | Chỉ đưa link thật hoặc nút mở thông tin đã viết; Góc Nhỏ mở các dialog chính sách và hướng dẫn. | P2 |

### Responsive khả năng truy cập hiệu năng và SEO

Mobile đã đổi cấu trúc, không đơn thuần thu nhỏ desktop. Tuy nhiên, cần kiểm thử màn hình 320/390/768/1280 px, nội dung dài, zoom chữ, bàn phím, panel lọc và dialog. Chưa có bằng chứng đủ để kết luận thiết kế đạt chuẩn khả năng truy cập. Cần đo contrast ở màu thật, kiểm tra focus order, nhãn form và tên icon; tham khảo [W3C WAI Tutorials](https://www.w3.org/WAI/tutorials/).

Không thể đo tốc độ tải, SEO hoặc maintainability của website thật từ canvas. Khi triển khai, nên giới hạn kích thước ảnh, đặt width/height và tỷ lệ, tải lười ảnh ngoài vùng đầu, dùng heading có thứ bậc, description có nội dung và đường dẫn sản phẩm riêng. Những lựa chọn này là đề xuất triển khai, không phải kết luận về hệ thống gốc.

Thứ tự cải thiện: sửa dữ liệu và tổng tiền → xác định B2B/B2C → làm rõ hành trình mua → hoàn thiện bộ lọc/empty state → kiểm thử mobile và accessibility → đo hiệu năng/SEO trên website thực. Không cần đổi màu toàn bộ để sửa những vấn đề cốt lõi này.

## 3 Công nghệ và thứ tự học

Không xác định ngôn ngữ hoặc framework gốc từ thiết kế. Những công nghệ dưới đây là các lựa chọn xây website tương tự, không phải nhận diện stack của tác giả Figma.

| Công nghệ | Vai trò | Dùng trong bản mẫu | Khi nên học |
| --- | --- | --- | --- |
| HTML5 | Tạo cấu trúc ngữ nghĩa: header, nav, main, section, article, form, dialog | Có | Đầu tiên: thẻ, thuộc tính, label, liên kết, heading |
| CSS3 | Màu, chữ, khoảng cách, Grid/Flexbox, responsive và feedback | Có | Sau HTML; học box model trước layout |
| JavaScript | Dữ liệu, sự kiện, DOM, tìm kiếm, lọc và giỏ | Có | Sau khi tự dựng được trang tĩnh |
| TypeScript | Kiểm tra kiểu trước khi chạy, giảm nhầm trường dữ liệu | Chưa | Sau khi hiểu JavaScript, object và function |
| React hoặc framework khác | Chia giao diện thành component và quản lý trạng thái ứng dụng lớn hơn | Chưa | Khi hiểu DOM, sự kiện, mảng và state; không cần cho bản đầu |
| CSS thuần hoặc Tailwind CSS | CSS thuần tự định nghĩa rule; Tailwind cung cấp class tiện ích | CSS thuần | Học CSS nền tảng trước, rồi chọn cách viết phù hợp |
| Node.js và Express | Chạy JavaScript ở server; tạo route xử lý API | Chưa | Sau frontend; học HTTP và validation trước |
| SQL và MySQL PostgreSQL SQL Server | Lưu sản phẩm, khách, đơn và chi tiết đơn | Chưa | Học bảng, khóa chính, khóa ngoại, query, transaction |
| API | Hợp đồng trao đổi giữa giao diện và server, thường qua HTTP/JSON | Chưa | Sau khi hiểu request/response và async JavaScript |
| Git và GitHub | Git lưu lịch sử; GitHub hỗ trợ lưu repository và phối hợp | Không cần để mở mẫu | Học commit, diff, branch ngay từ giai đoạn đầu |

Đề xuất hiện tại: HTML + CSS thuần + JavaScript thuần, ảnh local, không dependency bên ngoài. Mục tiêu là tự giải thích được cách nút bấm đổi dữ liệu và giao diện. Đề xuất giai đoạn sau: Node.js + Express + PostgreSQL; stack dùng JavaScript ở cả hai phía để giảm số ngôn ngữ phải học cùng lúc. Có thể thêm TypeScript và React khi cấu trúc ứng dụng đủ lớn để hưởng lợi từ chúng.

HTML tạo nội dung, CSS tạo trình bày, JavaScript tạo tương tác: xem [MDN Your first website](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website). TypeScript kiểm tra kiểu trước khi chạy: [TypeScript for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html). Cách tổ chức component: [React Quick Start](https://react.dev/learn). Server JavaScript: [Node.js Introduction](https://nodejs.org/learn/getting-started/introduction-to-nodejs). Nền tảng database quan hệ: [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html).

## 4 Ba hướng cửa hàng khác biệt

### Góc Nhỏ đồ dùng cho bàn học nhỏ

Khách là sinh viên hoặc người làm việc tại nhà có bàn hẹp và ngân sách giới hạn. Hàng bán gồm đèn nhỏ, khay, giá laptop, đồ quản lý dây và dụng cụ tập trung. Lợi thế đề xuất là chọn theo không gian và ngân sách, thay vì bắt khách tự duyệt một marketplace rộng.

Nhận diện dùng nền giấy #FBFAF6, xanh rừng #254C3B, nâu đất #B55231; heading serif tạo cảm giác gần gũi, body sans serif để đọc thông số. Trang chủ có một góc bàn minh họa, CTA khám phá, ba nhóm công dụng, danh sách và bộ gợi ý. Các khu vực cần thiết là cửa hàng, chi tiết, giỏ, đặt hàng, hướng dẫn và chính sách. Tính năng riêng gồm lọc kích thước, chọn bộ và so sánh thông số. Khách có lý do chọn cửa hàng nếu thông tin số đo đáng tin và tìm được vài món đúng nhu cầu nhanh hơn. Mức khó: vừa, phù hợp làm frontend năm nhất.

### Mầm Ban Công đồ trồng cây cho không gian nhỏ

Khách là người mới trồng cây ở căn hộ. Bán chậu, khay, dụng cụ chăm cây và bộ vật tư theo diện tích ban công. Lợi thế đề xuất là bộ dụng cụ theo không gian, mức nắng và mức chăm sóc người dùng chọn; cần dữ liệu chuyên môn thật nếu triển khai bán cây thật.

Nhận diện xanh lá #356B45, kem #F6F1E6, vàng đất #C69946; chữ sans serif dễ đọc và hình minh họa cây lớn. Trang chủ bắt đầu bằng bộ câu hỏi về ban công, sau đó gợi ý bộ, hướng dẫn lắp và lịch chăm sóc. Các trang cần thiết gồm danh sách bộ, chi tiết vật tư, hướng dẫn, giỏ và đặt hàng. Khác marketplace bằng việc dẫn dắt từ điều kiện sử dụng tới bộ sản phẩm. Khách chọn nếu họ hiểu bộ nào vừa diện tích và cách bắt đầu. Mức khó: vừa đến cao vì dữ liệu gợi ý và nội dung cần kiểm chứng; chưa triển khai trong bản này.

### Nối Đúng phụ kiện kết nối thiết bị

Khách là sinh viên và người dùng laptop thường nhầm đầu cắm, công suất hoặc chuẩn truyền dữ liệu. Bán cáp, adapter, hub và phụ kiện liên quan. Lợi thế đề xuất là tìm theo thiết bị và yêu cầu kết nối, rồi kiểm tra tương thích dựa trên catalog thật.

Nhận diện navy #172C45, xanh sáng #245ECB, nền #F4F7FA; typography sans serif, sơ đồ cổng và bảng thông số. Trang chủ có bộ chọn thiết bị → cổng → nhu cầu, kết quả tương thích và giải thích giới hạn. Trang chi tiết phải nêu chuẩn và công suất; các trang khác gồm tra cứu thiết bị, so sánh, giỏ, đặt hàng, hỗ trợ. Khác marketplace vì khách bắt đầu từ vấn đề kết nối thay vì tên sản phẩm. Lý do chọn là giảm mua nhầm nếu catalog được kiểm chứng. Mức khó: cao hơn do quan hệ dữ liệu tương thích; chưa triển khai trong bản này.

Chọn Góc Nhỏ vì có bài toán rõ, catalog nhỏ và hai tính năng đặc trưng có thể làm bằng dữ liệu đơn giản. Nó vẫn là website mua sắm với hành trình hoàn chỉnh, đồng thời cho người mới cơ hội học filter, state và tính tiền mà không cần xây hệ thống tương thích phức tạp.

## 5 Đề xuất Góc Nhỏ và phạm vi thực hiện

Tên thương hiệu là Góc Nhỏ; ý tưởng “Bàn nhỏ, cảm hứng lớn”. Đối tượng và phân khúc đã nêu ở trên là giả định để thiết kế dự án, chưa phải kết quả nghiên cứu thị trường. Trước khi kinh doanh, hãy phỏng vấn người dùng và xác minh danh mục thật.

Tính năng đặc trưng thứ nhất là tìm sản phẩm theo chiều rộng bàn. Trường `minDesk` quy định ngưỡng 60/80 cm trong dữ liệu mẫu. Đây là bộ lọc tham khảo, không tính hình học hoặc cam kết mọi món sẽ vừa khi đặt cùng lúc. Người dùng vẫn phải đọc kích thước chi tiết và độ sâu bàn.

Tính năng thứ hai là gợi ý bộ trong ngân sách. Hệ thống lần lượt tìm một món ánh sáng, một món sắp xếp, một món tập trung, với phần tiền còn lại. Nó không vượt ngân sách sản phẩm đã chọn. Ví dụ bàn 60 cm, ngân sách 400.000 đồng cho Đèn bàn Mầm 249.000 + Khay bàn Gọn 99.000 = 348.000 đồng. Còn 52.000 đồng nên không thêm Sổ Ý Tưởng 59.000. Đây là lựa chọn theo thứ tự ưu tiên, không phải thuật toán tối ưu tất cả tổ hợp.

So sánh 2–3 món là tính năng hỗ trợ: xem giá, công dụng, kích thước, chất liệu và bàn tối thiểu cạnh nhau. Không xếp hạng món “tốt nhất” khi chúng khác công dụng.

Những ý tưởng học từ Figma: header có tìm kiếm, card ảnh/giá, lọc và sắp xếp, tổng tiền tách dòng, mobile đổi layout. Những phần thay đổi: marketplace nhiều nhóm thành phân khúc cụ thể; khối B2B thành mua lẻ; trang chủ dày banner thành câu chuyện góc bàn và một CTA chính. Những điều tránh: placeholder sai sản phẩm, số tiền không khớp, badge tin cậy thiếu chứng cứ và link chưa làm.

### Đã có trong bản mẫu

Trang chủ, logo, 8 minh họa sản phẩm, 3 danh mục, tìm kiếm không dấu, lọc kết hợp, sắp xếp, chi tiết, so sánh, gợi ý bộ, giỏ lưu local, tăng/giảm/xóa, tổng tiền và phí, đặt hàng mô phỏng có validation, chính sách/hướng dẫn, empty state và responsive. Các nút và link đều có mục đích thực hiện được trong phạm vi bản mẫu.

### Cần backend nếu muốn bán hàng thật

Tài khoản, tồn kho, địa chỉ nhận, mã ưu đãi thật, đơn bền vững, xác nhận thanh toán và quản trị. Các tính năng này chưa được triển khai. Không có nút đăng nhập hoặc coupon giả làm người dùng tưởng đang có dịch vụ thật.

## 6 Sitemap cấu trúc và hành trình

Phiên bản hiện tại là một trang với các vùng và dialog, không phải nhiều URL sản phẩm độc lập:

```text
index.html
├── Trang chủ và giới thiệu
├── #catalog cửa hàng tìm kiếm bộ lọc sắp xếp
│   ├── Dialog chi tiết sản phẩm
│   └── Dialog so sánh
├── #finder chọn bộ theo bàn và ngân sách
├── #story câu chuyện
├── Dialog giỏ hàng
│   └── Dialog đặt hàng mô phỏng
└── Dialog giao hàng quyền riêng tư hướng dẫn
```

Hành trình chính: vào trang → tìm hoặc lọc → mở chi tiết → đọc số đo → thêm vào giỏ → chỉnh số lượng → kiểm tra tổng → chọn cách nhận → xác nhận mô phỏng → thông báo hoàn thành. Hành trình khác: vào bộ gợi ý → chọn bàn và ngân sách → xem từng món → thêm cả bộ → giỏ → đặt hàng mô phỏng.

Wireframe desktop: header trên cùng; hero hai cột; hàng lợi ích; cửa hàng với nhóm lọc và lưới 4 cột; bộ gợi ý hai cột; câu chuyện; footer. Tablet dùng lưới 3 cột. Mobile dùng hero một cột, menu xuống hàng, bộ lọc chia hàng, sản phẩm 2 cột và dialog cuộn dọc.

Khi mở rộng SEO, tạo URL riêng như `/products/den-ban-mam`, `/cart`, `/checkout` và trang chính sách riêng. Backend phải quản lý session và trạng thái đơn thay cho việc chỉ mở dialog.

## 7 Mã nguồn đầy đủ và cách lưu

Mã runnable được cung cấp thành từng file riêng trong cùng thư mục. Mở `index.html`, `css/style.css` và `js/script.js` để xem toàn bộ nội dung; không có đoạn “continue similarly” hoặc phần code bị lược bỏ. Hình ảnh nằm trong `assets/images`, README chỉ cách chạy. Giữ nguyên cấu trúc khi giải nén hoặc sao chép.

Không dùng font, icon, ảnh sản phẩm hay thư viện từ dịch vụ ngoài. Font là Georgia, Segoe UI và các font dự phòng của hệ thống. Minh họa SVG tự tạo có thể chỉnh bằng công cụ vector hoặc đọc như văn bản. Vì ảnh là local nên mở bản mẫu không phụ thuộc dịch vụ ảnh. Khi thay bằng ảnh thật, cần quyền sử dụng và file dự phòng khi nguồn lỗi; ưu tiên lưu ảnh đã tối ưu cùng dự án.

## 8 Giải thích từng file và logic bằng tiếng Việt

### index.html khung nội dung

`<!doctype html>` khai báo tài liệu HTML hiện đại; `lang="vi"` cho biết tiếng Việt; `meta viewport` giúp browser dùng chiều rộng thiết bị. `title` là tên tab và `description` mô tả nội dung. CSS được nối bằng `link`, JavaScript được nối bằng `script src` có `defer`: tải script nhưng đợi HTML được phân tích xong trước khi chạy.

`header` chứa nhận diện và điều hướng. `nav` gọi tên các đích thật bằng `#catalog`, `#finder`, `#story`, không trỏ tất cả về dấu `#`. `main` là nội dung chính; mỗi `section` có heading. `form` gom bộ lọc và các lựa chọn. `label` cho người dùng biết từng field có nghĩa gì. `button type="button"` tránh tự submit form ngoài ý muốn.

Vùng `product-grid` ban đầu trống vì JavaScript tạo card từ dữ liệu. Thẻ `dialog` giữ chi tiết, giỏ, so sánh và đặt hàng. `showModal()` đưa dialog lên lớp modal, tách tương tác nền; nút đóng có tên truy cập. Trình duyệt hiện đại hỗ trợ Escape và quản lý focus cơ bản của dialog. Cần kiểm thử thêm với screen reader trước khi công bố đạt chuẩn.

`role="status"` và `aria-live="polite"` giúp thông báo thay đổi kết quả hoặc giỏ được công nghệ hỗ trợ đọc. `aria-pressed` ghi trạng thái danh mục đang chọn. `alt` mô tả hình có ý nghĩa; hình trang trí dùng `alt=""`. `noscript` báo lý do sản phẩm không xuất hiện nếu JavaScript bị tắt.

Sửa chữ trong HTML để đổi nội dung hero và câu chuyện. Nếu đổi `id`, cần tìm tất cả selector tương ứng trong JavaScript và href trong HTML. Lỗi thường gặp là viết sai đường dẫn CSS/script, quên `defer`, dùng nhiều `id` trùng nhau hoặc đổi id chỉ ở một file.

### css/style.css hệ trình bày

`:root` chứa các biến như `--green`, `--paper`, `--muted`, `--line`. Ví dụ đổi `--green:#254c3b` thành một màu mới sẽ cập nhật các thành phần dùng biến đó. Cần kiểm tra lại độ tương phản sau khi đổi. `box-sizing:border-box` làm width tính luôn padding và border, giúp layout dễ dự đoán.

`.container` giới hạn bề rộng và canh giữa. Grid chia hero thành hai cột, sản phẩm thành bốn cột. Flexbox sắp menu, giá và nút theo hàng. `gap` tạo khoảng cách giữa phần tử; `padding` tạo khoảng cách bên trong; `margin` là khoảng cách bên ngoài. Chúng không có cùng vai trò.

`@media(max-width:1000px)` chuyển sản phẩm thành ba cột. `@media(max-width:700px)` chuyển hero và bộ gợi ý thành một cột, sản phẩm hai cột. Hãy đọc CSS từ mặc định tới các override responsive để hiểu rule nào đang được áp dụng. Không lấy số cột desktop rồi thu nhỏ mọi thứ bằng transform.

Ảnh có `height:auto` để giữ tỷ lệ khi width thay đổi. Card dùng `aspect-ratio:1/1`; `object-fit:contain` giữ toàn bộ minh họa. Dialog có `max-height:85vh` và `overflow:auto` để nội dung dài cuộn được. `:focus-visible` vẽ viền khi dùng bàn phím. `prefers-reduced-motion` bỏ chuyển động cho người đã chọn giảm chuyển động.

Muốn đổi chữ: sửa font của body hoặc `--serif`. Muốn đổi khoảng cách: bắt đầu ở `.section`, `.hero`, `.product-grid`, `.filters`; chỉ sửa một nhóm rồi kiểm tra desktop/mobile. Lỗi thường gặp: đặt height cứng làm mất chữ, để ảnh width co mà height không co, dùng quá nhiều selector ghi đè hoặc sửa desktop mà quên media query.

### js/script.js dữ liệu và trạng thái

Biến là tên gắn với một giá trị. `const` dùng khi không gán lại biến; object/array bên trong vẫn có thể thay đổi. `let` dùng khi biến cần giá trị khác, ví dụ `remaining` giảm sau khi chọn một món. Mảng là danh sách có thứ tự; object là dữ liệu có các trường đặt tên.

`products` là mảng 8 object. Một sản phẩm có `id`, `name`, `category`, `price`, `oldPrice`, `minDesk`, `dimensions`, `material`, `image`, `description`. `price:249000` là một số, không phải chuỗi `"249.000 ₫"`. `money()` chỉ chuyển số thành chuỗi đẹp khi hiển thị. Nhờ vậy phép cộng và sort không bị nhầm thành nối chữ.

`state` là trạng thái giao diện: danh mục, giỏ, ID so sánh và bộ gợi ý. Giỏ chỉ lưu `{id, quantity}`; tên và giá lấy lại từ `products`. Đây là cách giữ dữ liệu nhất quán trong frontend. Nó không bảo vệ giá bán thật vì người dùng vẫn sửa được mã trình duyệt.

`findProduct(id)` dùng `find()` để lấy một món. `normalize()` bỏ dấu tiếng Việt, chuyển đ/Đ và chữ thường, nên “ĐÈN” và “den” tìm được cùng nội dung. Nó không sửa lỗi đánh máy hoặc hiểu từ đồng nghĩa. Tìm “đen” cũng về “den”; đây là đánh đổi của tìm kiếm không dấu.

`filterProducts()` đọc các field, dùng `filter()` để giữ món thỏa tất cả điều kiện. Dấu `&&` nghĩa là tất cả điều kiện cần đúng; `||` cho phép một trong hai đúng. Ví dụ chọn giá tối đa 100.000 và bàn 60 cm thì món 189.000 bị loại do giá, dù các điều kiện khác có thể đúng. `sort()` nhận hàm so sánh: `a.price-b.price` cho tăng dần; đảo lại cho giảm dần. Bản này sort trên mảng kết quả mới để không đổi thứ tự gốc của catalog.

`renderProducts()` dùng `map()` chuyển mỗi object thành HTML card rồi `join('')` thành một chuỗi. Render nghĩa là biểu diễn dữ liệu thành giao diện. `escapeHTML()` mã hóa ký tự đặc biệt trước khi chèn text vào HTML. Với dữ liệu tương lai từ API, tiếp tục dùng textContent hoặc escaping đúng; không chèn nội dung không tin cậy vào innerHTML.

DOM là mô hình các phần tử HTML mà JavaScript có thể đọc và thay đổi. `document.querySelector('#cart-count')` tìm phần tử có id đó. Trong file, `$()` là một hàm viết ngắn cho querySelector, không phải thư viện jQuery. `textContent` đổi chữ; `innerHTML` thay cấu trúc vùng nội dung; `hidden` ẩn hoặc hiện vùng.

### Các hàm chính

| Hàm | Làm gì | Dữ liệu vào và kết quả |
| --- | --- | --- |
| `sanitizeCart()` | Loại ID lạ, lượng không nguyên/dưới 1; gộp trùng và giới hạn 20 | Dữ liệu đọc từ storage → mảng giỏ hợp lệ |
| `loadCart()` và `saveCart()` | Đọc/ghi JSON với try/catch | Giỏ có thể lưu giữa lần mở; bị chặn vẫn dùng trong RAM |
| `getTotals()` | Nhân giá với lượng, cộng phí theo ngưỡng | Giỏ → subtotal, shipping, total |
| `addToCart()` | Thêm dòng hoặc tăng dòng đã có | ID và lượng → cập nhật state, storage, UI |
| `changeQuantity()` | Tăng/giảm, chặn quá giới hạn, xóa khi về 0 | ID và delta → giỏ mới và focus mới |
| `renderCart()` | Vẽ giỏ, tổng tiền, empty state, trạng thái nút checkout | State giỏ → HTML và nút enabled/disabled |
| `showDetail()` | Dùng cùng một record sản phẩm để vẽ chi tiết | ID → nội dung dialog |
| `updateCompare()` và `showCompare()` | Cập nhật số đã chọn, mở bảng khi có từ 2 món | Mảng ID → bảng so sánh |
| `recommend()` | Tìm mỗi công dụng một món phù hợp tiền còn lại và bàn | Size, budget → mảng món |
| `renderRecommendation()` và `addBundle()` | Hiển thị bộ, kiểm tra giới hạn trước khi thêm toàn bộ | Bộ gợi ý → giỏ |
| `startCheckout()` và `updateCheckoutTotal()` | Vẽ bước xác nhận và giá theo cách nhận | Giỏ + nhận hàng → tổng mô phỏng |
| `notify()` | Thông báo trên trang hoặc trong dialog đang mở | Message → phản hồi có tên status |

### Luồng dữ liệu của một lần bấm

1. Người dùng bấm nút có `data-add="lamp"`.
2. Listener `click` trên document tìm button gần nhất bằng `closest('button')`.
3. Đọc `button.dataset.add` lấy `lamp`.
4. `addToCart()` tìm sản phẩm và dòng giỏ; kiểm tra lượng; cập nhật `state.cart`.
5. `updateCart()` ghi storage, cập nhật số món ở header và gọi `renderCart()`.
6. `getTotals()` tính lại từ giá và số lượng hiện tại; `notify()` báo đã thêm.

Event listener là hàm được gọi khi sự kiện xảy ra. Event delegation là gắn listener ở vùng cha để xử lý các nút con, kể cả nút tạo sau mỗi lần render. Nếu gắn listener vào card cũ rồi thay toàn bộ HTML, listener cũ không nằm trên card mới; delegation tránh lỗi đó.

`reduce()` cộng một mảng thành một giá trị. Giỏ có hai đèn: `0 + 249000 * 2 = 498000`. Nếu tạm tính dưới 300.000 và lớn hơn 0, phí 25.000; giỏ trống phí 0; từ 300.000 phí 0. `for...of` trong `recommend()` đi lần lượt qua ba công dụng; `if` quyết định có chọn candidate không. `remaining -= candidate.price` trừ phần tiền đã dùng.

`localStorage` lưu chuỗi nên dùng `JSON.stringify()` trước khi ghi và `JSON.parse()` khi đọc. Nó gắn với origin và không phải database tài khoản; tham khảo [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Không lưu mật khẩu hoặc thẻ thanh toán ở đó. Dữ liệu `file:` có hành vi tùy browser, nên khuyến nghị máy chủ tĩnh. Event `storage` cập nhật giỏ khi tab khác thay đổi; nếu đang checkout, đóng bước đó để tránh xác nhận giỏ cũ.

Form đặt hàng dùng `required` cho phương thức nhận và checkbox xác nhận. `reportValidity()` hiển thị lỗi native; `preventDefault()` chặn trình duyệt gửi form đi hoặc reload trang. Sau khi hợp lệ, UI hiển thị thành công mô phỏng; không gọi API, không ghi đơn hàng thật. Giỏ được giữ để thử tiếp.

### Cách chỉnh và debug

Thêm sản phẩm bằng một object đầy đủ và một ảnh trong `assets/images`. Dùng ID mới, category thuộc `light/organize/focus`, giá là số nguyên. Nếu thêm category mới, sửa cả `categoryNames`, nhóm nút HTML và thứ tự trong `recommend()` nếu cần. Sửa sản phẩm ở một chỗ giúp card/detail/cart thống nhất.

Khi website lỗi, mở Developer Tools → Console để đọc lỗi đầu tiên; mở Network kiểm tra file có tải được không; dùng Elements xem class và computed style. Nếu không thấy sản phẩm, kiểm tra đường dẫn script và lỗi cú pháp trước. Nếu ảnh không hiện, kiểm tra tên file, phần mở rộng và phân biệt chữ hoa/thường khi xuất bản. Nếu giá sai, kiểm tra dữ liệu là số và không lấy chuỗi đã format làm phép tính. Nếu nút mất tác dụng sau lọc, kiểm tra listener có dùng delegation hay đã bám vào card bị thay.

Đổi schema giỏ lớn nên tăng version `storageKey` hoặc viết migration. Sau khi đổi phí giao hàng, sửa cả hàm, chính sách, checklist và ví dụ. Sau mỗi thay đổi, thử một luồng mua hoàn chỉnh rồi thử trường hợp rỗng/lỗi.

## 9 Lộ trình phát triển và kiểm thử

Thời gian đề xuất khoảng 6–8 tuần nếu học 5–7 giờ/tuần cho frontend; backend là chặng riêng tùy nền tảng. Đây là lịch học tham khảo, không cam kết tiến độ. Đọc README để chạy bản mẫu, nhưng hãy tự dựng lại từng phần thay vì chỉ sao chép.

### Giai đoạn 1 phân tích và yêu cầu

- Mục tiêu: hiểu người mua và mô hình B2C/B2B.
- Việc làm: đọc các màn hình, liệt kê điểm có chứng cứ, chọn nhóm khách, 8 món và hai tính năng khác biệt.
- Kiến thức: user need, requirement, phạm vi MVP là bản nhỏ đủ thực hiện nhiệm vụ chính.
- File: ghi yêu cầu trong README hoặc ghi chú riêng.
- Sản phẩm đầu ra: một trang yêu cầu và bảng dữ liệu sản phẩm nhất quán.
- Hoàn thành khi: mô tả được khách tìm món gì và đường tới giỏ; mỗi claim phân biệt quan sát/giả định.
- Lỗi tránh: coi Figma là code chạy thật; nhận diện framework bằng màu giao diện.

### Giai đoạn 2 sitemap wireframe và nhận diện

- Mục tiêu: thiết kế đường đi trước khi trang trí.
- Việc làm: vẽ homepage, catalog, detail, cart, checkout ở desktop/mobile; chọn màu và thang chữ.
- Kiến thức: hierarchy, spacing, user flow, states.
- File: lưu bản vẽ riêng nếu muốn; cập nhật outline trong tài liệu dự án.
- Sản phẩm đầu ra: wireframe và bảng token màu/khoảng cách.
- Hoàn thành khi: có cả empty state, lỗi và thành công; CTA chính rõ.
- Lỗi tránh: chỉ đổi logo/màu của marketplace; thiết kế desktop rồi bỏ mobile.

### Giai đoạn 3 HTML

- Mục tiêu: trang có cấu trúc đọc được khi chưa có CSS.
- Việc làm: tạo header/nav/main/section/footer, form có label, các dialog.
- Kiến thức: thẻ ngữ nghĩa, id, attribute, heading và đường dẫn tương đối.
- File: `index.html`.
- Sản phẩm đầu ra: khung trang và link nội bộ hoạt động.
- Hoàn thành khi: một h1, heading theo thứ bậc, không id trùng, tất cả field có label.
- Lỗi tránh: div cho mọi thứ; nút giả bằng thẻ a không có đích.

### Giai đoạn 4 CSS responsive

- Mục tiêu: layout dễ đọc ở nhiều chiều rộng.
- Việc làm: tạo token, container, Grid/Flexbox, card, dialog và media query.
- Kiến thức: box model, cascade, specificity, width/max-width, overflow.
- File: `css/style.css`, hình trong `assets/images`.
- Sản phẩm đầu ra: trang tĩnh desktop/tablet/mobile.
- Hoàn thành khi: không tràn ngang ở 320/390/768/1280, hình đúng tỷ lệ, dialog cuộn được.
- Lỗi tránh: height cứng cắt chữ, font quá nhỏ, ảnh bị kéo giãn.

### Giai đoạn 5 dữ liệu và sự kiện JavaScript

- Mục tiêu: từ dữ liệu tạo được giao diện.
- Việc làm: tạo mảng products, state, money, normalize, render và detail.
- Kiến thức: const/let, array/object, function, map, DOM, event listener.
- File: `js/script.js`; đối chiếu id trong HTML.
- Sản phẩm đầu ra: 8 card và dialog chi tiết sinh từ cùng dữ liệu.
- Hoàn thành khi: tên/giá/ảnh nhất quán, nút mới render vẫn có tác dụng, console không lỗi.
- Lỗi tránh: giá lưu chuỗi format; sao chép thông tin sản phẩm ở nhiều nơi.

### Giai đoạn 6 tìm kiếm lọc giỏ và bộ gợi ý

- Mục tiêu: hoàn thành hành trình lựa chọn và mua thử.
- Việc làm: filter/sort, compare, recommend, cart, storage, tổng tiền, checkout mô phỏng.
- Kiến thức: filter/find/reduce, điều kiện, vòng lặp, JSON, try/catch.
- File: `js/script.js`, phần form/dialog ở HTML.
- Sản phẩm đầu ra: tìm → chọn → giỏ → xác nhận mẫu.
- Hoàn thành khi: kết hợp bộ lọc đúng, giỏ không dòng trùng, không lượng âm, tổng chính xác, gợi ý không vượt tiền.
- Lỗi tránh: lọc chỉ từng điều kiện riêng; total không cập nhật sau xóa; gọi demo là thanh toán thật.

### Giai đoạn 7 test và sửa lỗi

- Mục tiêu: kiểm tra cả luồng đúng và trường hợp biên.
- Việc làm: thực hiện checklist trong `KIEM_THU.md`, dùng bàn phím, thử storage lỗi và viewport nhỏ.
- Kiến thức: test case, expected result, bug reproduction.
- File: sửa file gây lỗi; ghi kết quả trong `KIEM_THU.md`.
- Sản phẩm đầu ra: nhật ký test ghi rõ đã chạy gì và chưa chạy gì.
- Hoàn thành khi: không có lỗi chặn luồng chính, test lại sau sửa.
- Lỗi tránh: chỉ xem screenshot; nói “đã test” khi mới đọc code.

### Giai đoạn 8 accessibility SEO và hiệu năng

- Mục tiêu: trang dễ dùng và có nền tảng để phát triển.
- Việc làm: kiểm tra focus, tên nút, contrast, alt, giảm chuyển động; đo Lighthouse trên bản chạy HTTP; tối ưu ảnh.
- Kiến thức: accessibility, semantic HTML, layout shift, metadata.
- File: cả HTML/CSS/JS và ảnh.
- Sản phẩm đầu ra: báo cáo số đo thực và các vấn đề sửa được.
- Hoàn thành khi: luồng chính dùng được bằng bàn phím, ảnh không vỡ, kiểm tra screen reader và contrast trước khi tuyên bố đạt chuẩn.
- Lỗi tránh: hứa điểm Lighthouse khi chưa đo; cho rằng có alt là đủ accessibility.

### Giai đoạn 9 backend API database và checkout thật

- Mục tiêu: server chịu trách nhiệm giá, tồn kho và đơn.
- Việc làm: học HTTP rồi tạo API sản phẩm; thiết kế bảng; thêm authentication; tạo đơn trong transaction; dùng môi trường thử nghiệm của nhà cung cấp thanh toán.
- Kiến thức: async/await, HTTP status, validation, session, SQL, transaction, webhook.
- File dự kiến: `server/`, schema database và JS gọi fetch; các file này chưa có trong bản mẫu.
- Sản phẩm đầu ra: ứng dụng full stack trong môi trường thử nghiệm.
- Hoàn thành khi: server tính lại tổng, kiểm tra tồn kho, không tin input trình duyệt, đơn không trùng khi gửi lại, xác nhận thanh toán qua cơ chế server của nhà cung cấp.
- Lỗi tránh: dùng localStorage làm đăng nhập bảo mật, lưu mật khẩu thô, coi trang success phía client là bằng chứng đã trả tiền.

### Giai đoạn 10 triển khai và portfolio

- Mục tiêu: người khác mở được và hiểu được công việc của bạn.
- Việc làm: đưa frontend lên hosting, xác minh đường dẫn và dữ liệu; viết README, ảnh chụp, cách chạy và giới hạn; tạo lịch sử Git rõ.
- Kiến thức: static hosting, HTTPS, Git, môi trường development/production.
- File: README và các file cấu hình triển khai tùy dịch vụ.
- Sản phẩm đầu ra: URL demo, repository và case study về vấn đề người dùng.
- Hoàn thành khi: mở trên thiết bị khác, không file 404, link hoạt động, trạng thái demo rõ; backend thật cần môi trường/secrets riêng.
- Lỗi tránh: đưa secret lên GitHub, nhầm URL demo với cửa hàng có đơn thật.

## 10 Mở rộng full stack và cải tiến tương lai

Chặng tiếp theo nên bắt đầu bằng API đọc sản phẩm, không nhảy ngay tới payment. Một schema gợi ý gồm `products`, `categories`, `customers`, `orders`, `order_items`, `inventory`. `order_items` cần lưu snapshot tên/giá tại thời điểm mua để lịch sử không đổi khi catalog cập nhật. Backend kiểm tra giá và lượng lại từ database, quản lý tồn kho và tạo đơn bằng transaction.

API gợi ý gồm `GET /api/products`, `GET /api/products/:id`, `POST /api/orders`. Checkout thật cần thông tin nhận hàng tối thiểu, validation phía server, quy trình tính phí thật và dịch vụ thanh toán phù hợp. Khi thêm payment, dùng môi trường sandbox trước; xử lý callback/webhook theo tài liệu chính thức của nhà cung cấp, tránh hoàn tất đơn chỉ vì trình duyệt báo thành công.

Cải tiến UX phù hợp concept: thêm lọc chiều sâu bàn; ảnh kèm số đo; tùy chọn ưu tiên đèn hay sắp xếp; cho người dùng thay từng món trong bộ; danh sách yêu thích; URL sản phẩm riêng. Khi catalog tăng, chuyển tìm kiếm và pagination lên server. Gợi ý tốt hơn cần dữ liệu thật và thử với người dùng, không chỉ tăng hiệu ứng hoặc thêm mọi tính năng có thể nghĩ ra.

Giới hạn xác minh: bản mẫu đã được kiểm tra logic và trình duyệt theo nhật ký riêng. Chưa chạy Lighthouse, screen reader, kiểm thử trình duyệt chéo hoặc kiểm toán bảo mật. Không dùng kết quả frontend này để tuyên bố cửa hàng sẵn sàng kinh doanh.
