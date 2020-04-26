class Teams {
  constructor(socket, teamsDOM) {
    this.io = socket;
    this.teamsDOM = teamsDOM;
    this.teamsList = teamsDOM.querySelector('#team_list');
  }

  init() {
    this.io.on(IoEvent.PLAYER.CHANGE, (teams) => {
      console.log('TEAM::teams');
      console.log(teams);
      this.render(teams);
    });
  }

  forgeList(teams) {
    return teams.map(team => this.createNode(team)).join('');
  }

  emptyList() {
    this.teamsList.innerHTML = '';
  }

  createNode(team) {
    return `
      <div class="uk-card uk-card-small uk-card-default uk-box-shadow-large">
        <h3 class="uk-card-title uk-text-center@s">${team.name}</h3>
        <ul class="uk-list uk-list-striped">
          ${team.members.map(member => `<li>${member.name}</li>`).join('')}
        </ul>
      </div>
    `
  }

  render(teams) {
    const list = this.forgeList(teams);
    this.emptyList();
    this.teamsList.insertAdjacentHTML('afterbegin', list);
  }
}
