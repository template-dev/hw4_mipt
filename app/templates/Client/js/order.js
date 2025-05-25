document.addEventListener('DOMContentLoaded', function() {
    const basketItems = JSON.parse(localStorage.getItem('basket') || []);
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
});