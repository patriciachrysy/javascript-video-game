/*
  eslint-disable import/no-extraneous-dependencies, no-undef, class-methods-use-this,
   no-unused-vars, no-restricted-syntax
*/

import 'phaser';
import config from '../Config/config';
import { getScores } from '../Score/scoreApi';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Best Scores', { fontSize: '32px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    this.creditsText.setY(100);

    this.pos = 200;

    this.loadScores();

    // Back board
    this.leaderBoardButton = this.add.sprite(this.pos + 100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.leaderBoardButton, -2);

    this.leaderBoardText = this.add.text(0, 0, 'Back', { fontSize: '25px', fill: '#fff' });
    this.centerButtonText(this.leaderBoardText, this.leaderBoardButton);

    this.leaderBoardButton.on('pointerdown', (pointer) => {
      this.scene.start('Title');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100,
        config.width, config.height),
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton,
    );
  }

  async loadScores() {
    this.scores = await getScores();
    for (const score of this.scores) {
      const madeByText = this.add.text(0, 0, `${score.user}: ${score.score}`, { fontSize: '26px', fill: '#fff' });

      Phaser.Display.Align.In.Center(
        madeByText,
        this.zone,
      );

      madeByText.setY(this.pos);
      this.pos += 100;
    }
  }
}