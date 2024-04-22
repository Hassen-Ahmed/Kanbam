import { memo, useContext, useRef, useState } from "react";
import Lists from "../lists/Lists";
import { ICard } from "../../types/lists.type";
import { IoMdAdd } from "react-icons/io";

import "./Board.scss";
import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { createPortal } from "react-dom";

const Board = memo(() => {
  const itemDragging = useRef<ICard | null>(null);
  const { lists } = useContext(ListsContext) as IListsContext;
  const [isListAdded, setIsListAdded] = useState<boolean>(false);

  const isListAddedSetter = (value: boolean) => {
    setIsListAdded(value);
  };

  const newListCreator = isListAdded ? (
    <BoardNewListCreator isListAddedSetter={isListAddedSetter} />
  ) : (
    <div className="board__btn--add" onClick={() => isListAddedSetter(true)}>
      <IoMdAdd size={20} />
      <p>Add another list</p>
    </div>
  );

  const listsToBeDisplayed = lists?.map((list) => {
    return (
      <Lists
        key={list.id}
        id={list.id!}
        title={list.title}
        indexNumber={list.indexNumber!}
        itemDragging={itemDragging}
        list={list.list!}
      />
    );
  });

  return (
    <div className="board-container">
      {lists?.length ? (
        <div className="board">
          {listsToBeDisplayed}
          {newListCreator}
        </div>
      ) : (
        createPortal(
          <div className="board__loading">
            <Loading />
          </div>,
          document.body
        )
      )}
    </div>
  );
});

export default Board;
