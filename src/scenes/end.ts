import { gameConfig } from "../configs";
import { addFailingWater } from "../lib/water";
export class End extends Phaser.Scene {
  constructor() {
    super("end");
  }

  preload() {
    this.load.svg("hand", "assets/hands.svg", {
      width: gameConfig.width,
      height: gameConfig.height,
    });
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2 - 60, "hand");
    addFailingWater(this);
    this.events.once("hand-washed", () => {
      this.add
        .text(
          60,
          gameConfig.height / 2,
          "Bravo tes mains sont toutes propres !",
          {
            fontFamily: "Arial",
            fontSize: 28,
            color: "#444444",
          }
        )
        .setOrigin(0);

      this.input.on("pointerdown", () => {
        this.scene.start("game");
      });
    });
  }
}
