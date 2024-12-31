const products = [
    {name: "Товар 1", price: 100, description: "Описание товара 1"},
    {name: "Товар 2", price: 200, description: "Описание товара 2"},
    {name: "Товар 3", price: 300, description: "Описание товара 3"},
];

function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Цена: ${product.price} ₽</p>
            <button>Купить</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);
