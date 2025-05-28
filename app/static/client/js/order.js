document.addEventListener('DOMContentLoaded', function() {
    const basketItems = JSON.parse(localStorage.getItem('basket') || '[]');
    const basketTotals = JSON.parse(localStorage.getItem('basket_totals') || {
        subtotal: 0.00,
        delivery: 0.00,
        total: 0.00
    });

    const totalQuantity = basketItems.reduce((sum, item) => sum + item.quantity, 0.00);

    document.getElementById('productQuantity').value = totalQuantity;
    document.getElementById('deliveryCost').value = basketTotals.delivery || 250.00;
    document.getElementById('subtotalCost').value = basketTotals.subtotal || 0.00;
    document.getElementById('totalCost').value = basketTotals.total || basketTotals.delivery;

    const orderForm = document.querySelector('.order-parent__form');

    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(orderForm);
            const customerData = {
                customer_name: formData.get('first_name'),
                customer_surname: formData.get('last_name'),
                customer_email: formData.get('email'),
                customer_phone: formData.get('tel'),
                delivery_country: formData.get('country'),
                delivery_city: formData.get('city'),
                delivery_street: formData.get('street'),
                delivery_building: formData.get('building')
            };

            const items = basketItems.map(item => ({
                product_id: parseInt(item.id),
                quantity: item.quantity
            }));

            const orderData = {
                ...customerData,
                items: items
            };
            console.log(JSON.stringify(orderData))

            try {
                const response = await fetch('/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });


                if (response.ok) {
                    const result = await response.json();
                    alert('Заказ успешно создан! Номер заказа: ' + result.order_id);
                    localStorage.removeItem('basket');
                    window.location.href = '/order-confirmation';
                } else {
                    const error = await response.json();
                    alert('Ошибка при создании заказа: ' + error.detail);
                }
            } catch (err) {
                console.error('Ошибка при отправке запроса:', err);
                alert('Произошла ошибка при создании заказа.');
            }
        });
    }
});