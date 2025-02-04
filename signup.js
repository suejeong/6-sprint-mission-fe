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