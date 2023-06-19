async function getProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();

    let output = '';

    let cartItem = JSON.parse(localStorage.getItem('cartItem'));
    let cart = products.products.filter(function (product) {
        return cartItem.includes(product.id);
    })

    cart.forEach(function (product) {
        let qty = 0;
        cartItem.sort();
        cartItem.reverse();
        while (cartItem.includes(product.id) === true) {
            qty++;
            for (var i = 0; i < cartItem.length; i++) {
                if (cartItem[i] === product.id) {
                    cartItem = removeItemWithSlice(i, cartItem);
                    break;
                }
            }
        }

        output += `
            <div class="products-card" id=${product.id}>
                    <div class="products-card-body">
                        <img src=${product.thumbnail} alt="product">
                        <h3>Product Name</h3>
                        <div class="products-card-footer">
                            <div class="price">
                                $50.00
                            </div>
                        </div>
                        <div>Quantity: ${qty}</div>
                        <button onclick="removeFromCart(${product.id})">Remove</button>
                        <button onclick="addToCart(${product.id})">Add</button>
                    </div>
            </div>
        `;
    });

    document.getElementById('cartData').innerHTML = output;
}

getProducts();

document.getElementById('cartQuantity').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cartItem'));
    for (var i = 0; i < cart.length; i++) {
        if (cart[i] === id) {
            cart = removeItemWithSlice(i, cart);
            break;
        }
    }
    localStorage.setItem('cartItem', JSON.stringify(cart));
    document.getElementById('cartQuantity').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
    getProducts();
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cartItem'));
    cart.sort();
    cart.reverse();
    cart.push(id);
    localStorage.setItem('cartItem', JSON.stringify(cart));
    document.getElementById('cartQuantity').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
    getProducts();
}

function removeItemWithSlice(index, items) {
    return [...items.slice(0, index), ...items.slice(index + 1)]
}

const clearCart = () => {
    localStorage.setItem('cartItem', JSON.stringify([]));
    document.getElementById('cartQuantity').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
    getProducts();
};