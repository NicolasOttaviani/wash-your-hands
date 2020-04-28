import { gameConfig } from "./configs";
import { hand } from "./configs";

const MAX_VIRUS = 8;
const VIRUS_LIFE = 4;
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
    this.load.svg("hand", "assets/hand.svg", {
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
  }

  create() {
    let fire = false;
    let currentPointer: Phaser.Geom.Point;
    this.add.image(0, 0, "hand").setOrigin(0);

    this.input.on("pointerdown", (pointer: Phaser.Geom.Point) => {
      fire = true;
      drawBubble(pointer);
    });
    this.input.on("pointerup", () => (fire = false));
    this.input.on("pointermove", drawBubble);
    this.input.on(
      "gameobjectover",
      (pointer: never, gameobject: Phaser.GameObjects.GameObject) => {
        if (fire) {
          const life = <number>gameobject.getData("life");
          gameobject.setData("life", life - 1);
        }
      }
    );

    function drawBubble(pointer: Phaser.Geom.Point) {
      if (!fire) {
        return;
      }
      currentPointer = pointer;
    }

    const virusSize = randomPoints(
      gameConfig.width,
      gameConfig.height,
      MAX_VIRUS
    ).map(({ x, y }) => {
      const scale = 0.5 + Math.floor(Math.random() * 0.5);
      const image = this.add
        .image(x, y, "viruses", Math.floor(Math.random() * 10))
        .setInteractive()
        .setScale(scale)
        .setDataEnabled()
        .setData("life", VIRUS_LIFE)
        .setDepth(3);

      image.on("changedata", (parent: never, key: string, life: number) => {
        if (life === 0) {
          image.destroy();
          this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("bubbles", {
              start: 0,
              end: 8,
            }),
            frameRate: 4,
            repeat: 1,
          });
          const boom = this.add
            .sprite(x, y, "bubbles")
            .setDepth(10)
            .setScale(scale);
          boom.anims.play("explode");
          boom.anims.stopOnRepeat();
          this.events.emit("virus-destroy");

          boom.once("animationcomplete", () => boom.setDepth(0));
        }
      });
    }).length;

    let destroyed = 0;
    this.events.on("virus-destroy", () => {
      destroyed++;
      if (destroyed >= virusSize) {
        this.time.addEvent({
          delay: 4000,
          callback: () => {
            this.events.removeListener("virus-destroy");
            this.scene.start("start");
          },
        });
      }
    });

    this.time.addEvent({
      loop: true,
      delay: 200,
      callback: () => {
        if (!fire || !currentPointer) return;
        const contains = Phaser.Geom.Polygon.ContainsPoint(
          polygon,
          currentPointer
        );
        if (!contains) return;
        this.add
          .image(currentPointer.x, currentPointer.y, "bubble")
          .setScale(0.3);
      },
    });
  }
}
