import { hand } from "../configs";

export function addSoap(scene: Phaser.Scene) {
  let fire = false;
  let currentPointer: Phaser.Geom.Point;
  const soap = scene.add
    .image(scene.input.pointer1.x, scene.input.pointer1.y, "soap")
    .setScale(0.1);
  scene.input.on("pointerdown", (pointer: Phaser.Geom.Point) => {
    fire = true;
    updateBubble(pointer);
  });
  scene.events.once("viruses-destroyed", () => (fire = false));
  scene.input.on("pointerup", () => (fire = false));
  scene.input.on("pointermove", updateBubble);
  scene.input.on(
    "gameobjectover",
    (pointer: never, gameobject: Phaser.GameObjects.GameObject) => {
      if (fire) {
        const life = <number>gameobject.getData("life");
        gameobject.setData("life", life - 1);
      }
    }
  );
  function updateBubble(pointer: Phaser.Geom.Point) {
    soap.setPosition(pointer.x, pointer.y);
    if (!fire) {
      return;
    }
    currentPointer = pointer;
  }

  scene.time.addEvent({
    loop: true,
    delay: 150,
    callback: () => {
      if (!fire || !currentPointer) return;
      const contains = Phaser.Geom.Polygon.ContainsPoint(hand, currentPointer);
      if (!contains) return;
      const x = currentPointer.x + Math.floor(Math.random() * 6) - 3;
      const y = currentPointer.y + Math.floor(Math.random() * 6) - 3;
      const scale = 0.1 + Math.random() * 0.3;
      const opacity = 0.1 + Math.random() * 0.9;
      const bubble = scene.add.image(x, y, "bubble").setScale(0);
      bubble.alpha = opacity;
      scene.tweens.add({
        targets: bubble,
        props: {
          scale: {
            value: scale,
            ease: "Bounce",
            delay: 150,
          },
        },
      });
    },
  });

  return {
    removeSoap() {
      soap.destroy();
    },
  };
}
