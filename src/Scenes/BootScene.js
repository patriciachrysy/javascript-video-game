/*
  eslint-disable import/no-extraneous-dependencies, no-undef, class-methods-use-this, no-unused-vars
*/

import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/Treasure-Hunt-logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}