let flag = false;
const head = document.getElementsByTagName('head')[0];
const dark_css = document.createElement('link');
dark_css.rel = 'stylesheet';
dark_css.type = 'text/css';
dark_css.href = 'css/darkmode.css';

function goDark() {
    flag = true;
    head.appendChild(dark_css);
}

function goLight() {
    flag = false;
    if (head.lastChild === dark_css)
        head.removeChild(dark_css);
}

function isDarkMode() {
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? goDark() : goLight();
}

function switchMode() {
    flag ? goLight() : goDark();
}

isDarkMode();