function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    setTimeout(() => {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        form.insertBefore(successMessage, form.firstChild);

        form.reset();
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', handleSubmit);
});