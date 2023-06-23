function getProductIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// Retrieve the product ID from the URL parameters
const productId = getProductIdFromURL();

const loader = document.getElementById('loader');

// Fetch the product details using the product ID
async function getProductDetails() {
    loader.classList.remove('d-none');

    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        // Display the product details on the page

        const productImagesContainer = document.getElementById('productImages');
        product.images.forEach((imageURL) => {
            const imgElement = document.createElement('img');
            imgElement.src = imageURL;
            imgElement.classList.add('img-thumbnail');
            imgElement.classList.add('product-details-img');
            imgElement.alt = 'img';
            productImagesContainer.appendChild(imgElement);
        });

        document.getElementById('productTitle').textContent = `${product.title}`;
        document.getElementById('productBrand').textContent = `(${product.brand})`;
        document.getElementById('productCategory').textContent = `- ${product.category}`;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `$ ${product.price}`;
        document.getElementById('productDiscount').textContent = `Discount: ${product.discountPercentage}%`;
        document.getElementById('rating').textContent = `${product.rating}`;
    } catch (error) {
        console.error('Error fetching product details:', error);
    } finally {
        loader.classList.add('d-none');
    }
}

getProductDetails();

const handleBack = () => {
    window.location.href = 'products.html';
}