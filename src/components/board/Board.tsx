/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import { handleSearchText } from "../../utils/order_and_update";

import { ListsContext } from "../../context/ListsContext";
import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import Lists from "../lists/Lists";
import { themes } from "../../utils/constantDatas/themes";
import styled from "styled-components";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { INewTheme } from "../../types/styledComp";
import useFetchAllListByBoardId from "../../hooks/useFetchAllListByBoardId";
import { IListsContext } from "../../types/kanbam";
import "./Board.scss";
import ErrorMessage from "../notifications/ErrorMessage";

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

const Board = () => {
  const [isListAdded, setIsListAdded] = useState<boolean>(false);
  const { dispatch, searchText } = useContext(ListsContext) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const { b_id } = useParams();

  const { data, loading, error } = useFetchAllListByBoardId(b_id!);

  //

  useEffect(() => {
    if (searchText) handleSearchText(searchText, dispatch);
  }, [searchText]);

  const isListAddedSetter = (value: boolean) => setIsListAdded(value);

  const newListCreator = isListAdded ? (
    <BoardNewListCreator
      isListAddedSetter={isListAddedSetter}
      boardId={b_id!}
    />
  ) : (
    <div className="board__btn--add" onClick={() => isListAddedSetter(true)}>
      <IoMdAdd size={20} />
      <p>Add another list</p>
    </div>
  );

  const listsToBeDisplayed = data?.map((list, index) => {
    return (
      <Lists
        key={list.id}
        boardId={list.boardId}
        id={list.id!}
        title={list.title}
        indexNumber={index}
        cards={list.cards!}
        isDragging={list.isDragging!}
        opacity={list.opacity!}
      />
    );
  });

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );

  return (
    <div className="board-container">
      <BoardStyled $newtheme={theme} className="board">
        {listsToBeDisplayed}
        {newListCreator}
      </BoardStyled>
    </div>
  );
};

export default Board;
