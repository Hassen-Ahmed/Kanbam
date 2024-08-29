import { useContext, useEffect, useState } from "react";
import { IError } from "../../../../../types/status.type";

import "./MoveCard.scss";
import { ListsContext } from "../../../../../context/ListsContext";
import {
  BoardType,
  Cards,
  ICard,
  IListsContext,
} from "../../../../../types/board.type";
import { updateCard } from "../../../../../utils/api/updates";
import { VscClose } from "react-icons/vsc";

interface IMoveCard {
  isVisible: boolean;
  cardDetail: ICard;
  handleIsMovePressed: (status: boolean) => void;
}

export default function MoveCard({
  isVisible,
  cardDetail,
  handleIsMovePressed,
}: IMoveCard) {
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const [position, setPosition] = useState("1");
  const [listTitle, setListTittle] = useState<string | null>(
    lists?.map((list) => list.title)[0] as string
  );
  const [cardPositions, setCardPositions] = useState<number[]>([]);

  const listArray = lists?.map((list) => list.title);

  useEffect(() => {
    const positions = lists
      ?.filter((list) => list.title == listTitle)[0]
      ?.cards?.map((_, i) => i + 1) as number[];

    const selectedListId = lists?.filter((list) => list.title == listTitle)[0]
      .id;

    if (selectedListId != cardDetail.listId) {
      positions.push(positions.length + 1);
    }

    setCardPositions(positions);
  }, [listTitle]);

  const handleMoveCard = async () => {
    const cardId = cardDetail.id!;
    const token = localStorage.getItem("token")!;

    const listIdToDrop = lists?.filter((list) => list.title == listTitle)[0]
      .id as string;
    cardDetail.listId = listIdToDrop;
    cardDetail.indexNumber = +position - 1;

    const updatedListsByMovingCard = (movedCard: ICard) => {
      const newLists = lists?.map((list) => {
        const filteredCards = list.cards?.filter((card) => card.id != cardId);
        list.cards = filteredCards;

        if (list.id == listIdToDrop) {
          if (+position > (list?.cards as Cards).length) {
            list?.cards?.push(movedCard);
          } else {
            list?.cards?.splice(+position - 1, 0, movedCard);
          }
        }

        return list;
      }) as BoardType;

      dispatch({
        type: "ADD_ALL_LISTS",
        payload: newLists,
      });
      localStorage.setItem("storedLists", JSON.stringify(newLists));
    };

    try {
      const responseCard = await updateCard(cardId, cardDetail, token);
      updatedListsByMovingCard(responseCard);
    } catch (err) {
      const error = err as IError;
      console.log(`Error message: ${error.message}`);
    } finally {
      console.log("Card is moving to it's destination!");
      handleIsMovePressed(false);
    }
  };

  return (
    <div
      className="card-move"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div
        className="card-move__btn--close button-close"
        onClick={() => handleIsMovePressed(false)}
      >
        <VscClose size={32} />
      </div>
      <h2 className="card-move__heading">Move card</h2>
      <div className="body">
        <div className="body__left ">
          <p>List</p>
          <select
            name="list"
            id="list"
            onChange={(ev) => setListTittle(ev.target.value)}
          >
            {listArray?.map((listName) => {
              return (
                <option value={listName} key={listName}>
                  {listName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="body__right ">
          <p>Position</p>
          <select
            name="position"
            id="position"
            onChange={(ev) => setPosition(ev.target.value)}
          >
            {cardPositions.map((position) => {
              return (
                <option value={position} key={position}>
                  {position}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="card-move__btn" onClick={handleMoveCard}>
        <button>Move</button>
      </div>
    </div>
  );
}
