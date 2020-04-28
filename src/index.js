import { build } from "./wash";

window.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementsByTagName("svg")[0];
  console.log(svg);
  build(svg);
});
