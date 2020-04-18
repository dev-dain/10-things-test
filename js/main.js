function start() {
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const welcome = document.getElementById('welcome');
    header.style.animation = 
        'fade-out 0.3s ease-in-out forwards, '+
        'going-up 0.3s ease-in-out forwards';
    footer.style.opacity = 0;
    welcome.style.animation = 
        'fade-out 0.3s ease-in-out forwards, '+
        'going-up 0.3s ease-in-out forwards';
    header.style.display = 'none';
    footer.style.display = 'none';
    welcome.style.display = 'none';
    const qna = document.getElementById('qna');
    qna.style.display = 'block';
    qna.style.animation = 
        'fade-in 0.3s ease-in-out 0.5s forwards, '+
        'going-down 0.3s ease-in-out 0.5s forwards';
}

function load() {
    const name = document.querySelector('input[type=text]');
    const msg = document.querySelector('.check-name');
    const start_btn = document.querySelector('.start');

    name.addEventListener('blur', function() {
        if (name.value.length < 1) {
            msg.innerHTML = '이름을 입력하고 시작해 주세요.';
        } else {
            msg.innerHTML = '';
        }
    });
    
    start_btn.addEventListener('click', function() {
        if (name.value.length < 1) {
            msg.innerHTML = '이름을 입력하고 시작해 주세요.';
        } else {
            msg.innerHTML = '';
            start();
        }
    });
    
}

load();