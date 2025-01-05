/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import { handleSearchText } from "../../utils/order_and_update";

import BoardNewListCreator from "./BoardNewListCreator";
import Loading from "../notifications/Loading";
import Lists from "../lists/Lists";
import styled from "styled-components";
import { INewTheme } from "../../types/styledComp";
import useFetchAllListByBoardId from "../../hooks/useFetchAllListByBoardId";
import { IList, IListsWithCards, IUserDecodedResult } from "../../types/kanbam";
import ErrorMessage from "../notifications/ErrorMessage";
import useSignalRConnection from "../../hooks/useSignalRConnection";
import "./Board.scss";
import { jwtDecode } from "jwt-decode";
import * as signalR from "@microsoft/signalr";
import { deepCopiedLists, updatedListsByListId } from "../lists/utilsForLists";
import { useAppDispath, useAppSelector } from "../../features/hooks";
import { addAllList } from "../../features/slices/listsSlice";

const BoardStyled = styled.div<INewTheme>`
  .board {
    &__btn--add {
      &:hover {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["hover"]};
      }

      background-color: ${({ $newtheme }) =>
        $newtheme == "dark" ? "#00000033" : "#ffffff33"};
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["secondary"]};
    }

    &__new-list {
      &,
      &--input input {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["card"]};
        color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].font["secondary"]};
      }
    }
  }
`;

const Board = () => {
  const dispatchRdx = useAppDispath();
  const { accessToken } = useAppSelector((state) => state.auth);
  const lists = useAppSelector((state) => state.lists.lists);
  const searchText = useAppSelector((state) => state.kanbam.searchText);
  const [isListAdded, setIsListAdded] = useState<boolean>(false);
  const { themeName, themeList } = useAppSelector((state) => state.theme);

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

        dispatchRdx(addAllList(copyOfLists));
        localStorage.setItem("storedLists", JSON.stringify(copyOfLists));
      });
      // update
      connection.on(
        "ReceiveListUpdate",
        (updatedList: IList, userIdOfSender: string) => {
          if (!accessToken) return;
          const { userId } = jwtDecode(accessToken) as IUserDecodedResult;
          if (userIdOfSender == userId) return;

          copyOfLists = copyOfLists?.map((list) => {
            if (list.id != updatedList.id) return list;
            return { ...list, ...updatedList };
          });

          dispatchRdx(addAllList(copyOfLists));

          localStorage.setItem("storedLists", JSON.stringify(copyOfLists));
        }
      );
      // delete
      connection.on("ReceiveListDelete", (listId: string) => {
        const result = updatedListsByListId(copyOfLists!, listId);
        copyOfLists = result;

        dispatchRdx(addAllList(result));

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
    if (searchText) {
      handleSearchText(searchText, dispatchRdx);
    }
  }, [searchText]);

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

  if (loading) return <Loading />;

  if (error)
    return (
      <ErrorMessage message={error.message} statusCode={error.statusCode} />
    );

  return (
    <div className="board-container">
      <BoardStyled
        $themeList={themeList}
        $newtheme={themeName}
        className="board"
      >
        {renderLists()}
        {renderNewListCreator()}
      </BoardStyled>
    </div>
  );
};

export default Board;
