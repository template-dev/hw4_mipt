document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.bulb__button-buy');
    const basketCountSpan = document.querySelector('.basket__count');
    const basketLink = document.querySelector('.header__nav-link[href="/basket"]');
    const modal = document.querySelector('.modal__info');
    const modalCloseBtn = document.querySelector('.modal__close-button');

    function updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        const totalCount = basket.reduce((sum, item) => sum + item.quantity, 0);
        if (basketCountSpan) {
            basketCountSpan.textContent = totalCount;
        }
    }

    if (basketLink) {
        basketLink.addEventListener('click', function(e) {
            const basket = JSON.parse(localStorage.getItem('basket')) || [];
            if (basket.length === 0) {
                e.preventDefault();
                if (modal) {
                    modal.style.display = 'flex';
                }
            }
        });
    }

    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productPrice = parseFloat(this.getAttribute('data-product-price'));
            const quantityInput = this.previousElementSibling;
            let quantity = 1;

            if (quantityInput && quantityInput.classList.contains('quantity-input')) {
                quantity = parseInt(quantityInput.value) || 1;
            }

            let basket = JSON.parse(localStorage.getItem('basket')) || [];
            const existingIndex = basket.findIndex(item => item.id === productId);

            if (existingIndex !== -1) {
                basket[existingIndex].quantity += quantity;
            } else {
                basket.push({
                    id: productId,
                    price: productPrice,
                    quantity: quantity,
                    name: this.closest('.bulb__info').querySelector('.bulb__name').textContent,
                    image: this.closest('.light-bulbs__item').querySelector('img').getAttribute('src')
                });
            }

            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasketCount();
            alert('Товар добавлен в корзину!');
        });
    });

    updateBasketCount();
});
