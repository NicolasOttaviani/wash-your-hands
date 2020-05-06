import { gameConfig, hand } from "../configs";
import { addViruses } from "../lib/virus";
import { addSoap } from "../lib/soap";
import { addRisingWater } from "../lib/water";
export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.svg("hand", "assets/hands.svg", {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.load.svg("soap", "assets/soap.svg", {
      width: gameConfig.width,
      height: gameConfig.height,
    });
    this.load.image("bubble", "assets/bubble-alone.png");
    this.load.spritesheet("viruses", "assets/viruses.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.spritesheet("bubbles", "assets/bubble.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
    this.load.image("water", "assets/water.png");
  }

  create() {
    this.game.canvas.style.cursor = "none";
    this.add.image(this.scale.width / 2, this.scale.height / 2 - 60, "hand");
    addViruses(this, {
      life: 4,
      max: 12,
      frameRate: 4,
    });
    const { removeSoap } = addSoap(this);

    this.events.once("viruses-destroyed", () => {
      this.input.removeAllListeners();
      removeSoap();
      this.game.canvas.style.cursor = "default";
      this.add
        .text(100, gameConfig.height / 2, "Clique pour te rincer les mains", {
          fontFamily: "Arial",
          fontSize: 28,
          color: "#444444",
        })
        .setOrigin(0);
      this.input.on("pointerdown", () => {
        addRisingWater(this);
      });
    });

    this.events.once("hand-washed", () => {
      this.scene.start("end");
    });
    /*
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000);
    graphics.fillPoints(hand.points, true);
    */
  }
}
