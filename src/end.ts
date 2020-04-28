import { gameConfig } from "./configs";

export class End extends Phaser.Scene {
  constructor() {
    super("end");
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
      .text(0, gameConfig.height / 2, "Bravo tes mains sont toutes propres !", {
        fontFamily: "Arial",
        fontSize: 28,
        color: "#444444",
      })
      .setOrigin(0);

    this.input.on("pointerdown", () => {
      this.scene.start("game");
    });
  }
}
