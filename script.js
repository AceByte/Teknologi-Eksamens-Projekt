document.addEventListener("DOMContentLoaded", function() {
    const amounts = document.querySelectorAll('.amount');

    amounts.forEach(amount => {
        const value = amount.textContent.trim();
        if (value.includes("-")) {
            amount.classList.add('negative');
        } else if (value.includes("+")) {
            amount.classList.add('positive');
        }
    });
});
