import 'phaser';
import config from '../Config/config';
import  { getScores } from '../Score/scoreApi';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor () {
    super('LeaderBoard');
  }

  preload() {
    this.loadScores();
  }

  create () {
    this.creditsText = this.add.text(0, 0, 'Best Scores', { fontSize: '32px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    this.creditsText.setY(100)

    let pos = 200;

    if (this.scores){
      for(let score of this.scores) {
        let madeByText = this.add.text(0, 0, score.user + ': ' + score.score, { fontSize: '26px', fill: '#fff' });
  
        Phaser.Display.Align.In.Center(
          this.madeByText,
          this.zone
        );
    
        this.madeByText.setY(pos);
        pos += 100;
      }
    }

    
    

    

    //Back board
    this.leaderBoardButton = this.add.sprite(pos + 100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderBoardButton, -2);

    this.leaderBoardText = this.add.text(0, 0, 'Back', { fontSize: '25px', fill: '#fff' });
    this.centerButtonText(this.leaderBoardText, this.leaderBoardButton);

    this.leaderBoardButton.on('pointerdown', function (pointer) {
      this.scene.start('Title');
    }.bind(this));
    
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }

  async loadScores () {
    this.scores = await getScores();
    console.log(this.scores);
    console.log(typeof(this.scores))
  }
};