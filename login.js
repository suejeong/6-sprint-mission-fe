// 로그인 버튼 활성화
const btn = document.querySelector('.btn');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

function btnToggle() {
  if (email.value && password.value) {
    btn.classList.add('btnAble');
    btn.disabled = false;
  } else {
    btn.classList.remove('btnAble');
    btn.disabled = true;
  }
}

email.addEventListener('keyup', btnToggle);
password.addEventListener('keyup', btnToggle);

// 비밀번호 표시(눈 아이콘)
const eyeIcon = document.querySelectorAll('.eye-icon');

function iconShow() {
  eyeIcon[1].classList.toggle('off');
  password.type = 'password';
}

function iconHidden() {
  eyeIcon[1].classList.toggle('off');
  password.type = 'text';
} 

eyeIcon[0].addEventListener('click', iconShow);
eyeIcon[1].addEventListener('click', iconHidden);