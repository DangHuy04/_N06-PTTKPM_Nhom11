// Hàm lấy danh sách tỉnh của VN và cho vào Select
document.addEventListener("DOMContentLoaded", async function () {
    const provinceSelect = document.getElementById("province");
    const districtSelect = document.getElementById("district");

    // Gọi API lấy danh sách tỉnh/thành phố
    async function loadProvinces() {
        try {
            let response = await fetch("https://provinces.open-api.vn/api/?depth=2");
            let data = await response.json();

            // Thêm option vào select tỉnh/thành phố
            data.forEach(province => {
                let option = document.createElement("option");
                option.value = province.code;
                option.textContent = province.name;
                option.dataset.districts = JSON.stringify(province.districts);
                provinceSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Lỗi tải danh sách tỉnh/thành phố:", error);
        }
    }

    // Khi chọn tỉnh/thành phố, cập nhật danh sách quận/huyện
    provinceSelect.addEventListener("change", function () {
        let selectedOption = provinceSelect.options[provinceSelect.selectedIndex];
        let districts = JSON.parse(selectedOption.dataset.districts || "[]");

        districtSelect.innerHTML = '<option selected>Chọn quận, huyện</option>'; // Reset danh sách

        districts.forEach(district => {
            let option = document.createElement("option");
            option.value = district.code;
            option.textContent = district.name;
            districtSelect.appendChild(option);
        });
    });

    // Gọi hàm loadProvinces khi trang tải
    loadProvinces();
});

// Gửi dữ liệu lên server bằng Fetch API
function updateCart(prodID, quantity) {
    fetch("/cart/update-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prodID, quantity })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Giỏ hàng cập nhật thành công!");
            location.reload(); // Reload lại trang để cập nhật tổng tiền
        } else {
            console.error("Lỗi cập nhật:", data.error);
        }
    })
    .catch(error => console.error("Lỗi:", error));
}

// Hàm xử lý tăng giảm số lượng sản phẩm
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quantity-btn").forEach(button => {
        button.addEventListener("click", function () {
            let container = this.closest(".quantity-selector"); // Tìm phần tử cha chứa input
            let input = container.querySelector(".quantity-input");
            let prodID = input.dataset.productId; // Lấy prodID từ input
            let quantity = parseInt(input.value);

            if (this.classList.contains("increase")) {
                quantity++;
            } else if (this.classList.contains("decrease") && quantity > 1) {
                quantity--;
            }

            input.value = quantity; // Cập nhật số lượng trên giao diện
            updateCart(prodID, quantity); // Gửi cập nhật lên server
        });
    });

    // Xử lý nhập số trực tiếp vào ô input
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", function () {
            let quantity = parseInt(this.value);
            let prodID = this.dataset.productId; // Lấy ID từ input

            if (isNaN(quantity) || quantity < 1) {
                this.value = 1;
                quantity = 1;
            }
            updateCart(prodID, quantity);
        });
    });
});


