'use strict';

class BakeryOrder {
    constructor(
        customerName = 'Гость',
        phone = 'Не указан',
        dessert = 'Не выбран',
        quantity = 1,
        comment = '',
        isAgreed = false
    ) {
        this.customerName = String(customerName).trim() || 'Гость';
        this.phone = String(phone).trim() || 'Не указан';
        this.dessert = String(dessert).trim() || 'Не выбран';

        const parsedQuantity = Number(quantity);
        this.quantity = parsedQuantity > 0 ? parsedQuantity : 1;

        this.comment = String(comment || '').trim() || 'Без дополнительных пожеланий';
        this.isAgreed = Boolean(isAgreed);
        this.createdAt = new Date().toLocaleString('ru-RU');
    }

    printFormattedToConsole() {
        console.group('Новый заказ — Кондитерская «Pusheen cat» :3');
        console.log(`Клиент:            ${this.customerName}`);
        console.log(`Телефон:           ${this.phone}`);
        console.log(`Десерт:            ${this.dessert}`);
        console.log(`Количество порций: ${this.quantity} шт.`);
        console.log(`Пожелания:         ${this.comment}`);
        console.log(`Согласие на ПДн:   ${this.isAgreed ? 'Да' : 'Нет'}`);
        console.log(`Дата оформления:   ${this.createdAt}`);
        console.groupEnd();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const orderStatus = document.getElementById('orderStatus');

    if (!orderForm) {
        return;
    }

    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        const dessert = document.getElementById('dessertSelect').value;
        const quantity = document.getElementById('quantityInput').value;
        const comment = document.getElementById('commentInput').value;
        const isAgreed = document.getElementById('agreementCheckbox').checked;

        if (!customerName.trim() || !phone.trim()) {
            if (orderStatus) {
                orderStatus.textContent = 'Пожалуйста, введите корректные имя и телефон.';
            }
            return;
        }

        const newOrder = new BakeryOrder(
            customerName,
            phone,
            dessert,
            quantity,
            comment,
            isAgreed
        );

        newOrder.printFormattedToConsole();

        if (orderStatus) {
            orderStatus.textContent = `Спасибо, ${newOrder.customerName}! Заказ на «${newOrder.dessert}» (${newOrder.quantity} шт.) сформирован.`;
        }

        orderForm.reset();
    });
});