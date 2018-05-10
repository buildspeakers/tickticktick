function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function newId(title) {
  return `${title}_${Math.floor(Math.random() * 1000000000)}`;
}