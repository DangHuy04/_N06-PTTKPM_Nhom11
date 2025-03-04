function addToCart(name, price, color, imageUrl) {
    // Tạo phần tử mới
    let productHTML = `
        <div class="row mt-3">
            <div class="col-3">
                <img src="${imageUrl}" alt="${name}" class="product-image">
            </div>
            <div class="col-9">
                <div class="d-flex justify-content-between">
                    <b class="mb-1">${name}</b>
                    <span class="price">${price}</span>
                </div>
                <p class="text-muted mb-1">Màu sắc: ${color}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <a href="#" class="remove-link" onclick="removeProduct(event)">× Xoá</a>
                    </div>
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="changeQuantity(this, -1)">-</button>
                        <input type="text" class="quantity-input" value="1">
                        <button class="quantity-btn" onclick="changeQuantity(this, 1)">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Thêm vào giỏ hàng
    let cart = document.getElementById("cart");
    let productDiv = document.createElement("div");
    productDiv.innerHTML = productHTML;
    cart.appendChild(productDiv);
}

function removeProduct(event) {
    event.preventDefault();
    event.target.closest(".row").remove();
}

function changeQuantity(button, change) {
    let input = button.parentElement.querySelector(".quantity-input");
    let newValue = parseInt(input.value) + change;
    if (newValue > 0) {
        input.value = newValue;
    }
}