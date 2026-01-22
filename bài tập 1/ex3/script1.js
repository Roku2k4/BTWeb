document.addEventListener('DOMContentLoaded', function () {
    // 1. XỬ LÝ SỰ KIỆN TÌM KIẾM
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // Hàm xử lý tìm kiếm
    function handleSearch() {
        // Lấy giá trị từ ô nhập và chuyển về chữ thường
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Lấy tất cả sản phẩm
        const productItems = document.querySelectorAll('.product-item');

        // Duyệt qua từng sản phẩm
        productItems.forEach(function (product) {
            // Lấy tên sản phẩm (từ thẻ h3)
            const productName = product.querySelector('h3').textContent.toLowerCase();

            // Kiểm tra tên có chứa từ khóa tìm kiếm không
            if (productName.includes(searchTerm)) {
                // Hiển thị sản phẩm
                product.style.display = '';
            } else {
                // Ẩn sản phẩm
                product.style.display = 'none';
            }
        });
    }

    // Gắn sự kiện click cho nút tìm
    searchBtn.addEventListener('click', handleSearch);

    // Gắn sự kiện enter cho ô nhập tìm kiếm
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });


    // 2. XỬ LÝ SỰ KIỆN THÊM SẢN PHẨM
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');

    // Gắn sự kiện click cho nút "Thêm Sản Phẩm Mới"
    addProductBtn.addEventListener('click', function () {
        // Toggle hiển thị form bằng class "hidden"
        addProductForm.classList.toggle('hidden');

        // Thay đổi text của nút
        if (addProductForm.classList.contains('hidden')) {
            addProductBtn.textContent = 'Thêm Sản Phẩm Mới';
        } else {
            addProductBtn.textContent = 'Đóng Form';
            // localStorage.clear();
        }
    });
})