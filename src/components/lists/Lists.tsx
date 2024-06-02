import { ICard, IList, Cards, IListsContext } from "../../types/board.type";
import { BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { useContext, useState } from "react";
import { handleDragstartUtil, handleRemovingCloneElem } from "../../utils/dnd";
import { DragEventMy } from "../../types/html.type";
import { postCard } from "../../utils/api/posts";
import { ListsContext } from "../../context/ListsContext";
import { IkanbamContext, KanbamContext } from "../../context/kanbamContext";
import { BoardType } from "../../types/board.type";
import Card from "../card/Card";
import "./Lists.scss";
import ListsMenu from "./ListsMenu";
import { IError } from "../../types/status.type";
import { updateList } from "../../utils/api/updates";

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

  const [isTitleInputVisible, setIsTitleInputVisible] =
    useState<boolean>(false);
  const [isNewCardInputVisible, setIsNewCardInputVisible] =
    useState<boolean>(false);
  const [isListMenuVisible, setIsListMenuVisible] = useState(false);

  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const { itemDragging } = useContext(KanbamContext) as IkanbamContext;

  // end of hooks

  const handleDragEnd = (ev: DragEventMy) => {
    // set dragging item opacity to 1
    const targetChildElemt = ev.currentTarget.childNodes[0] as HTMLElement;
    targetChildElemt.style.opacity = "1";

    // remove cloneElem from body
    handleRemovingCloneElem();
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
        // find Only cards of cards of this lists or column
        const filteredList = lists?.filter(
          (cards) => cards.id == id
        ) as IList[];

        let listOfCards = filteredList[0].cards as Cards;

        let indexOfTargetCard = 0;

        for (let i = 0; i < listOfCards.length; i++) {
          if (listOfCards[i].id == idOfTarget) {
            indexOfTargetCard = i;
            break;
          }
        }

        listOfCards = listOfCards.filter((card) => card.id != idOfItemDragging);

        const item = itemDragging.current?.item as ICard;

        listOfCards.splice(indexOfTargetCard, 0, item);

        const updatedLists = lists?.map((listObj) => {
          if (listObj.id == id) {
            const cardsUpdatedWithListId = listOfCards.map((card) => {
              if (card.listId === undefined) return card;
              card.listId = listObj.id!;
              return card;
            });

            return {
              ...listObj,
              cards: cardsUpdatedWithListId,
            };
          } else {
            const updatedListOfCards = listObj.cards
              ?.filter((card) => card.id != idOfItemDragging)
              .map((card, i) => {
                card.indexNumber = i;
                return card;
              });

            return {
              ...listObj,
              cards: updatedListOfCards,
            };
          }
        }) as BoardType;

        // update indexNumber of this cards/column
        const finalLists = updatedLists.map((listObj) => {
          if (listObj.id != id) return listObj;

          const updatedList = listObj.cards?.map((card, i) => {
            card.indexNumber = i;
            return card;
          });

          return { ...listObj, cards: updatedList };
        });

        dispatch({ type: "ADD_ALL_LISTS", payload: finalLists as BoardType });
        // don't set storedLists here, because in every drop event we need to compare lists and storedList.
      }

      // add/drop card to empty list
      if (!cards.length) {
        const updatedLists = lists?.map((listObj) => {
          if (listObj.id == id) {
            const cardUpdatedWithListId = {
              ...itemDragging.current?.item,
              listId: listObj.id,
              opacity: "1",
            };

            return {
              ...listObj,
              cards: [cardUpdatedWithListId],
            };
          }

          const filteredListOfCards =
            listObj.cards &&
            listObj.cards.filter(
              (card) => card.id != itemDragging.current?.item.id
            );

          return { ...listObj, cards: filteredListOfCards };
        });

        dispatch({ type: "ADD_ALL_LISTS", payload: updatedLists as BoardType });
        // don't set storedLists here, because in every drop event we need to compare lists and storedList.
      }
    }

    if (
      identityOfItemDragging == "list" &&
      ev.currentTarget.dataset.id != idOfItemDragging
    ) {
      const item = itemDragging?.current?.item as IList;

      const filteredLists = lists?.filter(
        (listObj) => listObj.id != idOfItemDragging
      ) as BoardType;

      let indexOfTargetListObj;

      for (let i = 0; i < filteredLists.length; i++) {
        if (filteredLists[i].id == ev.currentTarget.dataset.id) {
          indexOfTargetListObj = i;
          break;
        }
      }

      const skipingValue = item.indexNumber! > indexNumber! ? 0 : 1;

      filteredLists.splice(
        (indexOfTargetListObj as number) + skipingValue,
        0,
        item
      );

      // update indexNumber of this lists
      const finalLists = filteredLists.map((listObj, i) => {
        listObj.indexNumber = i;

        return listObj;
      });

      dispatch({ type: "ADD_ALL_LISTS", payload: finalLists });
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
    const updatedLists = lists?.map((listObj) => {
      listObj.opacity = "1";

      const updatedList = listObj.cards?.map((card) => {
        card.opacity = "1";
        return card;
      });

      return { ...listObj, cards: updatedList };
    });

    dispatch({ type: "ADD_ALL_LISTS", payload: updatedLists as BoardType });

    // remove cloneElem from body
    handleRemovingCloneElem();
  };

  const handleDragover = (ev: DragEventMy) => {
    ev.preventDefault();
  };

  const handleTitleInputClose = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") {
      setIsTitleInputVisible(false);
    }
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

  const handleIsListMenuVisible = (value: boolean) => {
    setIsListMenuVisible(value);
  };

  const handleListMenu = () => {
    setIsListMenuVisible(true);
  };

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
      {isListMenuVisible && (
        <ListsMenu
          handleIsListMenuVisible={handleIsListMenuVisible}
          id={id}
          setIsNewCardInputVisible={setIsNewCardInputVisible}
        />
      )}

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
          {cards.map((content) => {
            return <Card {...content} key={content.id} />;
          })}

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
