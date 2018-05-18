function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function newId(title) {
  return `${Math.floor(Math.random() * 1000)}`
       + `${Math.floor(Math.random() * 1000)}`
       + `${Math.floor(Math.random() * 1000)}`;
}