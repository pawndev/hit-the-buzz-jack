class Buzz {
  constructor(socket, buzzDOM) {
    this.io = socket;
    this.buzzDOM = buzzDOM;
    this.clearBtn = buzzDOM.querySelector('#clear_buzz');
    this.buzzList = buzzDOM.querySelector('#buzz_list');
    // this.buzzes = [];
  }

  init() {
    this.clearBtn.addEventListener('click', (e) => this.clear(e));
    this.io.on(IoEvent.PLAYER.BUZZED, (user) => this.render(user));
  }

  clear(e) {
    this.io.emit(IoEvent.BUZZ.CLEAR);
    this.clearBuzzListDom();
  }

  clearBuzzListDom() {
    this.buzzList.innerHTML = '';
  }

  addBuzz(user) {
    console.log(user);
    // const alreadyBuzzed = this.buzzes.some(buzz => buzz.id === user.id);
    if (!alreadyBuzzed) {
      this.buzzes = [...this.buzzes, user];
      this.render();
    }
    // const buzz = `<li>[${user.team}] ${user.name}</li>>`;
    // this.buzzList.insertAdjacentHTML('beforeend', buzz);
  }

  render(buzzes) {
    const toRender = buzzes.map(cur_buzz => `<li>[${cur_buzz.team}] ${cur_buzz.name}</li>`).join('');
    this.clearBuzzListDom();
    return this.buzzList.insertAdjacentHTML('beforeend', toRender)
  }
}
