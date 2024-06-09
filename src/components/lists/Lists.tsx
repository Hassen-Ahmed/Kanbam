import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { VscClose } from "react-icons/vsc";

import { handleDragstartUtil, handleRemoveCloneElem } from "../../utils/dnd";
import { updateList } from "../../utils/api/updates";
import { postCard } from "../../utils/api/posts";
import { IError } from "../../types/status.type";
import { DragEventMy } from "../../types/html.type";
import { BoardType } from "../../types/board.type";
import { ICard, IList, Cards, IListsContext } from "../../types/board.type";

import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { ListsContext } from "../../context/ListsContext";
import {
  updatedListOnCardHovered,
  updatedListOnDrop,
  updatedListOnEmptyList,
  updatedListOnListsSwaps,
} from "./UtilsForLists";
import ListsMenu from "./ListsMenu";
import Card from "../card/Card";
import "./Lists.scss";

interface IListLocal {
  id: string;
  indexNumber: number;
  title: string;
  cards: Cards;
  isDragging: boolean;
  opacity: string;
}

const Lists = ({
  id,
  cards,
  title,
  indexNumber,
  isDragging,
  opacity,
}: IListLocal) => {
  const [titleValueOfThisList, setTitleOfThisList] = useState<string>(title);
  const [titleValeuOfNewCard, setTitleValeuOfNewCard] = useState("");
  const [isListMenuVisible, setIsListMenuVisible] = useState(false);

  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);
  const [isNewCardInputVisible, setIsNewCardInputVisible] =
    useState<boolean>(false);

  const { itemDragging } = useContext(KanbamContext) as IkanbamContext;
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;

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
        ) as BoardType;

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
      const item = itemDragging?.current?.item as IList;

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
        const cardToPost: ICard = {
          listId: id,
          title: titleValeuOfNewCard,
          indexNumber: cards.length,
          isDragging: false,
          opacity: "1",
        };

        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await postCard(cardToPost, token);
        const updatedListObj = {
          id,
          title,
          indexNumber,
          cards: [...cards, data],
          isDragging,
          opacity,
        };

        const updatedLists = lists?.map((listObj) => {
          if (listObj.id != id) return listObj;
          return updatedListObj;
        });

        dispatch({ type: "ADD_ALL_LISTS", payload: updatedLists as BoardType });
        localStorage.setItem("storedLists", JSON.stringify(updatedLists));

        setIsNewCardInputVisible(false);
        setTitleValeuOfNewCard("");
      } catch (err) {
        const error = err as IError;
        console.log("Error on creating new card, err:", error.message);
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
    const token = localStorage.getItem("token");
    if (!token) return;
    if (titleValueOfThisList.length) {
      const newList = {
        id,
        title: titleValueOfThisList,
        indexNumber,
      };

      try {
        await updateList(id, newList, token);
      } catch (err) {
        const error = err as IError;
        console.log(`Error message: ${error.message}`);
      } finally {
        console.log("Send POST request for new list...");
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
      setIsNewCardInputVisible={setIsNewCardInputVisible}
    />
  );

  const cardList = cards.map((content) => (
    <Card {...content} key={content.id} />
  ));

  // JSX

  return (
    <div
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
    </div>
  );
};

export default Lists;
