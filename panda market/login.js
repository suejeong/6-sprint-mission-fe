document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const loginBox = document.querySelector(".login_box");

    function checkInputs() {
        if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            loginBox.classList.add("active");
        } else {
            loginBox.classList.remove("active");
        }
    }

    emailInput.addEventListener("input", checkInputs);
    passwordInput.addEventListener("input", checkInputs);
});