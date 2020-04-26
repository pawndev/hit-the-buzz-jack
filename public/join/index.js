const socket = io();
const store = new Store();
const score = new Score(socket, document.querySelector('#score'));
const loginSection = document.querySelector('#login');
const loginForm = loginSection.querySelector('#login_form');
const playSection = document.querySelector('#buzz_interface');
const changeTeamButton = document.querySelector('#change_team');
const buzzButton = document.querySelector('#buzz_button');
const personalInfo = document.querySelector('#info_me');
const USER_KEY = 'USER';

function forgeOptions(teams) {
  return [
    `<option></option>`,
    ...(teams.map(team => `
        <option value="${team.name}">${team.name}</option>
    `))
  ].join('');
}

function fetchUser() {
  const storedUser = store.fetch(USER_KEY);
  const deserializedUser = storedUser && JSON.parse(storedUser);
  const user = deserializedUser ? new User(deserializedUser.name, deserializedUser.team, deserializedUser.id) : null;
  return user;
}

function changePersonalInformation(user) {
  personalInfo.textContent = `${user.name} dans l'équipe "${user.team}"`;
}

function toggleLoginView() {
  const isHidden = loginSection.hasAttribute('hidden');
  isHidden
    ? loginSection.removeAttribute('hidden')
    : loginSection.setAttribute('hidden', true);
}

function togglePlayView() {
  const isHidden = playSection.hasAttribute('hidden');
  isHidden
    ? playSection.removeAttribute('hidden')
    : playSection.setAttribute('hidden', true);
}

function onStartPage() {
  const user = fetchUser();

  const selectBox = loginForm.querySelector('[name=team]');
  const teamOptions = Array.from(selectBox.options);
  const idInput = loginForm.querySelector('[name=id]');
  const nameInput = loginForm.querySelector('[name=name]');

  nameInput.value = user ? user.name : '';
  idInput.value = user ? user.id : '';
  const optionToSelect = user && teamOptions.find(option => option.value === user.team);
  if (optionToSelect) optionToSelect.selected = true;
}

function onLoginSubmit(e) {
  e.preventDefault();
  // get all nodes
  const idNode = loginForm.querySelector('[name=id]');
  const nameNode = loginForm.querySelector('[name=name]');
  const teamNode = loginForm.querySelector('[name=team]');
  const createTeamNode = loginForm.querySelector('[name=create_team]');
  // get all values
  const id = idNode.value || null;
  const name = nameNode.value;
  const team = teamNode.value || createTeamNode.value;
  // check all required fields is present
  if (!nameNode.value) return alert('Missing username');
  if (!teamNode.value && !createTeamNode.value) return alert('Choose or create a team');
  // store user in case of
  const newUser = new User(name, team, id);
  store.commit(USER_KEY, newUser.toObject());
  socket.emit(IoEvent.PLAYER.NEW, newUser.toObject());

  changePersonalInformation(newUser);
  toggleLoginView();
  togglePlayView();
}

function onChangeTeam() {
  const user = fetchUser();
  if (user) {
    socket.emit(IoEvent.PLAYER.EXIT, user);
  }
  toggleLoginView();
  togglePlayView();
}

function onBuzz() {
  const user = fetchUser();
  if (user) socket.emit(IoEvent.BUZZ.NEW, user);
}

function onPlayerChange(teams) {
  const options = forgeOptions(teams);
  const selectBox = loginForm.querySelector('[name=team]');
  selectBox.innerHTML = '';
  selectBox.insertAdjacentHTML("beforeend", options);
}

socket.on(IoEvent.PLAYER.CHANGE, onPlayerChange)
loginForm.addEventListener('submit', onLoginSubmit);
changeTeamButton.addEventListener('click', onChangeTeam);
buzzButton.addEventListener('click', onBuzz);
document.addEventListener('DOMContentLoaded', onStartPage);
score.init();
