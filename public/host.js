const socket = io();
const active = document.querySelector('.js-active');
const buzzList = document.querySelector('.js-buzzes');
const userList = document.querySelector('.js-users');
const teamList = document.querySelector('.js-teams');
const clear = document.querySelector('.js-clear');
const tabsDOM = document.querySelectorAll('.tab');
const tabs = Array.from(tabsDOM);
const activeTabClass = 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold';
const inactiveTabClass = 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold';

socket.on('active', ({ users, teams }) => {
  active.innerText = `${users.length} joined`;
  userList.innerHTML = '';
  users.map(user => {
    const child = document.createElement('li');
    child.innerText = `[${user.team}] ${user.name}`;
    userList.appendChild(child)
  })
  // --
  teamList.innerHTML = '';
  teams.map(team => {
    const team_child = document.createElement('div');
    const title = document.createElement('h3');
    title.classList.add('team_name');
    const point = document.createElement('h4');
    point.classList.add('team_point');
    const ul = document.createElement('ul');
    title.innerText = `Equipe: ${team.name}`;
    point.innerHTML = `Point: ${team.point} <span>+</span>`;
    team_child.className = 'card card-1';
    team_child.appendChild(title);
    team_child.appendChild(point);
    console.log(team)
    team.members.map(member => {
      const li = document.createElement('li');
      li.innerText = member.name;
      ul.appendChild(li)
    })
    team_child.appendChild(ul);
    teamList.appendChild(team_child)
  })
});

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(user => `<li>${user.name} on Team ${user.team}</li>`)
    .join('');
});

clear.addEventListener('click', () => {
  socket.emit('clear');
});

tabs.forEach(function(tab) {
  tab.addEventListener('click', function () {
    const main_id = tab.id.split('_')[0]
    tabs.map(current_tab =>
      current_tab.firstChild.className = current_tab.id !== tab.id
        ? inactiveTabClass
        : activeTabClass
    );
    const contentsDOM = document.querySelectorAll('.content');
    const contents = Array.from(contentsDOM)
    contents.map(content => {
      if (content.id !== main_id) {
        if (!content.classList.contains('hidden')) {
          content.classList.add('hidden')
        }
      } else {
        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden')
        }
      }
    })
  });
});
