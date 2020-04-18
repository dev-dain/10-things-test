const STATUS = 10;
let qIdx = -1;
let score = 0;
let beginFlag = false;
let select = [];

function end() {
    
}

function addAnswer(answerTxt, idx) {
    let answer = document.createElement('button');
    const a = document.querySelector('.answer');
    addClass(answer, 'a box');
    answer.innerHTML = answerTxt;
    console.log(answer);

    answer.addEventListener('click', function() {
        select[qIdx] = idx;
            aBox = document.querySelectorAll('.a box');
            console.log(aBox);
            for (let i = 0; i < aBox.length; i++) {
                console.log('??');
                aBox[i].style.animation = 
                'going-left 0.5s forwards, '
                'fade-out 0.5s forwards';
            }   //감사합니다 감사합니다ㅋㅋㅋㅋㅋㅋㅋ
        setTimeout(function() {   
            goNext();
        a.innerHTML = '';   
            
        }, 1000);
        
    });

    answer.style.animation = 
        'going-down 0.3s forwards, fade-in 0.3s forwards';

    answer.display = 'none';
    a.appendChild(answer);
}

function addClass(elem, className) {
    elem.className += " "+className;
}

function goNext() {
    if (qIdx++ === qnaList.length) {
        end();
        return;
    }
    const qna = document.getElementById('qna');
    qna.style.display = 'block';
    console.log(qIdx);
    /*
    status = document.querySelector('.status');
    status.style.width = (STATUS * (idx+1))+'%';
    */
    qNum = qnaList[qIdx];
    const q = document.querySelector('.q');
    q.innerHTML = qNum.q;
    qna.style.animation = 
        'fade-in 0.3s ease-in-out 0.5s forwards, '+
        'going-down 0.3s ease-in-out 0.5s forwards';
    setTimeout(function() {
        const endIdx = qNum.a.length-1;
        for (let i in qNum.a) {
            console.log(i);
            addAnswer(qNum.a[i].answer, i);
        }
    }, 1000);
}

function begin() {
    if (beginFlag)
        return;
    beginFlag = true;

    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const welcome = document.getElementById('welcome');

    header.style.animation = 
        'going-up 0.4s forwards, '+
        'fade-out 0.4s forwards';
    welcome.style.animation = 
        'going-up 0.4s ease-in-out 0.5s forwards, '+
        'fade-out 0.4s ease-in-out 0.5s forwards';
    footer.style.animation = 
        'going-down 0.4s forwards, '+
        'fade-out 0.4s forwards';
    setTimeout(function() {
        header.style.display = 'none';
        footer.style.display = 'none';
        welcome.style.display = 'none';
        goNext();
    }, 1000);
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
            begin();
        }
    });
    
}

load();