function staggerIn() {
  // Fade in one by one
  let todosTl = new TimelineMax();
  // duration: 0.15s
  // delay/gap: 0.05s
  todosTl.staggerTo('.todo-item', 0.15, {
    ease: Power2.easeIn,
    display: "list-item",
    opacity: 1,
    x: 0
  }, 0.05);
}

function fadeIn(dataId) {
  TweenMax.to(dataId, 0.15, {
    ease: Power2.easeIn,
    display: "list-item",
    opacity: 1
  });
  TweenMax.to(dataId, 0.15, {
    ease: Power2.easeIn,
    x: 0
  });
}
