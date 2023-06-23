async function getProducts() {

    try {
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();

        let output = '';
        let totalPrice = 0;

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

            totalPrice += product.price * qty;

            output += `
                <tr>
                    <th scope="row">${product.id}</th>
                    <td>
                        <img src=${product.thumbnail} class="img-fluid cart-thumbnail" alt="Product_Image">
                    </td>
                    <td>${product.title}</td>
                    <td>$${product.price}</td>
                    <td>
                        <div class="d-flex m-auto align-items-center gap-2">
                            <button class="btn btn-outline-danger" onclick="removeFromCart(${product.id})">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <button class="btn" style="background-color: #6610f2; color: #fff;">${qty}</button>
                            <button class="btn btn-success" onclick="addToCart(${product.id})">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td>$${(product.price * qty).toFixed(2)}</td>
                </tr>
        `;
        });

        document.getElementById('tbody').innerHTML = output;
        document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

getProducts();

document.getElementById('cartItem').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cartItem'));
    for (var i = 0; i < cart.length; i++) {
        if (cart[i] === id) {
            cart = removeItemWithSlice(i, cart);
            break;
        }
    }
    localStorage.setItem('cartItem', JSON.stringify(cart));
    document.getElementById('cartItem').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
    document.getElementById('cartQuantity').textContent = JSON.parse(localStorage.getItem('cartItem')).length;
    getProducts();
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cartItem'));
    cart.sort();
    cart.reverse();
    cart.push(id);
    localStorage.setItem('cartItem', JSON.stringify(cart));
    document.getElementById('cartItem').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
    document.getElementById('cartQuantity').textContent = JSON.parse(localStorage.getItem('cartItem')).length;
    getProducts();
}

function removeItemWithSlice(index, items) {
    return [...items.slice(0, index), ...items.slice(index + 1)]
}

document.getElementById('cartQuantity').textContent = JSON.parse(localStorage.getItem('cartItem')).length;

const clearCart = () => {
    localStorage.setItem('cartItem', JSON.stringify([]));
    document.getElementById('cartItem').innerHTML = JSON.parse(localStorage.getItem('cartItem')).length;
    document.getElementById('cartQuantity').textContent = JSON.parse(localStorage.getItem('cartItem')).length;
    getProducts();
};
