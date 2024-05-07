/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { createPortal } from "react-dom";
import Lists from "../lists/Lists";
import { fetchAllLists } from "../../utils/fetchAllLists";
import { IActionBoard } from "../../types/actions.type";
import { isTokenAuthenticated } from "../../utils/jwtAuth";
import { useNavigate } from "react-router-dom";
import { IError } from "../../types/status.type";
import "./Board.scss";
import { handleSearchText } from "../../utils/order";

async function findAllLists(dispatch: React.Dispatch<IActionBoard>) {
  try {
    const res = await fetchAllLists({ dispatch });
    return res;
  } catch (err) {
    const error = err as IError;
    console.log(error.message);
  }
}

const Board = memo(() => {
  const { lists, dispatch, searchText } = useContext(
    ListsContext
  ) as IListsContext;
  const [isListAdded, setIsListAdded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    findAllLists(dispatch).then((data) => {
      if (!isTokenAuthenticated() && data == undefined) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    handleSearchText(searchText, dispatch);
  }, [searchText]);

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
        cards={list.cards!}
        isDragging={list.isDragging!}
        opacity={list.opacity!}
      />
    );
  });

  if (lists)
    return (
      <div className="board-container">
        <div className="board">
          {listsToBeDisplayed}
          {newListCreator}
        </div>
      </div>
    );

  return (
    <div className="board-container">
      {createPortal(
        <div className="board__loading">
          <Loading />
        </div>,
        document.body
      )}
    </div>
  );
});

export default Board;
