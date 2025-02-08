const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

function updateSubmitButton() {
    if (emailInput.value && passwordInput.value) {
        submitBtn.style.backgroundColor = 'var(--panda-blue)';
    } else {
        submitBtn.style.backgroundColor = 'var(--panda-dark-gray)';
    }
}

emailInput.addEventListener('input', updateSubmitButton);
passwordInput.addEventListener('input', updateSubmitButton);
