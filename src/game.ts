export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.svg("hand", "assets/hand.svg", { width: 456, height: 681 });
    this.load.spritesheet("bubbles", "assets/bubble.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
  }

  create() {
    this.add.image(0, 0, "hand").setOrigin(0);
    this.add.sprite(100, 100, "bubbles", 8).setOrigin(0);
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("bubbles", {
        start: 0,
        end: 8,
        first: 0,
      }),
      frameRate: 4,
      repeat: -1,
    });
    var boom = this.add.sprite(400, 300, "bubbles");
    boom.anims.play("explode");
  }
}
