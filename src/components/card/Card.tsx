import { ICard } from "../../types/board.type";
import { DragEventMy } from "../../types/html.type";
import "./Card.scss";
import { handleDragstartUtil, handleRemovingCloneElem } from "../../utils/dnd";
// import { createPortal } from "react-dom";
import { useContext } from "react";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";

interface ICardExtended extends ICard {}

const Card = ({
  id,
  title,
  listId,
  isDragging,
  indexNumber,
  opacity,
}: ICardExtended) => {
  const { handleModalCardId } = useContext(KanbamContext) as IkanbamContext;
  const { itemDragging } = useContext(KanbamContext) as IkanbamContext;

  const handleDragEnd = (ev: DragEventMy) => {
    ev.stopPropagation();

    // set dragging item opacity to 1
    const targetChildElemt = ev.currentTarget.childNodes[0] as HTMLElement;
    targetChildElemt.style.opacity = "1";

    // remove cloneElem from body
    handleRemovingCloneElem();
  };

  const handleDrop = () => {};

  const handleDragStart = (ev: DragEventMy) => {
    ev.stopPropagation();

    itemDragging.current = {
      item: {
        id,
        listId,
        indexNumber,
        title,
        isDragging,
        opacity: ".3",
      },
      identity: "card",
    };

    if (!(ev.target instanceof HTMLDivElement)) return;
    handleDragstartUtil(ev, "card");
    const chilCarddElem = ev.target.childNodes[0] as HTMLElement;

    chilCarddElem.style.opacity = ".3";
    chilCarddElem.style.outline = "none";
  };

  return (
    <div
      className="card-container"
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
      onDrop={() => handleDrop()}
      onDragEnd={(ev) => handleDragEnd(ev)}
      data-id={id}
      data-identity="card"
      data-index={indexNumber}
    >
      <div
        className="card"
        onClick={() => handleModalCardId(id!, title)}
        style={{ opacity: `${opacity}` }}
      >
        <div className="card__heading">
          <h2>{title} </h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
