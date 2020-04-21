"use strict";

var url = 'https://dev-dain.github.io/10-things-test';
var title = '[심리테스트] 나를 알아보는 10가지 질문 ';
var hash = '%2310_things_test %233분심리테스트 %23이미지테스트 ';

function fb() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title + '' + hash, 'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  return false;
}

function tw() {
  var name = document.querySelector('.result');
  window.open('https://twitter.com/intent/tweet?text=' + title + '%0A' + '저는 ' + name.innerHTML + ' 이에요! ' + hash + '%0A' + url, 'twittersharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
  return false;
}

function nv() {
  window.open('http://share.naver.com/web/shareView.nhn?url=' + url + '&title=' + title, 'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  return false;
}

function band() {
  window.open('https://band.us/plugin/share?url=' + url + '&title=' + title, 'naversharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
  return false;
}