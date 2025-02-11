let USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];



function togglePassword(inputId, icon) {
    let input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}



function checkEmail(){
    const emailError = document.getElementById('email-error')
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (emailInput.value === ""){
        emailError.textContent = "이메일을 입력해주세요."
        emailInput.classList.add("error-line")
        emailCheck = false

    }
    else if (!emailPattern.test(emailInput.value)){
        emailError.textContent = "잘못된 이메일 형식입니다."
        emailInput.classList.add("error-line")
        emailCheck = false

    }
    else {
        emailError.textContent = ""
        emailInput.classList.remove("error-line")
        emailCheck = true

    }
    checkInputs()
}


function checkPassword(){
    const passwordError = document.getElementById('password-error')
    const passwordPattern = /^[a-zA-Z0-9!@]{8,}$/;
    if (passwordInput.value === ""){
        passwordError.textContent = "비밀번호를 입력해주세요."
        passwordInput.classList.add("error-line")
        passwordCheck = false

    }
    else if (!passwordPattern.test(passwordInput.value)){
        passwordError.textContent = "비밀번호를 8자 이상 입력해주세요."
        passwordInput.classList.add("error-line")
        passwordCheck = false

    }
    else{
        passwordError.textContent = ""
        passwordInput.classList.remove("error-line")
        passwordCheck = true

    }
    checkInputs()

}



function checkNickname() {
    const nicknameError = document.getElementById('nickname-error')
    if (nicknameInput.value === ""){
        nicknameError.textContent = "닉네임을 입력해주세요."
        nicknameInput.classList.add('error-line')
        nicknameCheck = false
    }
    else {
        nicknameError.textContent = ""
        nicknameInput.classList.remove('error-line')
        nicknameCheck = true
    }
    checkInputs()
}



function checkAgainPassword(){
    const againpasswordError = document.getElementById('againpassword-error')
    if (againpasswordInput.value === "") {
        againpasswordError.textContent = "비밀번호를 다시 한번 입력해주세요."
        againpasswordInput.classList.add("error-line")
        againpasswordCheck = false
    }
    else if (passwordInput.value !== againpasswordInput.value){
        againpasswordError.textContent = "비밀번호가 일치하지 않습니다."
        againpasswordInput.classList.add("error-line")
        againpasswordCheck = false
    }
    else {
        againpasswordError.textContent = ""
        againpasswordInput.classList.remove("error-line")
        againpasswordCheck = true

    }
    checkInputs()
}
