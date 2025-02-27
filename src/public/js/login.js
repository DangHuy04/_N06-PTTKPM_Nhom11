document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorElement = document.getElementById('error-message');

    const showError = (message) => {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 3000); // Ẩn thông báo sau 3 giây
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorElement.style.display = 'none'; // Ẩn thông báo lỗi cũ

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.redirected) {
                window.location.href = response.url;
            } else {
                const result = await response.json();
                if (!result.success) {
                    showError(result.message || "Đã xảy ra lỗi!");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Có lỗi xảy ra khi đăng nhập.');
        }
    });
});
