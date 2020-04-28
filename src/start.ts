import { gameConfig } from "./configs";

export class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.svg("hand", "assets/hand.svg", {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.load.spritesheet("bubbles", "assets/bubble.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
  }

  create() {
    this.add.image(0, 0, "hand").setOrigin(0);

    this.add
      .text(
        gameConfig.width / 2 - 140,
        gameConfig.height / 2,
        "Click to start",
        {
          fontFamily: "Arial",
          fontSize: 32,
          color: "#00ff00",
        }
      )
      .setOrigin(0);

    this.input.on("pointerdown", (pointer: Phaser.Geom.Point) => {
      this.scene.start("game");
    });

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
    const boom = this.add.sprite(400, 300, "bubbles");
    boom.anims.play("explode");
  }
}
