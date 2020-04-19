const socket = io();
const buzz = new Buzz(socket, document.querySelector('#buzz'));
const team = new Teams(socket, document.querySelector('#teams'));
const score = new Score(socket, document.querySelector('#score'));

document.addEventListener('DOMContentLoaded', () => {
  buzz.init();
  team.init();
  score.init();
});
