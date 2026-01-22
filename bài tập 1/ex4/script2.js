document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const productList = document.getElementById('product-list');


    // ===== XỬ LÝ SUBMIT FORM THÊM SẢN PHẨM =====
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

        // Tạo sản phẩm mới
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item new-product';
        newProduct.innerHTML = `
            <img src="${productImage || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${productName}">
            <h3>${productName}</h3>
            <p>${productDescription || 'Không có mô tả'}</p>
            <p><strong>Giá:</strong> <span class="product-price">${parseInt(productPrice).toLocaleString('vi-VN')} VNĐ</span></p>
        `;

        // Thêm sản phẩm vào đầu danh sách
        productList.insertBefore(newProduct, productList.firstChild);

        // Reset form và ẩn đi
        addProductForm.reset();
        addProductForm.classList.add('hidden');
        addProductBtn.textContent = 'Thêm Sản Phẩm Mới';

        alert('Đã thêm sản phẩm mới thành công!');
    });

    // ===== XỬ LÝ NÚT HỦY =====
    cancelBtn.addEventListener('click', function () {
        addProductForm.reset();
        addProductForm.classList.add('hidden');
        addProductBtn.textContent = 'Thêm Sản Phẩm Mới';
    });
});