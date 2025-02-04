function togglePassword(inputId, icon) {
    let inputField = document.getElementById(inputId);

    if (inputField.type === "password") {
        inputField.type = "text";
        icon.src = "img/icon/btn_visibility_on_24px.png"; // 눈 뜬 아이콘
    } else {
        inputField.type = "password";
        icon.src = "img/icon/btn_visibility_off_24px.png"; // 눈 감은 아이콘
    }
}
