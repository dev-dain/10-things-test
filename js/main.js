const header = document.getElementById('header');
const footer = document.getElementById('footer');
const qna = document.getElementById('qna');
const u_name = document.querySelector('input[type=text]');
const wrap = document.getElementById('wrap');
const tabletMQL = window.matchMedia("all and (min-width: 768px)");
const pcMQL = window.matchMedia("all and (min-width: 1024px)");
const ENDPOINT = 10;
let qIdx = -1;
let score = 0;
let select = [];

function copy() {
    var tmp = document.createElement('textarea');
    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
}

function calcScore() {
    let point = 0;
    let temp;
    for (let i = 0; i < ENDPOINT; i++) {
        temp = qnaList[i].a[select[i]].score;
        point += temp;
    }
    return point;
}

function sortResult(point) {
    let num = 0;
    if (point <= 20) {
        num = 0;
    } else if (point <= 30) {
        num = 1;
    } else if (point <= 40) {
        num = 2;
    } else if (point <= 50) {
        num = 3;
    } else if (point <= 60) {
        num = 4;
    } else {
        num = 5;
    }
    return num;
}

function goResult() {
    if (pcMQL.matches) {
        console.log('PC');
        wrap.style.marginTop = '150px';
    } else if (tabletMQL.matches) {
        console.log('tablet');
        wrap.style.marginTop = '115px';
    } 

    const result = document.getElementById('result');
    let point = calcScore();
    let grade = sortResult(point);

    let pTitle = document.querySelector('.p');
    pTitle.innerHTML = u_name.value + ' 님의 점수는...';
    
    let res_point = document.querySelector('.point');
    res_point.innerHTML = point + '점';

    let pin = document.querySelector('.pin');
    pin.style.marginLeft = infoList[grade].mLeft;

    let img_url = 'url("img/image-' + grade + '.png")';
    const res_img = document.querySelector('.art');
    res_img.style.backgroundImage = img_url;
    res_img.style.backgroundRepeat = "no-repeat";
    res_img.style.backgroundSize = "contain";
    res_img.style.backgroundPosition = "center";

    const animal = document.querySelector('.result');
    animal.innerHTML = infoList[grade].name;

    const desc = document.querySelector('.res');
    desc.innerHTML = infoList[grade].desc;

    setTimeout(function() {
        header.style.display = 'block';
        footer.style.display = 'block';
        result.style.display = 'block';
        header.style.animation = 
            'fade-in 0.3s forwards';
        footer.style.animation = 
            'fade-in 0.3s forwards';
        result.style.animation = 
            'going-up 0.5s, '+
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
        let children = parent.childNodes;
        for (let i = 0; i < children.length; i++) {
            children[i].disabled = true;
        }
        parent.classList.add('fade-out-5-4');
        setTimeout(function() {
            select[qIdx] = idx; 
            a.innerHTML = '';
            parent.classList.remove('fade-out-5-4');
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
    
    let status = document.querySelector('.status');
    status.style.width = (ENDPOINT * (qIdx+1))+'%';
    
    const qNum = qnaList[qIdx];
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
    const welcome = document.getElementById('welcome');

    header.style.animation = 
        'going-up 0.4s forwards, '+
        'fade-out 0.4s forwards';
    footer.style.animation = 
        'going-down 0.4s forwards, '+
        'fade-out 0.4s forwards';
    setTimeout(function() {
        welcome.style.animation = 
        'going-up 0.4s ease-in-out forwards, '+
        'fade-out 0.4s ease-in-out forwards';
    }, 500);
    setTimeout(function() {
        header.style.display = 'none';
        footer.style.display = 'none';
        welcome.style.display = 'none';
        qna.style.display = 'block';
        if (pcMQL.matches) {
            console.log('PC');
            wrap.style.marginTop = '50px';
        } else if (tabletMQL.matches) {
            console.log('tablet');
            wrap.style.marginTop = '30px';
        } 
        goNext();
    }, 1000);
}

function load() {
    const msg = document.querySelector('.check-name');
    const start_btn = document.querySelector('.start');

    u_name.addEventListener('blur', function() {
        if (u_name.value.length < 1) {
            msg.innerHTML = '이름을 입력하고 시작해 주세요.';
        } else {
            msg.innerHTML = '';
        }
    });
    
    start_btn.addEventListener('click', function() {
        if (u_name.value.length < 1) {
            msg.innerHTML = '이름을 입력하고 시작해 주세요.';
        } else {
            msg.innerHTML = '';
            start_btn.disabled = true;
            begin();
        }
    });
    
}

load();