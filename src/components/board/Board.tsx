/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import { IListsContext, ListsContext } from "../../context/ListsContext";
import { createPortal } from "react-dom";
import Lists from "../lists/Lists";
import { fetchAllLists } from "../../utils/fetchAllLists";
import { isTokenAuthenticated } from "../../utils/jwtAuth";
import { useNavigate } from "react-router-dom";
import { IError } from "../../types/status.type";
import "./Board.scss";
import { handleSearchText } from "../../utils/order";
import { BoardType } from "../../types/board.type";

async function findAllLists() {
  try {
    const res = await fetchAllLists();
    return res;
  } catch (err) {
    const error = err as IError;
    console.log(error.message);
  }
}

const Board = () => {
  const { lists, dispatch, searchText } = useContext(
    ListsContext
  ) as IListsContext;
  const [isListAdded, setIsListAdded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    findAllLists().then((data) => {
      if (!isTokenAuthenticated() && data == undefined) {
        navigate("/");
      } else {
        dispatch({ type: "ADD_ALL_LISTS", payload: data as BoardType });
        // save res to localStorage for later we compare this storedLists/res to lists and for PUT request.
        localStorage.setItem("storedLists", JSON.stringify(data));
      }
    });
  }, []);

  useEffect(() => {
    if (searchText) handleSearchText(searchText, dispatch);
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

  const listsToBeDisplayed = lists?.map((list, index) => {
    return (
      <Lists
        key={list.id}
        id={list.id!}
        title={list.title}
        indexNumber={index}
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
};

export default Board;
