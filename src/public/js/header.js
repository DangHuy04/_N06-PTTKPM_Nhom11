// Khởi tạo các biến global
const searchInput = document.getElementById('searchterms');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("searchBox");
const header = document.getElementById("header");
const overlay = document.getElementById("overlay");
const userIcon = document.getElementById('userIcon');
const dropdownMenu = document.getElementById('dropdownMenu');


// Xử lý sự kiện click nút tìm kiếm
document.getElementById("timkiem").addEventListener("click", function (event) {
    event.preventDefault();

    header.style.display = "none";
    searchBox.style.display = "flex";
    overlay.style.display = "block";
    searchInput.focus(); // Auto focus vào ô tìm kiếm

    // Xử lý click ra ngoài
    document.addEventListener("click", function hideSearchBox(e) {
        if (!searchBox.contains(e.target) && !event.target.contains(e.target)) {
            header.style.display = "flex";
            searchBox.style.display = "none";
            searchSuggestions.style.display = "none";
            overlay.style.display = "none";
            document.removeEventListener("click", hideSearchBox);
        }
    });
});

// Xử lý form submit
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchContent = searchInput.value.trim();
    if (searchContent.length < 3) {


        alert("Độ dài tối thiểu của từ khoá tìm kiếm là 3 kí tự");
        return;
    }

    this.submit();
});

// Xử lý input search với debounce
searchInput.addEventListener('input', debounce(async (e) => {
    const query = e.target.value.trim();
    if (query.length < 2) {
        searchSuggestions.style.display = 'none';
        return;
    }

    try {
        // Gọi API để lấy gợi ý sản phẩm
        const response = await fetch(`/search/search-suggestions?q=${query}`);
        const suggestions = await response.json();
        console.log(suggestions);
        if (suggestions.length > 0) {
            displaySuggestions(suggestions);
        } else {
            searchSuggestions.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}, 300));

// Hiển thị gợi ý sản phẩm
function displaySuggestions(suggestions) {
    searchSuggestions.innerHTML = '';

    suggestions.forEach(product => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="suggestion-image">
        <div class="suggestion-content">
            <div class="suggestion-title">${highlightMatch(product.name, searchInput.value)}</div>
            <div class="suggestion-price">${formatPrice(product.price)}</div>
        </div>
    `;

        suggestionItem.addEventListener('click', () => {
            window.location.href = `/${product.productId}`;
        });

        searchSuggestions.appendChild(suggestionItem);
    });

    searchSuggestions.style.display = 'block';
}

// Xử lý user menu
userIcon?.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
});

// Đóng dropdown menu khi click ra ngoài
window.onclick = function (event) {
    if (!event.target.matches('.user-icon')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        Array.from(dropdowns).forEach(dropdown => {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Xử lý keyboard navigation trong suggestions
searchInput.addEventListener('keydown', function (e) {
    const items = searchSuggestions.getElementsByClassName('suggestion-item');
    const current = searchSuggestions.querySelector('.suggestion-item.selected');

    if (items.length === 0) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        let next;
        if (!current) {
            next = e.key === 'ArrowDown' ? items[0] : items[items.length - 1];
        } else {
            const currentIndex = Array.from(items).indexOf(current);
            if (e.key === 'ArrowDown') {
                next = items[currentIndex + 1] || items[0];
            } else {
                next = items[currentIndex - 1] || items[items.length - 1];
            }
            current.classList.remove('selected');
        }

        next.classList.add('selected');
        searchInput.value = next.querySelector('.suggestion-title').textContent;
    } else if (e.key === 'Enter' && current) {
        e.preventDefault();
        window.location.href = current.getAttribute('data-url');
    }
});

// Thêm CSS cho selected item
const style = document.createElement('style');
style.textContent = `
.suggestion-item.selected {
    background-color: #f0f0f0;
}
.suggestion-item mark {
    background-color: #ffe066;
    padding: 0 2px;
    border-radius: 2px;
}
`;
document.head.appendChild(style);
