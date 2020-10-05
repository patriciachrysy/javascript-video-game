import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('obstacle', 'assets/obstacle2.png');
    this.load.image('flower', 'assets/flower.png');
    this.load.spritesheet('bady', 
        'assets/shadow_soul2.png',
        { frameWidth: 72, frameHeight: 128 }
    );
    this.load.spritesheet('fire', 
        'assets/fire.png',
        { frameWidth: 72, frameHeight: 128 }
    );
  }

  create () {
    this.add.image(400, 300, 'background');
    let platforms = this.physics.add.staticGroup({
      key: 'ground',
      repeat: 10,
      setXY: { x: 120, y: 568, stepX: 255 }
    });

    let obstacles = this.physics.add.staticGroup({
      key: 'obstacle',
      repeat: 10,
      setXY: { x: 640, y: 479, stepX: 700 }
    });

    obstacles.children.iterate(function (child) {

      child.setScale(1);

    });

    let flowers = this.physics.add.group({
      key: 'flower',
      repeat: 10,
      setXY: { x: 130, y: 200, stepX: 700 }
    });

    flowers.children.iterate(function (child) {

      child.setScale(0.25);

    });
    
    this.physics.add.collider(flowers, platforms);

    let badies = this.physics.add.group({
      key: 'bady',
      repeat: 10,
      setXY: { x: 300, y: 200, stepX: 700 }
    });

    
    badies.children.iterate(function (child) {
      child.setBounce(0.5);
      child.setCollideWorldBounds(true);
      child.body.setGravityY(300);
      child.setVelocity(-160);

    });
    

    
    this.physics.add.collider(badies, platforms);
    this.physics.add.collider(badies, obstacles, (bady) => {
      badies.children.iterate(function (child) {
        child.setVelocity(-160)
      })
    });
    
    


    let powerText = this.add.text(16, 16, 'power: 0', { fontSize: '22px', fill: '#fff' });
    let scoreText = this.add.text(16, 50, 'score: 0', { fontSize: '22px', fill: '#fff' });

  }

};
