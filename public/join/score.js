class Score {
  constructor(socket, scoreDOM) {
    this.io = socket;
    this.scoreDOM = scoreDOM;
    this.scoreList = scoreDOM.querySelector('#score_list');
    this.scoreBody = this.scoreList.querySelector('tbody');
  }

  init() {
    this.io.on(IoEvent.SCORE.CHANGE, (teams) => this.render(teams));
  }

  forgeList(teams) {
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
      </tr>
    `
  }

  render(teams) {
    const scoreList = this.forgeList(teams);
    this.emptyList();
    this.scoreBody.insertAdjacentHTML('afterbegin', scoreList);
  }
}
