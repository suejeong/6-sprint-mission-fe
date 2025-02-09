//로그인 버튼 색깔 변경
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const checkPasswordInput = document.getElementById('checkpassword');
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


//비밀번호 표시 토글
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleCheckPasswordBtn = document.getElementById('toggleCheckPassword');


function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.src = 'btn_visibility_on.png';
    } else {
        input.type = 'password';
        button.src = 'btn_visibility_off.png';
    }
}

togglePasswordBtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, togglePasswordBtn));
toggleCheckPasswordBtn.addEventListener('click', () => togglePasswordVisibility(checkPasswordInput, toggleCheckPasswordBtn));
