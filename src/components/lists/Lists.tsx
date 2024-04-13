import Card from "../card/Card";
import { ICard, ListType } from "../../types/lists.type";
import { BoardType } from "../../types/board.type";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";

import "./Lists.scss";
import { useState } from "react";
import { handleDragstartUtil } from "../../utils/dnd";
import { DragEventMy } from "../../types/html.type";

interface IListLocal {
  list: ListType;
  setLists: React.Dispatch<React.SetStateAction<BoardType>>;
  idOfList: number;
  title: string;
  id: number;
  itemDragging: React.MutableRefObject<ICard | null>;
}

const Lists = ({ id, list, title, itemDragging }: IListLocal) => {
  const [titleValue, setTitleValue] = useState<string>(title);
  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);

  // const itemDragging = useRef<ICard | null>(null);

  const handleTitleInputClose = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") {
      setIsTitleInputVisible(false);
    }
  };

  const handleDragStart = (ev: DragEventMy) => {
    if (!(ev.target instanceof HTMLDivElement)) return;
    handleDragstartUtil(ev, "lists--container--sub");
  };

  const handleDragenter = () => {
    // console.log(ev.target);
    console.log(itemDragging.current);
  };

  return (
    <div
      className="lists--container--main"
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
      onDragEnter={() => handleDragenter()}
      data-id={id}
      data-identity="lists"
    >
      <div className="lists--container--sub">
        <h1 className="lists__heading">
          <div className="lists__heading--text">
            {!isTitleInputVisible ? (
              <p onClick={() => setIsTitleInputVisible(true)}>{titleValue}</p>
            ) : (
              <input
                type="text"
                value={titleValue}
                onKeyDown={(ev) => handleTitleInputClose(ev)}
                autoFocus
                spellCheck="false"
                onBlur={() => setIsTitleInputVisible(false)}
                onChange={(e) => {
                  setTitleValue(e.target.value);
                }}
              />
            )}
          </div>
          <div className="lists__heading--btn">
            <BsThreeDots />
          </div>
        </h1>
        <div className="lists">
          {list.map((content) => {
            return (
              <Card {...content} key={content.id} itemDragging={itemDragging} />
            );
          })}
          <div className="lists__btn--add">
            <IoMdAdd size={20} />
            <p>Add a Card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
