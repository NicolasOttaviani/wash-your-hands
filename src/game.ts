import { hand } from "./polygons";
const polygon = new Phaser.Geom.Polygon(hand.map((n) => n - 150) as any);

function randomPoints(width: number, height: number, number: number) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 1000; ++i) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (polygon.contains(x, y)) {
      points.push({ x, y });
      if (points.length > number) {
        return points;
      }
    }
  }
  return points;
}

export class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.svg("hand", "assets/hand.svg", { width: 456, height: 681 });
    this.load.spritesheet("viruses", "assets/viruses.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.spritesheet("bubbles", "assets/bubble.png", {
      frameWidth: 140,
      frameHeight: 140,
    });
  }

  create() {
    this.add.image(0, 0, "hand").setOrigin(0);
    this.add.sprite(100, 100, "bubbles", 8).setOrigin(0);

    this.input.on("pointermove", function (pointer: Phaser.Geom.Point) {
      if (!Phaser.Geom.Polygon.ContainsPoint(polygon, pointer)) {
        return;
      }
      console.log("yes");
    });

    randomPoints(456, 681, 10).forEach(({ x, y }) => {
      this.add.image(x, y, "viruses", Math.floor(Math.random() * 10));
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
