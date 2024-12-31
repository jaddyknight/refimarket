const products = [
    {name: "Товар 1", price: 100, description: "Описание товара 1"},
    {name: "Товар 2", price: 200, description: "Описание товара 2"},
    {name: "Товар 3", price: 300, description: "Описание товара 3"},
];

let cart = [];

function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Цена: ${product.price} ₽</p>
            <button onclick="addToCart('${product.name}')">Добавить в корзину</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function viewCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.classList.toggle('hidden');
    displayCartItems();
}

function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} ₽</span>
        `;
        cartItems.appendChild(itemElement);
        totalPrice += item.price;
    });
    document.getElementById('total-price').textContent = `Общая сумма: ${totalPrice} ₽`;
}

function clearCart() {
    cart = [];
    updateCartCount();
    displayCartItems();
}

document.getElementById('view-cart').addEventListener('click', viewCart);
document.getElementById('clear-cart').addEventListener('click', clearCart);

document.addEventListener('DOMContentLoaded', displayProducts);
