import { DragEventMy } from "../types/html.type";

export const handleDragstartUtil = (
  event: DragEventMy,
  innerElemClass: string
) => {
  if (!(event.target instanceof HTMLDivElement)) return;

  const cloneElem = event.target.cloneNode(true) as HTMLElement;

  cloneElem.style.position = "absolute";
  cloneElem.style.top = "0";
  cloneElem.style.left = "-1000px";
  cloneElem.style.width = "30rem";
  cloneElem.style.opacity = "0.9";
  cloneElem.style.boxShadow = "none";
  cloneElem.style.backgroundColor = "transparent";

  const inner = cloneElem.getElementsByClassName(
    innerElemClass
  )[0] as HTMLElement;

  if (inner != undefined) {
    inner.style.position = "absolute";
    inner.style.top = "0";
    inner.style.left = "0";
    inner.style.transform = "rotate(7deg)";
    inner.style.width = "27rem";
    inner.style.border = "0.2rem dashed grey";
    document.body.appendChild(cloneElem);
    event.dataTransfer.setDragImage(cloneElem, 80, 20);
  }

  event.target.addEventListener("drag", (ev) => {
    const board = document.getElementsByClassName("board")[0] as HTMLElement;

    if (ev.clientX >= 1300) {
      board.scrollLeft += 30;
    } else if (ev.clientX <= 150) {
      board.scrollLeft -= 30;
    }
  });
};
