import { ICard } from "../../types/lists.type";
import { DragEventMy } from "../../types/html.type";
import "./Card.scss";
import { handleDragstartUtil } from "../../utils/dnd";

interface ICardExtended extends ICard {
  itemDragging: React.MutableRefObject<ICard | null>;
}

const Card = ({
  id,
  title,
  listId,
  isDragging,
  indexNumber,
  itemDragging,
}: ICardExtended) => {
  const handleDragStart = (ev: DragEventMy) => {
    itemDragging.current = {
      id,
      listId,
      indexNumber,
      title,
      isDragging,
    };

    if (!(ev.target instanceof HTMLDivElement)) return;
    handleDragstartUtil(ev, "card");
  };

  return (
    <div
      className="card-container"
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
      data-id={id}
      data-identity="card"
    >
      <div className="card">
        <div className="card__heading">
          <h2>{title} </h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
