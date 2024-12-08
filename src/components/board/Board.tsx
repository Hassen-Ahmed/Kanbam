/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import {
  IList,
  IListsContext,
  IListsWithCards,
  IUserDecodedResult,
} from "../../types/kanbam";
import ErrorMessage from "../notifications/ErrorMessage";
import useSignalRConnection from "../../hooks/useSignalRConnection";
import "./Board.scss";
import { ITokenContext, TokenContext } from "../../context/TokenContext";
import { jwtDecode } from "jwt-decode";
import * as signalR from "@microsoft/signalr";
import { deepCopiedLists, updatedListsByListId } from "../lists/utilsForLists";

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
  const { tokenInCtx } = useContext(TokenContext) as ITokenContext;
  const [isListAdded, setIsListAdded] = useState<boolean>(false);
  const { lists, dispatch, searchText } = useContext(
    ListsContext
  ) as IListsContext;
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  const { b_id } = useParams();

  const { data, loading, error } = useFetchAllListByBoardId(b_id!);

  const listsRef = useRef(false);

  const configureOnConnections = useCallback(
    async (connection: signalR.HubConnection) => {
      let copyOfLists: IListsWithCards[] = deepCopiedLists(lists!);
      // create
      connection.on("ReceiveListCreated", (newList: IList) => {
        const createdList = { ...newList, cards: [] };

        copyOfLists = [...copyOfLists, createdList];

        dispatch({ type: "ADD_ALL_LISTS", payload: copyOfLists });

        localStorage.setItem("storedLists", JSON.stringify(copyOfLists));
      });
      // update
      connection.on(
        "ReceiveListUpdate",
        (updatedList: IList, userIdOfSender: string) => {
          if (!tokenInCtx) return;
          const { userId } = jwtDecode(tokenInCtx) as IUserDecodedResult;
          if (userIdOfSender == userId) return;

          copyOfLists = copyOfLists?.map((list) => {
            if (list.id != updatedList.id) return list;
            return { ...list, ...updatedList };
          });

          dispatch({ type: "ADD_ALL_LISTS", payload: copyOfLists });
          localStorage.setItem("storedLists", JSON.stringify(copyOfLists));
        }
      );
      // delete
      connection.on("ReceiveListDelete", (listId: string) => {
        const result = updatedListsByListId(copyOfLists!, listId);
        copyOfLists = result;

        dispatch({
          type: "ADD_ALL_LISTS",
          payload: result,
        });

        localStorage.setItem("storedLists", JSON.stringify(result));
      });
    },
    [listsRef.current]
  );

  // SignalR connections
  useSignalRConnection({
    url: `${import.meta.env.VITE_KANBAM_HUB_URL}/listHub?groupId=${b_id}`,
    configureOnConnections,
  });

  useEffect(() => {
    if (data) {
      listsRef.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (searchText) handleSearchText(searchText, dispatch);
  }, [searchText, dispatch]);

  //

  const isListAddedSetter = (value: boolean) => setIsListAdded(value);

  const renderLists = () => {
    return data?.map((list, index) => (
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
    ));
  };

  const renderNewListCreator = () => {
    return isListAdded ? (
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
  };

  // JSX

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );

  return (
    <div className="board-container">
      <BoardStyled $newtheme={theme} className="board">
        {renderLists()}
        {renderNewListCreator()}
      </BoardStyled>
    </div>
  );
};

export default Board;
