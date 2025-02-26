// Hàm dành cho thanh navbar các series sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const sticky = navbar.offsetTop;

    function handleScroll() {
        if (window.scrollY > sticky - 40) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', handleScroll);
});

// Hàm hiển thị breadcrumb
async function generateBreadcrumb() {
    let slug = location.pathname.split("/").filter(x => x).pop(); // Lấy slug từ URL

    try {
        // Gửi Request đến API /breadcrumb/:slug
        let res = await fetch(`/breadcrumb/${slug}`);

        // Chuyển đổi dữ liệu trả về thành JSON
        let data = await res.json();

        if (!data.breadcrumb) throw new Error("Không tìm thấy breadcrumb");

        let breadcrumb = data.breadcrumb.map(item =>
            `<a class="breadcrumb-link" href="${item.path}">${item.name}</a>`
        ).join('&nbsp;&nbsp;›&nbsp;&nbsp;');

        document.getElementById("breadcrumb").innerHTML = breadcrumb;
    } catch (error) {
        console.error("Lỗi khi lấy breadcrumb:", error);
        document.getElementById("breadcrumb").innerHTML = `<a class="breadcrumb-link" href="/">Trang chủ</a>`;
    }
};

// Gọi hàm khi trang tải xong
generateBreadcrumb();
