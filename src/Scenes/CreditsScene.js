/*
  eslint-disable import/no-extraneous-dependencies, no-undef, class-methods-use-this,
   no-unused-vars, no-unused-expressions, func-names

*/

import 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.congratsText = this.add.text(0, 0, 'Congratulations, you won!!!', { fontSize: '45px', fill: '#00ff00' });
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Manezeu Patricia Chrystelle', { fontSize: '26px', fill: '#fff' });
    this.descipText = this.add.text(0, 0, 'Treasure Hunt 2D game, part of Microverse capstone project', { fontSize: '26px', fill: '#fff' });
    this.phaserText = this.add.text(0, 0, 'Special thanks to: Phaser3 official documentation', { fontSize: '26px', fill: '#fff' });
    this.ogaText = this.add.text(0, 0, 'Special thanks to: OpenGameArt for the designs', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.congratsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.descipText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.phaserText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.ogaText,
      this.zone,
    );
    // this.congratsText.setY(100);
    this.creditsText.setY(1000);
    this.madeByText.setY(2000);
    this.descipText.setY(3000);
    this.phaserText.setY(4000);
    this.ogaText.setY(5000);

    this.congratsTween = this.tweens.add({
      targets: this.congratsText,
      y: -100,
      ease: 'Power1',
      duration: 10000,
      delay: 2000,
      onComplete() {
        this.destroy;
      },
    });

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -300,
      ease: 'Power1',
      duration: 10000,
      delay: 3000,
      onComplete() {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -500,
      ease: 'Power1',
      duration: 10000,
      delay: 4000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.descipText = this.tweens.add({
      targets: this.descipText,
      y: -700,
      ease: 'Power1',
      duration: 10000,
      delay: 5000,
      onComplete: function () {
        this.descipText.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.phaserText = this.tweens.add({
      targets: this.phaserText,
      y: -900,
      ease: 'Power1',
      duration: 10000,
      delay: 6000,
      onComplete: function () {
        this.phaserText.destroy;
        this.scene.start('Title');
      }.bind(this),
    });

    this.ogaText = this.tweens.add({
      targets: this.ogaText,
      y: -1100,
      ease: 'Power1',
      duration: 10000,
      delay: 70000,
      onComplete: function () {
        this.ogaText.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}