const mainSection = document.querySelector(".main");


// Функция для добавления товара в корзину
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Извлекаем корзину из localStorage или создаем пустую
  cart.push(product); // Добавляем товар в корзину
  localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
  alert(`${product.name} был добавлен в корзину!`); // Сообщение пользователю
  renderCart();
}

// Функция для отображения товаров в корзине
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Получаем товары из localStorage
  const cartContainer = document.querySelector('.cart__items'); // Контейнер для отображения товаров
  cartContainer.innerHTML = ''; // Очищаем контейнер перед обновлением

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p>Корзина пуста</p>'; // Если корзина пуста
    return;
  }

  // Проходим по каждому товару в корзине и создаем элементы для отображения
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src=${item.image}>
      <div class = "cart__content">
        <h4>${item.name}</h4>
        <p class="cart__description">${item.description}</p>
        <p class="cart__price">$${item.price}</p>
      </div>
      
    `;

    // Кнопка для удаления товара
    const removeButton = document.createElement('button');
    // removeButton.textContent = 'Удалить';
    removeButton.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
    </svg>
    `

    removeButton.addEventListener('click', () => removeFromCart(index)); // Удаление товара по индексу
    cartItem.appendChild(removeButton);
    cartContainer.appendChild(cartItem); // Добавляем товар в контейнер
  });
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Получаем корзину из localStorage
  cart.splice(index, 1); // Удаляем товар по индексу
  localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленную корзину
  renderCart(); // Перерисовываем корзину
}

// Добавляем события на кнопки "Add to Cart"
const addToCartButtons = document.querySelectorAll('.mask__link');
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const product = productData[index]; // Получаем данные о товаре из массива productData (см. data.js)
    addToCart(product); // Добавляем товар в корзину
  });
});

// При загрузке страницы отображаем корзину
document.addEventListener('DOMContentLoaded', renderCart);

