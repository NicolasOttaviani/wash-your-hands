import "phaser";
import { Game } from "./game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 450,
    height: 700,
  },
  dom: {
    createContainer: true,
  },
  scene: [Game],
};
document.body.style.backgroundColor = "#ffffff";
export const game = new Phaser.Game(config);
