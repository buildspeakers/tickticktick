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
