document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form'); // Lấy form đăng nhập
    const errorElement = document.getElementById('error-message'); // Lấy thẻ để hiển thị lỗi

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn form gửi đi ngay lập tức

        const formData = new FormData(form); // Lấy dữ liệu từ form
        const data = Object.fromEntries(formData); // Chuyển đổi thành object

        try {
            const response = await fetch('/login', { // Gửi yêu cầu tới server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Chuyển đổi object thành chuỗi JSON
            });

            // Kiểm tra mã trạng thái phản hồi
            if (response.redirected) {
                // Nếu server chuyển hướng, đưa người dùng tới trang home
                window.location.href = response.url; // Chuyển hướng đến URL trả về từ server
            } else {
                const result = await response.json(); // Nhận phản hồi từ server

                // Nếu có lỗi
                if (!result.success) {
                    alert(result.message || "Đã xảy ra lỗi!"); // Hiển thị thông báo lỗi 
                }
            }
        } catch (error) {
            console.error('Error:', error);
            errorElement.style.display = 'block'; // Hiển thị thông báo lỗi
            errorElement.textContent = 'Có lỗi xảy ra khi đăng nhập.';
        }
    });
});