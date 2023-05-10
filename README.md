# BooklibFE

Frontend part of a book reading website.

Bài tập lớn môn Hệ quản trị cơ sở dữ liệu.

## Dev members

1. [Bùi Đào Duy Anh](https://github.com/duyanh0208) (FE)
2. [Quách Ngọc Minh](https://github.com/Mint18032) (FE)
3. [Nguyễn Minh Tuấn](https://github.com/lataonhehe) (BE)
4. [Đỗ Thành Đạt](https://github.com/Ducanger) (BE)

## Cài đặt

- Cài đặt nodeJS v18.12.0: <https://nodejs.org/en/download/>
- `npm install`
- `npm start`

## Một số tính năng người dùng

[Demo Video](./public/assets/booklibdemo.mp4)

### Đăng nhập, đăng xuất

Đăng nhập qua tài khoản Google. Tài khoản của Admin sẽ được chuyển sang giao diện Admin sau đăng nhập.

### Đề xuất sách

Các sách được đề xuất theo thể loại, lịch sử người dùng tại trang chủ. Ngoài ra còn có 4 bộ lọc (loại, thể loại, tác giả, năm xuất bản) cho bạn sử dụng.

### Tìm kiếm sách

Tìm kiếm sách theo tên sách và tên tác giả tại trang Tìm kiếm.

### Xem nhanh sách

Người dùng chưa đăng nhập cũng có thể xem nhanh các thông tin sách bao gồm tên sách, số sao,...trên trang chủ.

### Xem chi tiết sách

Khi nhấn vào bìa sách, ta có thể xem được các thông tin chi tiết hơn về sách.

### Xem thông tin tác giả

Mỗi tác giả có một trang riêng cung cấp thông tin cũng như những sáng tác của họ.

### Chia sẻ trang

Nút chia sẻ trang tại phần chân trang cho phép ta chia sẻ nhanh đường dẫn trang web bằng Facebook, Telegram, Twitter.

### Chỉnh sửa thông tin cá nhân

Người dùng đã đăng nhập có thể em và chỉnh sửa thông tin cá nhân của họ trong trang tài khoản.

### Bộ sưu tập

Thêm sách, quản lý bộ sưu tập sách cá nhân.

### Đọc sách

Đọc sách

### Chú thích

Trang đọc sách có ô nhỏ để bạn ghi chú thích.

### Đánh dấu trang

Tự động đánh dấu và cho phép bạn chuyển đến vị trí lần cuối dừng đọc.

### Đánh giá sách

Viết comment, rating sách.

### Nhận thông báo

Nhận thông báo về:

- Cập nhật mới của tác phẩm đang theo dõi
- Tác phẩm mới của tác giả đang theo dõi
- Tương tác của người dùng khác đối với đánh giá sách của mình
- Thông báo khóa tài khoản do vi phạm

## Tính năng cho Admin

- Quản lý tài khoản người dùng.
- Đăng tải tác phẩm.
- Quản lý tác phẩm đã đăng.
