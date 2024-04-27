import { memo, useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { createPortal } from "react-dom";
import Lists from "../lists/Lists";
import "./Board.scss";

const Board = memo(() => {
  const { lists } = useContext(ListsContext) as IListsContext;
  const [isListAdded, setIsListAdded] = useState<boolean>(false);

  // end of hooks!

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
        list={list.list!}
        isDragging={list.isDragging!}
        opacity={list.opacity!}
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
