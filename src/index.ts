import "phaser";
import { Game } from "./scenes/game";
import { Start } from "./scenes/start";
import { End } from "./scenes/end";

import { gameConfig } from "./configs";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: 0xffffff,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: gameConfig.width + 200,
    height: gameConfig.height,
  },
  dom: {
    createContainer: true,
  },
  scene: [Start, Game, End],
};
document.body.style.backgroundColor = "#ffffff";
export const game = new Phaser.Game(config);
