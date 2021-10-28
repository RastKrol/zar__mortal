export default class Player {
  constructor(props) {
    (this.player = props.player),
      (this.name = props.name),
      (this.hp = props.hp),
      (this.img = props.img);
  }
  changeHP(damage) {
    if (this.hp - damage < 0) {
      this.hp = 0;
    } else {
      this.hp -= damage;
    }
  }
  elHP() {
    return document.querySelector(`.player${this.player} .life`);
  }
  renderHP() {
    this.elHP().style.width = this.hp + "%";
  }
}
