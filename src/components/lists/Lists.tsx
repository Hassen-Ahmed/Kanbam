import { useCallback, useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { VscClose } from "react-icons/vsc";

import { handleDragstartUtil, handleRemoveCloneElem } from "../../utils/dnd";
import { IError } from "../../types/status.type";
import { DragEventMy } from "../../types/html.type";

import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { ListsContext } from "../../context/ListsContext";
import {
  deepCopiedLists,
  updatedListOnCardHovered,
  updatedListOnDrop,
  updatedListOnEmptyList,
  updatedListOnListsSwaps,
} from "./utilsForLists";
import ListsMenu from "./ListsMenu";
import Card from "../card/Card";
import "./Lists.scss";
import { INewTheme } from "../../types/styledComp";
import styled from "styled-components";
import {
  ICard,
  ICardCreate,
  IComment,
  IListsContext,
  IListsWithCards,
  IUserDecodedResult,
} from "../../types/kanbam";
import useUpdates from "../../utils/api/useUpdates";
import usePosts from "../../utils/api/usePosts";
import { logger } from "../../utils/logger";
import useSignalRConnection from "../../hooks/useSignalRConnection";
import { ITokenContext, TokenContext } from "../../context/TokenContext";
import { jwtDecode } from "jwt-decode";

const ListsStyled = styled.div<INewTheme>`
  .lists {
    &--container--sub,
    &__add-card--container input,
    &__btn--add-container {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["lists"]};
    }

    &--container--sub,
    &__add-card--container input,
    &__heading--text input,
    &__btn--add-container,
    &-menu {
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["primary"]};
    }

    &__add-card--container .card-input--add-btns button {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["buttonAccount"]};
    }

    &__heading--btn,
    &__btn--add,
    &-menu__btns .lists-menu__btn {
      &:hover {
        background-color: ${({ $themeList, $newtheme }) =>
          $themeList[$newtheme].bg["hover"]};
      }
    }
  }
`;

const Lists = ({
  id,
  boardId,
  cards,
  title,
  indexNumber,
  isDragging,
  opacity,
}: IListsWithCards) => {
  const { tokenInCtx } = useContext(TokenContext) as ITokenContext;
  const { theme, themeList, itemDragging } = useContext(
    KanbamContext
  ) as IkanbamContext;
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const { postCard } = usePosts();
  const { updateList } = useUpdates();
  const [titleValueOfThisList, setTitleOfThisList] = useState<string>(title);
  const [titleValeuOfNewCard, setTitleValeuOfNewCard] = useState("");
  const [isListMenuVisible, setIsListMenuVisible] = useState(false);

  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);
  const [isNewCardInputVisible, setIsNewCardInputVisible] =
    useState<boolean>(false);

  const { userId } = jwtDecode(tokenInCtx!) as IUserDecodedResult;

  const configureOnConnections = useCallback(
    async (connection: signalR.HubConnection) => {
      let copyOfLists = deepCopiedLists(lists!);
      // create
      connection.on("ReceiveCardCreated", (newCard: ICard) => {
        copyOfLists = copyOfLists.map((list) => {
          if (list.id != id) return list;
          return { ...list, cards: [...list.cards, newCard] };
        });

        updateListsAndStoredLists(copyOfLists);
      });
      // create comment
      connection.on("ReceiveCardCommentCreated", (newCardComment: IComment) => {
        if (newCardComment.userId == userId) return;

        const updatedList = lists?.map((list) => {
          const updatedCards = list.cards.map((card) => {
            if (card.id != newCardComment.cardId) return card;
            return { ...card, comments: [newCardComment, ...card.comments] };
          });

          return { ...list, cards: updatedCards };
        });

        updateListsAndStoredLists(updatedList!);
      });
      // update
      connection.on(
        "ReceiveCardUpdate",
        (updatedCardReceived: ICard, userIdOfSender: string) => {
          if (!tokenInCtx) return;

          if (userIdOfSender == userId) return;

          copyOfLists = copyOfLists?.map((list) => {
            const updatedCards = list.cards.map((card) =>
              card.id != updatedCardReceived.id ? card : updatedCardReceived
            );

            return { ...list, cards: updatedCards };
          });

          updateListsAndStoredLists(copyOfLists);
        }
      );
      // delete
      connection.on("ReceiveCardDelete", (cardId: string) => {
        const modifiedLists = copyOfLists.map((list) => {
          if (list.id != id) return list;
          const updatedCards = list.cards.filter((card) => card.id != cardId);
          return { ...list, cards: updatedCards };
        });

        updateListsAndStoredLists(modifiedLists);
      });
      // delete comments
      connection.on(
        "ReceiveCardCommentDelete",
        (commentId: string, cardId: string, userIdOfSender: string) => {
          if (userIdOfSender == userId) return;

          const modifiedLists = copyOfLists.map((list) => {
            if (list.id != id) return list;

            const updatedCards = list.cards.map((card) => {
              if (card.id != cardId) return card;

              const filtredComments = card.comments.filter(
                (cm) => cm.id != commentId
              );

              return { ...card, comments: filtredComments };
            });

            return { ...list, cards: updatedCards };
          }) as IListsWithCards[];

          updateListsAndStoredLists(modifiedLists);
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lists]
  );

  // SignalR connections
  useSignalRConnection({
    url: `${import.meta.env.VITE_KANBAM_HUB_URL}/cardHub?groupId=${id}`,
    configureOnConnections,
  });

  useEffect(() => {
    setTitleOfThisList(title);
  }, [title]);

  const updateListsAndStoredLists = (payload: IListsWithCards[]) => {
    dispatch({
      type: "ADD_ALL_LISTS",
      payload,
    });

    localStorage.setItem("storedLists", JSON.stringify(payload));
  };
  // end of hooks

  const handleDragEnd = (ev: DragEventMy) => {
    // set dragging item opacity to 1
    const targetChildElemt = ev.currentTarget.childNodes[0] as HTMLElement;
    targetChildElemt.style.opacity = "1";

    handleRemoveCloneElem();
  };

  const handleDragenter = (ev: DragEventMy) => {
    const target = ev.target as HTMLElement;
    const parentTarget = target.parentNode as HTMLElement;

    const identityOfTarget = parentTarget.dataset.identity;
    const identityOfItemDragging = itemDragging?.current?.identity;
    const idOfTarget = parentTarget.dataset.id;
    const idOfItemDragging = itemDragging?.current?.item.id;

    if (identityOfItemDragging == "card") {
      // swapping the card position
      if (identityOfTarget == "card" && idOfItemDragging != idOfTarget) {
        const finalLists = updatedListOnCardHovered(
          lists!,
          id,
          idOfItemDragging!,
          idOfTarget!,
          itemDragging
        ) as IListsWithCards[];

        dispatch({
          type: "ADD_ALL_LISTS",
          payload: finalLists,
        });
        // don't set storedLists here, because in every drop event we need to compare lists and storedList.
      }

      // add/drop card to empty list
      if (!cards.length) {
        const finalLists = updatedListOnEmptyList(lists!, id, itemDragging);

        dispatch({
          type: "ADD_ALL_LISTS",
          payload: finalLists,
        });
        // don't set storedLists here, because in every drop event we need to compare lists and storedList.
      }
    }

    // swapping the Lists position
    if (
      identityOfItemDragging == "list" &&
      ev.currentTarget.dataset.id != idOfItemDragging
    ) {
      const item = itemDragging?.current?.item as IListsWithCards;

      const finalLists = updatedListOnListsSwaps(
        lists!,
        idOfItemDragging!,
        indexNumber,
        item,
        ev
      );

      dispatch({
        type: "ADD_ALL_LISTS",
        payload: finalLists,
      });
      // don't set storedLists here, because in every drop event we need to compare lists and storedList.
    }
  };

  const handleDragStart = (ev: DragEventMy) => {
    itemDragging.current = {
      item: {
        id,
        boardId,
        indexNumber,
        title,
        isDragging,
        cards,
        opacity: ".3",
      },
      identity: "list",
    };

    if (!(ev.target instanceof HTMLDivElement)) return;
    handleDragstartUtil(ev, "lists--container--sub");
    const chilCarddElem = ev.target.childNodes[0] as HTMLElement;
    chilCarddElem.style.opacity = ".3";
    chilCarddElem.style.outline = "none";
  };

  const handleDrop = () => {
    dispatch({ type: "ADD_ALL_LISTS", payload: updatedListOnDrop(lists!) });
    handleRemoveCloneElem();
  };

  const handleDragover = (ev: DragEventMy) => {
    ev.preventDefault();
  };

  const handleTitleInputClose = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") setIsTitleInputVisible(false);
  };

  const handleAddNewCard = async () => {
    if (titleValeuOfNewCard.length > 0) {
      try {
        const cardToPost: ICardCreate = {
          listId: id,
          title: titleValeuOfNewCard,
          indexNumber: cards.length,
          isDragging: false,
          opacity: "1",
        };

        await postCard(cardToPost);

        setIsNewCardInputVisible(false);
        setTitleValeuOfNewCard("");
      } catch (err) {
        const error = err as IError;
        logger("error", `Error on creating new card, err: ${error.message}`);
      }
    }
  };

  const handleCancelAddNewCard = () => {
    setTitleValeuOfNewCard("");
    setIsNewCardInputVisible(false);
  };

  const handleIsListMenuVisible = (value: boolean) =>
    setIsListMenuVisible(value);

  const handleListMenu = () => setIsListMenuVisible(true);

  const handleTitleUpdate = async () => {
    if (titleValueOfThisList.length) {
      const newList = {
        id,
        boardId: boardId,
        title: titleValueOfThisList,
        indexNumber,
      };

      try {
        await updateList(id, newList);
      } catch (err) {
        const error = err as IError;
        logger("error", `Error message: ${error.message}`);
      } finally {
        logger("info", "Send POST request for new list...");
        setIsTitleInputVisible(false);
      }
    }
  };

  const computedTitle =
    titleValueOfThisList?.length > 20
      ? titleValueOfThisList.slice(0, 16) + "..."
      : titleValueOfThisList;

  const listOfMenu = isListMenuVisible && (
    <ListsMenu
      handleIsListMenuVisible={handleIsListMenuVisible}
      id={id}
      boardId={boardId}
      setIsNewCardInputVisible={setIsNewCardInputVisible}
    />
  );

  const cardList = cards.map((content) => (
    <Card {...content} key={content.id} />
  ));

  // JSX

  return (
    <ListsStyled
      $themeList={themeList}
      $newtheme={theme}
      className="lists--container--main"
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
      onDragEnter={(ev) => handleDragenter(ev)}
      onTouchStart={(ev) => ev.preventDefault()}
      onDrop={() => handleDrop()}
      onDragOver={(e) => handleDragover(e)}
      onDragEnd={(ev) => handleDragEnd(ev)}
      data-id={id}
      data-identity="list"
      style={{ opacity: `${opacity}` }}
    >
      {listOfMenu}

      <div className="lists--container--sub">
        <div className="lists__heading">
          <div className="lists__heading--text">
            {!isTitleInputVisible ? (
              <p onClick={() => setIsTitleInputVisible(true)}>
                {computedTitle}
              </p>
            ) : (
              <input
                type="text"
                value={titleValueOfThisList}
                onKeyDown={(ev) => handleTitleInputClose(ev)}
                autoFocus
                spellCheck="false"
                onBlur={handleTitleUpdate}
                onChange={(e) => {
                  setTitleOfThisList(e.target.value);
                }}
              />
            )}
          </div>
          <div className="lists__heading--btn" onClick={handleListMenu}>
            <BsThreeDots />
          </div>
        </div>
        <div className="lists">
          {cardList}

          <div className="lists__add-card--container">
            {isNewCardInputVisible ? (
              <div className="lists__add-card--input">
                <input
                  type="text"
                  placeholder="Enter a title for new card..."
                  value={titleValeuOfNewCard}
                  onChange={(e) => setTitleValeuOfNewCard(e.target.value)}
                  autoFocus
                />
                <div className="card-input--add-btns">
                  <button onClick={handleAddNewCard}>Add card</button>
                  <div className="close-btn" onClick={handleCancelAddNewCard}>
                    <VscClose size={20} />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="lists__btn--add-container"
                onClick={() => setIsNewCardInputVisible(true)}
              >
                <div className="lists__btn--add">
                  <IoMdAdd size={20} />
                  <p>Add a Card</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ListsStyled>
  );
};

export default Lists;
