document.addEventListener("DOMContentLoaded", function() {
    const amounts = document.querySelectorAll('.amount');

    amounts.forEach(amount => {
        const value = parseInt(amount.textContent);
        if (value < 0) {
            amount.classList.add('negative');
        } else {
            amount.classList.add('positive');
        }
    });
});