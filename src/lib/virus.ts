import { gameConfig, hand } from "../configs";

function randomPoints(width: number, height: number, number: number) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < 1000; ++i) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height - 100);

    if (hand.contains(x, y)) {
      points.push({ x, y });
      if (points.length >= number) {
        return points;
      }
    }
  }
  return points;
}

export function addViruses(
  scene: Phaser.Scene,
  { max, life, frameRate }: { max: number; life: number; frameRate: number }
) {
  const virusSize = randomPoints(gameConfig.width, gameConfig.height, max).map(
    ({ x, y }) => {
      const scale = 0.5 + Math.floor(Math.random() * 0.5);
      const image = scene.add
        .image(x, y, "viruses", Math.floor(Math.random() * 20))
        .setInteractive()
        .setScale(scale)
        .setDataEnabled()
        .setData("life", life)
        .setDepth(3);

      image.on("changedata", (parent: never, key: string, life: number) => {
        if (life === 0) {
          image.destroy();
          animBubble(scene, x, y, scale, frameRate);
        }
      });
    }
  ).length;

  let destroyed = 0;
  scene.events.on("virus-destroy", () => {
    destroyed++;
    if (destroyed >= virusSize) {
      scene.time.addEvent({
        delay: 4000,
        callback: () => {
          scene.events.removeListener("virus-destroy");
          scene.events.emit("viruses-destroyed");
        },
      });
    }
  });
}

function animBubble(
  scene: Phaser.Scene,
  x: number,
  y: number,
  scale: number,
  frameRate: number
) {
  scene.anims.create({
    key: "explode",
    frames: scene.anims.generateFrameNumbers("bubbles", {
      start: 0,
      end: 9,
    }),
    frameRate,
    repeat: 1,
  });
  const bubble = scene.add.sprite(x, y, "bubbles").setDepth(10).setScale(scale);
  bubble.anims.play("explode");
  bubble.anims.stopOnRepeat();
  scene.events.emit("virus-destroy");
  let destX = x;
  scene.tweens.add({
    targets: bubble,
    props: {
      y: {
        value: 0,
        duration: 3000,
        ease: "Power1",
      },
      x: {
        duration: 300,
        yoyo: true,
        repeat: 4,
        ease: "Sine.easeInOut",
        value: {
          getStart: (target: never, key: never, value: number) => value + 10,
          getEnd: (target: never, key: never, value: number) => {
            destX -= 10;
            return destX;
          },
        },
      },
      scale: {
        ease: "Linear",
        delay: 800,
        duration: 1500,
        value: 0,
      },
    },
    onComplete: () => {
      bubble.destroy();
    },
  });
}
