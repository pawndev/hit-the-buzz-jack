class Score {
  constructor(socket, scoreDOM) {
    this.io = socket;
    this.scoreDOM = scoreDOM;
    this.scoreList = scoreDOM.querySelector('#score_list');
    this.scoreBody = this.scoreList.querySelector('tbody');
  }

  init() {
    this.io.on(IoEvent.SCORE.CHANGE, (teams) => this.render(teams));
    this.addEvent();
  }

  decrementPoint(team_name) {
    console.log(team_name);
    this.io.emit(IoEvent.SCORE.DEC, team_name);
  }

  incrementPoint(team_name) {
    console.log(team_name);
    this.io.emit(IoEvent.SCORE.INC, team_name);
  }

  addEvent() {
    const allDecAction = Array.from(this.scoreBody.querySelectorAll('.dec_point'));
    const allIncAction = Array.from(this.scoreBody.querySelectorAll('.inc_point'));
    allDecAction.map(minus => {
      const tr = minus.closest('tr');
      const id = tr.id;
      console.log({ id });
      minus.addEventListener('click', () => this.decrementPoint(id));
    });
    allIncAction.map(plus => {
      const tr = plus.closest('tr');
      const id = tr.id;
      console.log({ id });
      plus.addEventListener('click', () => this.incrementPoint(id));
    });
  }

  forgeList(teams) {
    console.log(teams)
    return teams
      .sort((prev, curr) => curr.point - prev.point)
      .map(team => this.createNode(team)).join('');
  }

  emptyList() {
    this.scoreBody.innerHTML = '';
  }

  createNode(team) {
    return `
       <tr id="${team.name}">
        <td>${team.name}</td>
        <td>${team.point}</td>
        <td>
          <span class="pointer dec_point" uk-icon="minus"></span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span class="pointer inc_point" uk-icon="plus"></span>
        </td>
      </tr>
    `
  }

  render(teams) {
    const scoreList = this.forgeList(teams);
    this.emptyList();
    this.scoreBody.insertAdjacentHTML('afterbegin', scoreList);
    this.addEvent();
  }
}
