"use strict";

var flag = 0;
var head = document.getElementsByTagName('head')[0];
var dark_css = document.createElement('link');
dark_css.rel = 'stylesheet';
dark_css.type = 'text/css';
dark_css.href = 'css/darkmode.css';

function goDark() {
  flag = 1;
  head.appendChild(dark_css);
}

function goLight() {
  flag = 0;
  if (head.lastChild === dark_css) head.removeChild(dark_css);
}

function isDarkMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) goDark();else goLight();
}

function switchMode() {
  if (flag) goLight();else goDark();
}

isDarkMode();