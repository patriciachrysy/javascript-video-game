import 'phaser';
import  { saveScore } from '../Score/scoreApi';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.player = null;
    this.score = 0;
    this.power = 0;
    this.scoreText = null;
    this.powerText = null;
    this.fires = null;
    this.treasure = null;
    this.name = null;
  }

  preload () {
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('obstacle', 'assets/obstacle2.png');
    this.load.image('flower', 'assets/flower.png');
    this.load.image('fire', 'assets/fire.png');
    this.load.image('treasure', 'assets/treasure.png');
    this.load.spritesheet('bady', 
        'assets/shadow_soul2.png',
        { frameWidth: 72, frameHeight: 128 }
    );
    this.load.spritesheet('hero', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  collectFlowers (player, flower)
    {
        flower.disableBody(true, true);

        this.power += 10;
        this.powerText.setText('power: ' + this.power);

    }

  sendFire () 
  {
    console.log('sendFire called');
    if (this.power > 0 && this.fires.countActive(true) === 0) {
      let fire = this.fires.create(this.player.x, this.player.y, 'fire');
      fire.setScale(0.25);
      fire.body.setGravityY(null);
      fire.body.setGravityX(300);
      //fire.setCollideWorldBounds(true);
      this.physics.add.collider(fire, this.physics.world, this.hitWorldBounds, null, this);
      this.power = this.power - 1;
      this.powerText.setText('power: ' + this.power);
    }
  }

  hitWorldBounds (fire, world) {
    fire.disableBody(true, true);
  }

  killBady(fire, bady) {
    fire.disableBody(true, true);
    bady.disableBody(true, true);
    this.score = this.score + 10;
    this.scoreText.setText('score: ' + this.score);
  }

  endGame(player, bady) {
    this.physics.pause();

    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    saveScore(this.name, this.score);

    this.scene.start('LeaderBoard');
  }

  winGame(player, treasure) {
    this.physics.pause();

    this.player.setTint(0x00ff00);

    this.player.anims.play('turn');

    this.scene.start('Credits');
  }

  create () {
    this.name = prompt("Enter your Name : ", "Enter your name"); 
    let backgrounds = this.physics.add.staticGroup({
      key: 'background',
      repeat: 10,
      setXY: { x: 400, y: 300, stepX: 1026 }
    });

    let platforms = this.physics.add.staticGroup({
      key: 'ground',
      repeat: 100,
      setXY: { x: 15, y: 568, stepX: 255 }
    });

    this.treasure = this.physics.add.staticGroup();

    this.treasure.create(11000, 480, 'treasure').setScale(0.2).refreshBody();

    let obstacles = this.physics.add.staticGroup({
      key: 'obstacle',
      repeat: 10,
      setXY: { x: 940, y: 479, stepX: 1500 }
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

    this.fires = this.physics.add.group();

    this.physics.add.collider(this.fires, platforms);


    let badies = this.physics.add.group({
      key: 'bady',
      repeat: 10,
      setXY: { x: 600, y: 200, stepX: 1400 }
    });

    
    badies.children.iterate(function (child) {
      child.setBounce(0.5);
      //child.setCollideWorldBounds(true);
      child.body.setGravityY(300);
      child.setVelocityX(-160);

    });
    
    this.physics.add.collider(badies, platforms);
    this.physics.add.collider(badies, obstacles, (bady) => {
      badies.children.iterate(function (child) {
        child.setVelocityX(-child.body.velocity.x);
      })
    });

    this.player = this.physics.add.sprite(50, 200, 'hero');
    
    this.player.setBounce(0.5);
    this.player.body.setGravityY(300);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, obstacles);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'hero', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    
    let camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setFollowOffset(-350, 225);
    
    this.physics.add.overlap(this.player, flowers, this.collectFlowers, null, this);
    this.physics.add.overlap(this.fires, badies, this.killBady, null, this);
    this.physics.add.overlap(this.player, badies, this.endGame, null, this);
    this.physics.add.overlap(this.player, this.treasure, this.winGame, null, this);


    this.playerText = this.add.text(this.player.x, -38, this.name, { fontSize: '22px', fill: '#fff' });
    this.powerText = this.add.text(this.player.x, 16, 'power: 0', { fontSize: '22px', fill: '#fff' });
    this.scoreText = this.add.text(this.player.x, 50, 'score: 0', { fontSize: '22px', fill: '#fff' });

  }

  update() {

    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown && this.player.x > 15)
    {
      this.player.setVelocityX(-160);
      this.powerText.x = this.player.x;
      this.scoreText.x = this.player.x;
      this.playerText.x = this.player.x;
      this.player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
      this.player.setVelocityX(160);
      this.powerText.x = this.player.x;
      this.scoreText.x = this.player.x;
      this.playerText.x = this.player.x;
      this.player.anims.play('right', true);
    }
    else
    {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down)
    {
      this.player.setVelocityY(-330);
    }

    if (cursors.space.isDown)
    {   
        this.sendFire();
        console.log(this.fires.countActive(true));
    }

  }



};
