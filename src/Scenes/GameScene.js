import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('ground', 'assets/forest-2.png', { frameWidth: 132, frameHeight: 148 });
  }

  create () {
    this.add.image(400, 300, 'background');
    let ground = this.physics.add.staticGroup();
    ground.create(400, 568, 'ground', {start: 3, end: 3}).setScale(2).refreshBody();
  }
};
