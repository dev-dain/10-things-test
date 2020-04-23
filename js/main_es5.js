"use strict";

var header = document.getElementById('header');
var footer = document.getElementById('footer');
var qna = document.getElementById('qna');
var u_name = document.querySelector('input[type=text]');
var wrap = document.getElementById('wrap');
var tabletMQL = window.matchMedia("all and (min-width: 768px)");
var pcMQL = window.matchMedia("all and (min-width: 1024px)");
var ENDPOINT = 10;
var qIdx = -1;
var score = 0;
var select = [];

function copy() {
  var tmp = document.createElement('textarea');
  document.body.appendChild(tmp);
  tmp.value = url;
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}

function calcScore() {
  var point = 0;
  var temp;

  for (var i = 0; i < ENDPOINT; i++) {
    temp = qnaList[i].a[select[i]].score;
    point += temp;
  }

  return point;
}

function sortResult(point) {
  var num = 0;

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

  var result = document.getElementById('result');
  var point = calcScore();
  var grade = sortResult(point);
  var pTitle = document.querySelector('.p');
  pTitle.innerHTML = u_name.value + ' 님의 점수는...';
  var res_point = document.querySelector('.point');
  res_point.innerHTML = point + '점';
  var pin = document.querySelector('.pin');
  pin.style.marginLeft = infoList[grade].mLeft;
  var animal = document.querySelector('.result');
  animal.innerHTML = infoList[grade].name;
  var desc = document.querySelector('.res');
  desc.innerHTML = infoList[grade].desc;
  setTimeout(function () {
    header.style.display = 'block';
    footer.style.display = 'block';
    result.style.display = 'block';
    header.style.animation = 'fade-in 0.3s forwards';
    footer.style.animation = 'fade-in 0.3s forwards';
    result.style.animation = 'going-up 0.5s, ' + 'fade-in 0.5s forwards';
  }, 600);
}

function end() {
  qna.style.animation = '';
  var interval = setInterval(function () {
    qna.style.opacity -= 0.1;
    qna.style.transform = 'translateY(-1px)';
  }, 50);
  setTimeout(function () {
    clearTimeout(interval);
  }, 500);
  setTimeout(function () {
    qna.style.display = 'none';
  }, 500);
  setTimeout(function () {
    var calc = document.getElementById('calc');
    calc.style.display = 'block';
    calc.style.animation = 'going-up 0.5s forwards, ' + 'fade-in 0.5s forwards';
  }, 700);
  setTimeout(function () {
    calc.style.animation = '';
    calc.style.animation = 'going-left 0.4s forwards, ' + 'fade-out 0.4s forwards';
    setTimeout(function () {
      calc.style.display = 'none';
      goResult();
    }, 400);
  }, 9000);
}

function addAnswer(answerTxt, idx) {
  var answer = document.createElement('button');
  var a = document.querySelector('.answer');
  answer.className += 'a box';
  answer.innerHTML = answerTxt;
  answer.addEventListener('click', function () {
    var parent = answer.parentNode;
    var children = parent.childNodes;

    for (var i = 0; i < children.length; i++) {
      children[i].disabled = true;
    }

    parent.classList.add('fade-out-5-4');
    setTimeout(function () {
      select[qIdx] = idx;
      a.innerHTML = '';
      parent.classList.remove('fade-out-5-4');
      goNext();
    }, 800);
  });
  setTimeout(function () {
    answer.style.animation = 'going-down 0.25s forwards, fade-in 0.25s forwards';
  }, 50);
  a.appendChild(answer);
}

function goNext() {
  if (qIdx++ === qnaList.length - 1) {
    end();
    return;
  }

  var status = document.querySelector('.status');
  status.style.width = ENDPOINT * (qIdx + 1) + '%';
  var qNum = qnaList[qIdx];
  var q = document.querySelector('.q');
  q.innerHTML = qNum.q;
  qna.style.animation = 'fade-in 0.3s ease-in-out 0.4s forwards, ' + 'going-down 0.3s ease-in-out 0.4s forwards';
  setTimeout(function () {
    var endIdx = qNum.a.length - 1;

    for (var i in qNum.a) {
      addAnswer(qNum.a[i].answer, i);
    }

    qna.style.opacity = 1;
  }, 700);
}

function begin() {
  var welcome = document.getElementById('welcome');
  header.style.animation = 'going-up 0.4s forwards, ' + 'fade-out 0.4s forwards';
  footer.style.animation = 'going-down 0.4s forwards, ' + 'fade-out 0.4s forwards';
  setTimeout(function () {
    welcome.style.animation = 'going-up 0.4s ease-in-out forwards, ' + 'fade-out 0.4s ease-in-out forwards';
  }, 500);
  setTimeout(function () {
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
  var msg = document.querySelector('.check-name');
  var start_btn = document.querySelector('.start');
  u_name.addEventListener('blur', function () {
    if (u_name.value.length < 1) {
      msg.innerHTML = '이름을 입력하고 시작해 주세요.';
    } else {
      msg.innerHTML = '';
    }
  });
  start_btn.addEventListener('click', function () {
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