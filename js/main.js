const header = document.getElementById('header');
const footer = document.getElementById('footer');
const qna = document.getElementById('qna');
const ENDPOINT = 10;
let qIdx = -1;
let score = 0;
let beginFlag = false;
let select = [];

function goResult() {
    const result = document.getElementById('result');
    setTimeout(function() {
        header.style.display = 'block';
        footer.style.display = 'block';
        result.style.display = 'block';
        header.style.animation = 
            'fade-in 0.3s forwards';
        footer.style.animation = 
            'fade-in 0.3s forwards';
        result.style.animation = 
            'going-up 0.5s forwards, '+
            'fade-in 0.5s forwards';
    }, 600);
}

function end() {
    qna.style.animation ='';
    const interval = setInterval(function() {
        qna.style.opacity -= 0.1;
        qna.style.transform = 'translateY(-1px)';
    }, 50);
    setTimeout(function() {
        clearTimeout(interval);
    }, 500);
    setTimeout(function() {
        qna.style.display = 'none';
    }, 500);
    setTimeout(function() {
        const calc = document.getElementById('calc');
        calc.style.display = 'block';
        calc.style.animation =
            'going-up 0.5s forwards, '+
            'fade-in 0.5s forwards';
    }, 700);
    setTimeout(function() {
        calc.style.animation ='';
        calc.style.animation = 
            'going-left 0.4s forwards, '+
            'fade-out 0.4s forwards';
        setTimeout(function() {
            calc.style.display = 'none';
            goResult();
        }, 400);
    }, 9000);
}

function addAnswer(answerTxt, idx) {
    let answer = document.createElement('button');
    const a = document.querySelector('.answer');
    answer.className += 'a box';
    answer.innerHTML = answerTxt;
    answer.addEventListener('click', function() {
        let parent = answer.parentNode;
        parent.style.animation = '';
        let children = parent.childNodes;
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
        }
        parent.style.animation = 
            'fade-out 0.5s 0.4s';
        setTimeout(function() {
            select[qIdx] = idx; 
            a.innerHTML = '';
            goNext();
        }, 800);
    });

    setTimeout(function() {
        answer.style.animation = 
            'going-down 0.25s forwards, fade-in 0.25s forwards';
    }, 50);
    a.appendChild(answer);
}


function goNext() {
    if (qIdx++ === qnaList.length - 1) {
        end();
        return;
    }
    /*
    qna.style.animation = '';
    qna.style.animation = 
        'fade-out 0.3s ease-in-out, '+
        'going-up 0.3s ease-in-out';
    qna.style.opacity = 0;
    */
    let status = document.querySelector('.status');
    status.style.width = (ENDPOINT * (qIdx+1))+'%';
    
    qNum = qnaList[qIdx];
    const q = document.querySelector('.q');
    q.innerHTML = qNum.q;
    qna.style.animation = 
        'fade-in 0.3s ease-in-out 0.4s forwards, '+
        'going-down 0.3s ease-in-out 0.4s forwards';
        
    setTimeout(function() {
        const endIdx = qNum.a.length-1;
        for (let i in qNum.a) {
            addAnswer(qNum.a[i].answer, i);
        }
        qna.style.opacity = 1;
    }, 700);
}

function begin() {
    if (beginFlag)
        return;
    beginFlag = true;

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
        qna.style.display = 'block';
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