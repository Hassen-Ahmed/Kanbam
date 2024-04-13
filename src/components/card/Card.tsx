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
  description,
  isDragging,
  itemDragging,
}: ICardExtended) => {
  const handleDragStart = (ev: DragEventMy) => {
    itemDragging.current = {
      id,
      title,
      description,
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
          <h2>{title} someting else.</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
