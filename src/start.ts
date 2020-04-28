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
  }
}
