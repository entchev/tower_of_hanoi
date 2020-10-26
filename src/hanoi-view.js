class HanoiView {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.$counter = 0;

    this.fromTowerIdx = null;

    this.$el.on('click', 'ul', this.clickTower.bind(this));

    this.setupTowers();
    this.render();
  }

  clickTower(event) {
    const clickedTowerIdx = $(event.currentTarget).index();

    if (this.fromTowerIdx === null) {
      this.fromTowerIdx = clickedTowerIdx;
    } else {
      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
        this.$counter -= 2;
        alert('Invalid Move! Try again.');
      }

      this.fromTowerIdx = null;
    }

    this.$counter += 1;
    this.render();

    if (this.game.isWon()) {
      this.$el.off('click');
      this.$el.addClass('game-over');
      alert(`Well done! You won with ${(this.$counter/2)} moves! See if you can improve?`);
    }
  }

  render () {
    const $towers = this.$el.find('ul');
    $towers.removeClass();

    if (this.fromTowerIdx !== null) {
      $towers.eq(this.fromTowerIdx).addClass('selected');
    }

    this.game.towers.forEach((disks, towerIdx) => {
      const $disks = $towers.eq(towerIdx).children();
      $disks.removeClass();

      disks.forEach((diskWidth, diskIdx) => {
        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);
      });
    });
  }

  setupTowers() {

    this.$el.empty();

    let $tower, $disk;

    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      $tower = $('<ul>');

      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
        $disk = $('<li>');
        $tower.append($disk);
      }

      this.$el.append($tower);
    }

    const $restart = $(".restart");
    $restart.click(function () {
      location.reload();
    });

  }
}

module.exports = HanoiView;
