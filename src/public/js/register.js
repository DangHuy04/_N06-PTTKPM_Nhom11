document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn form gửi đi ngay lập tức

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData); // Chuyển đổi FormData thành object

    try {
        const response = await fetch(event.target.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dưới dạng JSON
            },
            body: JSON.stringify(data), // Chuyển đổi dữ liệu thành chuỗi JSON
        });

        if (response.ok) { // Nếu phản hồi từ server là thành công (status code 200-299)
            alert('Đăng ký thành công!'); // Hiển thị thông báo đăng ký thành công
            window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
        } else {
            const result = await response.text();
            alert('Đăng ký thất bại: ' + result); // Hiển thị lỗi nếu có
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
});