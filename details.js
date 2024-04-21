document.addEventListener('DOMContentLoaded', () => {
    const productDetails = document.getElementById('productDetails');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('product-info');

                const productImageDiv = document.createElement('div');
                productImageDiv.classList.add('product-image');
                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;
                productImageDiv.appendChild(productImage);

                const productDetailsDiv = document.createElement('div');
                productDetailsDiv.classList.add('product-details-list');
                const detailsList = `
                    <h2>${product.title}</h2>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                `;
                productDetailsDiv.innerHTML = detailsList;

                detailsDiv.appendChild(productImageDiv);
                detailsDiv.appendChild(productDetailsDiv);

                productDetails.appendChild(detailsDiv);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    } else {
        console.error('Product ID not found in URL parameters');
    }
});

function goBack() {
    window.history.back();
}
