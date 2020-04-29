const maxY = 1100;
const minY = -80;

export function addRisingWater(scene: Phaser.Scene) {
  const water = scene.add.image(0, maxY, "water").setOrigin(0);
  scene.tweens.add({
    targets: water,
    props: {
      y: {
        value: minY,
        duration: 3500,
        ease: "Power1",
      },
      x: {
        duration: 300,
        yoyo: true,
        repeat: 5,
        ease: "Sine.easeInOut",
        value: -50,
      },
    },
    onComplete: () => {
      scene.events.emit("hand-washed");
    },
  });
}

export function addFailingWater(scene: Phaser.Scene) {
  const water = scene.add.image(0, minY, "water").setOrigin(0);
  scene.tweens.add({
    targets: water,
    props: {
      y: {
        value: maxY,
        duration: 2000,
        ease: "Power1",
      },
      x: {
        duration: 200,
        yoyo: true,
        repeat: 2,
        ease: "Sine.easeInOut",
        value: -50,
      },
    },
    onComplete: () => {
      scene.events.emit("hand-washed");
    },
  });
}
