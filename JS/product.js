async function getProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();

    let output = '';

    products.products.map((product) => {
        output += `
                <div class="card h-100 my-2 me-4" id=${product.id} style="width: 25rem;">
                    <div class="card-body d-flex justify-content-between flex-column">
                        <img class="card-img-top product-img" src=${product.thumbnail} alt="product">
                        <div class="card-content my-3">
                            <h5 class="card-title">
                                <a class="text-decoration-none product-title" href="#" onclick="viewProductDetails(${product.id})">
                                    ${product.title}
                                </a>
                            </h5>
                            <div class="h-50">
                                <p class="card-text">${product.description}</p>
                            </div>
                            <p class="badge" style="background-color: #6610f2; color: #fff;">${product.category}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                            <div class="price">$ ${product.price}</div>
                            <button class="btn" style="background-color: #6610f2; color: #fff;" onclick="addToCart(${product.id})">
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
        `;
    });

    document.getElementById('productData').innerHTML = output;
}
getProducts();

function addToCart(id) {
    if (localStorage.getItem('cartItem') === null) {
        let cart = [];
        cart.push(id);
        localStorage.setItem('cartItem', JSON.stringify(cart));
    } else {
        let cart = JSON.parse(localStorage.getItem('cartItem'));
        cart.push(id);
        localStorage.setItem('cartItem', JSON.stringify(cart));
    }

    document.getElementById('cartItem').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
}

document.getElementById('cartItem').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;

function viewProductDetails(id) {
    // Navigate to the product details page with the corresponding product ID
    window.location.href = `productDetails.html?id=${id}`;
}

