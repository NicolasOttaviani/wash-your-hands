const BUBBLE_REFRESH_DELAY = 100;

export function build(svg: SVGSVGElement) {
  const handPath = <SVGGeometryElement>svg.getElementsByClassName("hand")[0];
  const bubbleGroup = <SVGGElement>svg.getElementsByClassName("bubbles")[0];

  let currentX, currentY;
  let drawing = false;

  function startDrawSoapBubble(event) {
    drawing = true;
    drawSoapBubble(event);
  }
  function stopDrawSoapBubble(event) {
    drawing = false;
  }

  function drawSoapBubble(event: MouseEvent) {
    if (!drawing) return;
    currentX = event.clientX;
    currentY = event.clientY;
    const target = event.target as HTMLElement;
    if (target.closest) {
      const virus = target.closest(".virus");
      if (virus) {
        virus.classList.add("remove");
      }
    }
  }

  window.setInterval(() => {
    if (!drawing || !currentX) return;

    let pt = svg.createSVGPoint();
    pt.x = currentX;
    pt.y = currentY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());

    const isInHand = handPath.isPointInFill(pt);
    if (isInHand) {
      bubbleGroup.appendChild(
        makeBubble(pt.x, pt.y, Math.floor(Math.random() * 10) + 10)
      );
    }
  }, BUBBLE_REFRESH_DELAY);

  document.addEventListener("mousedown", startDrawSoapBubble);
  document.addEventListener("mousemove", drawSoapBubble);
  document.addEventListener("mouseup", stopDrawSoapBubble);
}

function makeSVG(tag: string, attrs: { [key: string]: any }) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (let k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

function makeBubble(cx: number, cy: number, r: number) {
  return makeSVG("circle", {
    r,
    cx,
    cy,
    fill: "aqua",
    mask: "url(#mask-light-bottom)",
  });
}
