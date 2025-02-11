// 로그인 버튼 활성화
const btn = document.querySelector('.btn');
const email = document.querySelector('#email');
const nickname = document.querySelector('#nickname');
const passwordCheck = document.querySelector('#passwordCheck');
const password = document.querySelector('#password');


function btnToggle(e) {
  if (email.value && nickname.value && password.value && passwordCheck.value) {
    btn.classList.add('btnAble');
    btn.disabled = false;
  } else {
    btn.classList.remove('btnAble');
    btn.disabled = true;
  }
}

email.addEventListener('keyup', btnToggle);
nickname.addEventListener('keyup', btnToggle);
password.addEventListener('keyup', btnToggle);
passwordCheck.addEventListener('keyup', btnToggle);

// 비밀번호 표시(눈 아이콘)
const eyeIcon = document.querySelectorAll('.eye-icon');

function eyeOn() {
  eyeIcon[1].classList.toggle('off');
  eyeIcon[3].classList.toggle('off');
  password.type = 'password';
  passwordCheck.type = 'password';
}

function eyeOff() {
  eyeIcon[1].classList.toggle('off');
  eyeIcon[3].classList.toggle('off');
  password.type = 'text';
  passwordCheck.type = 'text';
} 


eyeIcon[0].addEventListener('click', eyeOn);
eyeIcon[1].addEventListener('click', eyeOff);
eyeIcon[2].addEventListener('click', eyeOn);
eyeIcon[3].addEventListener('click', eyeOff);