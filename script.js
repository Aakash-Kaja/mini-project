document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');

    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async function displayProducts(products) {
        productGrid.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('product-image');
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.title;
            imageContainer.appendChild(image);

            const title = document.createElement('div');
            title.classList.add('product-title');
            title.textContent = product.title;

            const detailsBtn = document.createElement('button');
            detailsBtn.textContent = 'Details';
            detailsBtn.addEventListener('click', () => showProductDetails(product.id));

            card.appendChild(imageContainer);
            card.appendChild(title);
            card.appendChild(detailsBtn);

            productGrid.appendChild(card);
        });
    }

    async function searchProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const products = await fetchProducts();

        if (searchTerm) {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        } else {
            displayProducts(products); 
        }
    }
    fetchProducts().then(displayProducts);
    searchInput.addEventListener('input', searchProducts);
});

function showProductDetails(productId) {
    window.location.href = `details.html?id=${productId}`;
}

function goBack() {
    window.history.back();
}

function logout() {
    window.location.href = 'home.html';
}
