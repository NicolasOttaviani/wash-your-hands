import { gameConfig } from "../configs";

export class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.svg("hand", "assets/hands.svg", {
      width: gameConfig.width,
      height: gameConfig.height,
    });
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2 - 60, "hand");

    this.add
      .text(100, gameConfig.height / 2, "Clique pour commencer", {
        fontFamily: "Arial",
        fontSize: 32,
        color: "#444444",
      })
      .setOrigin(0);

    this.input.on("pointerdown", () => {
      this.scene.start("game");
    });
  }
}
