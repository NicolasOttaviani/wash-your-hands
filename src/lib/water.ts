export function addRisingWater(scene: Phaser.Scene) {
  const water = scene.add.image(0, 700, "water").setOrigin(0);
  scene.tweens.add({
    targets: water,
    props: {
      y: {
        value: -70,
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
  const water = scene.add.image(0, -68, "water").setOrigin(0);
  scene.tweens.add({
    targets: water,
    props: {
      y: {
        value: 700,
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
