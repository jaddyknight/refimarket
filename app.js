let products;

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}" onclick="openImageModal(${product.id}, 0)">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Цена: ${product.price} руб.</p>
                <div class="quantity">
                    <button onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" id="quantity-${product.id}" value="1">
                    <button onclick="increaseQuantity(${product.id})">+</button>
                </div>
                <button onclick="addToCart(${product.id})">Добавить в корзину</button>
            `;
            productList.appendChild(productCard);
        });
    });

const cart = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-button').addEventListener('click', showCart);
    document.getElementById('cart-close').addEventListener('click', closeCart);
    document.getElementById('checkout-button').addEventListener('click', openContactModal);
    document.getElementById('contact-close').addEventListener('click', closeContactModal);
    document.getElementById('submit-contact').addEventListener('click', submitContact);
    document.getElementById('image-close').addEventListener('click', closeImageModal);
});

function increaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    showNotification('Товар добавлен в корзину');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show';
    setTimeout(() => {
        notification.className = 'notification';
    }, 5000);
}

function showCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartItems.innerHTML += `
            <p>${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} руб.</p>
        `;
    });
    document.getElementById('total-price').textContent = totalPrice + ' руб.';
    cartModal.style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function openImageModal(productId, imageIndex) {
    const modal =[_{{{CITATION{{{_1{](https://github.com/watchping/vue-course/tree/6a60dc019287a13859793f1ec7fef84dc41aa2b9/temp.md)[_{{{CITATION{{{_2{](https://github.com/mengeangIT/masterbackpack55/tree/6d70a8c668c31bfa1dcafee6a6ff6039a0a14963/resources%2Fviews%2Fms%2Fcustomer%2Fcheckout.blade.php)
