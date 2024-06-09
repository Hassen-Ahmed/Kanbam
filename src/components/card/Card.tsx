import { useContext, useState } from "react";

import { BsTextParagraph } from "react-icons/bs";

import { priorities } from "../../utils/constantDatas/priorities";
import { handleDragstartUtil, handleRemoveCloneElem } from "../../utils/dnd";
import { DragEventMy } from "../../types/html.type";
import { ICard } from "../../types/board.type";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import CardModal from "./modal/CardModal";
import "./Card.scss";

const Card = ({ ...props }: ICard) => {
  const { itemDragging } = useContext(KanbamContext) as IkanbamContext;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardDetail] = useState<ICard>(props);

  // end of hooks

  const bgColor = cardDetail.priority
    ? `${
        priorities.filter(
          (priorityObj) => priorityObj.name === props.priority
        )[0].color
      }`
    : "#00000033";

  const handleModlaVisibility = (value: boolean) => setIsModalVisible(value);

  const handleDragEnd = (ev: DragEventMy) => {
    ev.stopPropagation();

    // set dragging item opacity to 1
    const targetChildElemt = ev.currentTarget.childNodes[0] as HTMLElement;
    targetChildElemt.style.opacity = "1";

    // remove cloneElem from body
    handleRemoveCloneElem();
  };

  const handleDragStart = (ev: DragEventMy) => {
    ev.stopPropagation();

    itemDragging.current = {
      item: {
        ...props,
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

  const displayCardModal = isModalVisible && (
    <CardModal
      cardDetail={cardDetail}
      handleModlaVisibility={handleModlaVisibility}
    />
  );

  const displayDescriptionIcon = cardDetail.description && (
    <div className="discription-icon">
      <BsTextParagraph size={15} />
    </div>
  );

  const displayPriorityColor = cardDetail.priority && (
    <div className="priority" style={{ backgroundColor: bgColor }}></div>
  );

  return (
    <div
      className="card-container"
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
      onDragEnd={(ev) => handleDragEnd(ev)}
      onTouchStart={(ev) => ev.preventDefault()}
      data-id={props.id}
      data-identity="card"
      data-index={props.indexNumber}
    >
      {displayCardModal}

      <div
        className="card"
        onClick={() => setIsModalVisible(true)}
        style={{ opacity: `${props.opacity}` }}
      >
        {displayPriorityColor}

        <div className="card__heading">
          <h2>{props.title} </h2>
        </div>

        {displayDescriptionIcon}
      </div>
    </div>
  );
};

export default Card;
