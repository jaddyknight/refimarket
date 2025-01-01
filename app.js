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
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const product = products.find(p => p.id === productId);
    let currentIndex = imageIndex;

    modalImg.src = product.images[currentIndex];
    modal.style.display = 'block';

    document.getElementById('prev-image').onclick = function() {
        if (currentIndex > 0) {
            currentIndex--;
            modalImg.src = product.images[currentIndex];
        }
    };

    document.getElementById('next-image').onclick = function() {
        if (currentIndex < product.images.length - 1) {
            currentIndex++;
            modalImg.src = product.images[currentIndex];
        }
    };
}

function closeImageModal() {
    document.getElementById('image-modal').style.display = 'none';
}

function openContactModal() {
    const contactModal = document.getElementById('contact-modal');
    contactModal.style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contact-modal').style.display = 'none';
}

function submitContact() {
    const customerName = document.getElementById('customer-name').value;
    const customerContact = document.getElementById('customer-contact').value;

    if (!customerName || !customerContact) {
        alert('Пожалуйста, укажите ваше имя и контактные данные.');
        return;
    }

    const orderDetails = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
    }));

    const orderMessage = `
Заказ с сайта:
${orderDetails.map(item => `${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} руб.`).join('\n')}
Общая сумма: ${orderDetails.reduce((total, item) => total + item.price * item.quantity, 0)} руб.
Имя клиента: ${customerName}
Контакты клиента: ${customerContact}
`;

    const botToken = '7676763590:AAGHlRZ9wpLnX5QdQGaSx18JsrwbW0i8jQs';
    const chatId = '-4655375127';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: orderMessage
        })
    }).then(response => {
        if (response.ok) {
            alert('Заказ оформлен!');
            cart.length = 0;
            closeCart();
            closeContactModal();
            sendConfirmationToClient(customerContact); // Отправляем подтверждение клиенту
        } else {
            alert('Ошибка при оформлении заказа.');
        }
    });
}

function sendConfirmationToClient(contact) {
    const message = `Спасибо за ваш заказ! Мы скоро с вами свяжемся. Ваши контакты: ${contact}`;
    const botToken = '7676763590:AAGHlRZ9wpLnX5QdQGaSx18JsrwbW0i8jQs';
    const chatId = '-4655375127';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
}
