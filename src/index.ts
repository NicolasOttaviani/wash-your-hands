import "phaser";
import { Game } from "./game";
import { Start } from "./start";
import { gameConfig } from "./configs";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: gameConfig.width,
    height: gameConfig.height,
  },
  dom: {
    createContainer: true,
  },
  scene: [Start, Game],
};
document.body.style.backgroundColor = "#ffffff";
export const game = new Phaser.Game(config);
