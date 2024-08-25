/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import { fetchAllLists } from "../../utils/fetchAllLists";
import { isTokenAuthenticated } from "../../utils/jwtAuth";
import { handleSearchText } from "../../utils/order_and_update";
import { BoardType, IListsContext } from "../../types/board.type";
import { IError } from "../../types/status.type";

import { ListsContext } from "../../context/ListsContext";
import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import Lists from "../lists/Lists";
import "./Board.scss";
import { themes } from "../../utils/constantDatas/themes";
import styled from "styled-components";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { INewTheme } from "../../types/styledComp";

const BoardStyled = styled.div<INewTheme>`
  .board {
    &__btn--add {
      &:hover {
        background-color: ${({ $newtheme }) => themes[$newtheme].bg["hover"]};
      }

      background-color: ${({ $newtheme }) =>
        $newtheme == "dark" ? "#00000033" : "#ffffff33"};
      color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
    }

    &__new-list {
      &,
      &--input input {
        background-color: ${({ $newtheme }) => themes[$newtheme].bg["card"]};
        color: ${({ $newtheme }) => themes[$newtheme].font["secondary"]};
      }
    }
  }
`;

async function findAllLists() {
  try {
    return await fetchAllLists();
  } catch (err) {
    const error = err as IError;
    console.log(error.message);
  }
}

const Board = () => {
  const [isListAdded, setIsListAdded] = useState<boolean>(false);
  const { lists, dispatch, searchText } = useContext(
    ListsContext
  ) as IListsContext;
  const navigate = useNavigate();
  const { theme2 } = useContext(KanbamContext) as IkanbamContext;

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
        <BoardStyled $newtheme={theme2} className="board">
          {listsToBeDisplayed}
          {newListCreator}
        </BoardStyled>
      </div>
    );

  return (
    <>
      <div className="board-container ">
        {createPortal(
          <div className="board__loading">
            <Loading />
          </div>,
          document.body
        )}
      </div>
    </>
  );
};

export default Board;
