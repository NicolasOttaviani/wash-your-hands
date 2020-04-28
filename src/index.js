import { build } from "./wash";

window.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("svg");
  build(svg);
});
