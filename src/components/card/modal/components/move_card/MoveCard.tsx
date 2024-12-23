import { useContext, useEffect, useState } from "react";
import { IError } from "../../../../../types/status.type";

import "./MoveCard.scss";
import { ListsContext } from "../../../../../context/ListsContext";

import { VscClose } from "react-icons/vsc";
import { INewTheme } from "../../../../../types/styledComp";
import styled from "styled-components";
import {
  IkanbamContext,
  KanbamContext,
} from "../../../../../context/kanbamContext";
import {
  ICard,
  IListsContext,
  IListsWithCards,
} from "../../../../../types/kanbam";
import useUpdates from "../../../../../utils/api/useUpdates";

const MoveCardStyled = styled.div<INewTheme>`
  background-color: ${({ $themeList, $newtheme }) =>
    $themeList[$newtheme].bg["cardModal"]};
  border: 0.05rem solid
    ${({ $themeList, $newtheme }) => $themeList[$newtheme].border["secondary"]};

  .card-move__btn--close {
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["quaternary"]};
  }

  select {
    background-color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].bg["card"]};
    color: ${({ $themeList, $newtheme }) =>
      $themeList[$newtheme].font["quaternary"]};
  }

  .card-move__btn {
    button {
      background-color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].bg["buttonAccount"]};
      color: ${({ $themeList, $newtheme }) =>
        $themeList[$newtheme].font["tertiary"]};
    }
  }
`;

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
  const { updateCard } = useUpdates();
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const [position, setPosition] = useState("1");
  const [listTitle, setListTittle] = useState<string | null>(
    lists?.map((list) => list.title)[0] as string
  );
  const [cardPositions, setCardPositions] = useState<number[]>([]);

  const listArray = lists?.map((list) => list.title);
  const { theme, themeList } = useContext(KanbamContext) as IkanbamContext;

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
  }, [listTitle, lists, cardDetail.listId]);

  const handleMoveCard = async () => {
    const cardId = cardDetail.id!;

    const listIdToDrop = lists?.filter((list) => list.title == listTitle)[0]
      .id as string;
    cardDetail.listId = listIdToDrop;
    cardDetail.indexNumber = +position - 1;

    const updatedListsByMovingCard = (movedCard: ICard) => {
      const newLists = lists?.map((list) => {
        const filteredCards = list.cards?.filter((card) => card.id != cardId);
        list.cards = filteredCards;

        if (list.id == listIdToDrop) {
          if (+position > (list?.cards as ICard[]).length) {
            list?.cards?.push(movedCard);
          } else {
            list?.cards?.splice(+position - 1, 0, movedCard);
          }
        }

        return list;
      }) as IListsWithCards[];

      dispatch({
        type: "ADD_ALL_LISTS",
        payload: newLists,
      });
      localStorage.setItem("storedLists", JSON.stringify(newLists));
    };

    try {
      await updateCard(cardId, cardDetail);

      updatedListsByMovingCard(cardDetail);
    } catch (err) {
      const error = err as IError;
      console.log(`Error message: ${error.message}`);
    } finally {
      console.log("Card is moving to it's destination!");
      handleIsMovePressed(false);
    }
  };

  return (
    <MoveCardStyled
      $themeList={themeList}
      $newtheme={theme}
      className="card-move"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="card-move__btn--close button-close">
        <VscClose size={22} onClick={() => handleIsMovePressed(false)} />
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
      <div className="card-move__btn">
        <button onClick={handleMoveCard}>Move</button>
      </div>
    </MoveCardStyled>
  );
}
