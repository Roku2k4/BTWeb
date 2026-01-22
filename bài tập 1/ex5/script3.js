document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const productList = document.getElementById('product-list');

    // KEY cho LocalStorage
    const STORAGE_KEY = 'products';
    
    // HÀM LẤY CHỈ CÁC SẢN PHẨM MỚI THÊM TỪ LOCALSTORAGE
    function getNewProductsFromStorage() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
        // Nếu chưa có dữ liệu, trả về mảng rỗng
        return [];
    }

    // HÀM LƯU CHỈ SẢN PHẨM MỚI VÀO LOCALSTORAGE
    function saveNewProductsToStorage(products) {
        console.log('Đang lưu sản phẩm mới vào LocalStorage:', products);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        console.log('Lưu thành công!');
    }

    // HÀM HIỂN THỊ CÁC SẢN PHẨM MỚI TỪ LOCALSTORAGE
    function renderNewProducts() {
        const newProducts = getNewProductsFromStorage();
        console.log('Đang load sản phẩm mới từ LocalStorage:', newProducts);

        // Xóa các sản phẩm mới cũ (nếu có) trước khi render lại
        const existingNewProducts = productList.querySelectorAll('.product-item.new-product');
        existingNewProducts.forEach(item => item.remove());

        // Hiển thị các sản phẩm mới từ LocalStorage
        newProducts.forEach(function (product) {
            const productItem = document.createElement('article');
            productItem.className = 'product-item new-product'; // Thêm class để phân biệt
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <p><strong>Giá:</strong> <span class="product-price">${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</span></p>
            `;
            // Thêm vào đầu danh sách
            productList.insertBefore(productItem, productList.firstChild);
        });
    }

    // KHỞI TẠO: Load và hiển thị sản phẩm mới từ LocalStorage khi trang load
    renderNewProducts();

    addProductForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn form reload trang

        // Lấy giá trị từ form
        const productName = document.getElementById('product-name').value.trim();
        const productImage = document.getElementById('product-image').value.trim();
        const productDescription = document.getElementById('product-description').value.trim();
        const productPrice = document.getElementById('product-price').value.trim();

        // Validation
        if (!productName) {
            alert('Vui lòng nhập tên sản phẩm!');
            return;
        }

        if (!productPrice || isNaN(productPrice) || productPrice <= 0) {
            alert('Vui lòng nhập giá hợp lệ (phải là số dương)!');
            return;
        }

        // Tạo đối tượng sản phẩm mới
        const newProduct = {
            name: productName,
            image: productImage || 'https://via.placeholder.com/300x200?text=No+Image',
            desc: productDescription || 'Không có mô tả',
            price: parseInt(productPrice)
        };

        // Lấy mảng CHỈ các sản phẩm mới từ localStorage
        const newProducts = getNewProductsFromStorage();
        
        // Thêm sản phẩm mới vào đầu mảng
        newProducts.unshift(newProduct);
        
        // Lưu CHỈ các sản phẩm mới vào localStorage
        saveNewProductsToStorage(newProducts);

        // Hiển thị lại các sản phẩm mới
        renderNewProducts();

        // Reset form và ẩn
        addProductForm.reset();
        addProductForm.classList.add('hidden');
        addProductBtn.textContent = 'Thêm Sản Phẩm Mới';

        alert('Đã thêm sản phẩm mới thành công!');
    });

    // =====  XỬ LÝ NÚT HỦY =====
    cancelBtn.addEventListener('click', function () {
        addProductForm.reset();
        addProductForm.classList.add('hidden');
        addProductBtn.textContent = 'Thêm Sản Phẩm Mới';
    });
});