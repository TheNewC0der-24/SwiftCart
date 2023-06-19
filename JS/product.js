async function getProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();

    let output = '';

    products.products.map((product) => {
        output += `
            <div class="products-card" id=${product.id}>
                    <div class="products-card-body">
                        <img src=${product.thumbnail} alt="product">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <div class="products-card-footer">
                            <div class="price">
                                $ ${product.price}
                            </div>
                        </div>
                        <button onclick="addToCart(${product.id})">Add To Cart</button>
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
}

