import { IItemDragging } from "../../context/kanbamContext";
import { BoardType, Cards, ICard, IList } from "../../types/board.type";
import { DragEventMy } from "../../types/html.type";

const deepCopiedLists = (lists: BoardType) => {
  return JSON.parse(JSON.stringify(lists)) as BoardType;
};

export const updatedListOnCardHovered = (
  lists: BoardType,
  id: string,
  idOfItemDragging: string,
  idOfTarget: string,
  itemDragging: React.MutableRefObject<IItemDragging | null>
) => {
  const clonedLists = deepCopiedLists(lists);

  // find Only cards of cards of this lists or column
  const filteredList = clonedLists?.filter(
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

  const updatedLists = clonedLists.map((listObj) => {
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
  });

  // update indexNumber of this cards/column
  const finalLists = updatedLists.map((listObj) => {
    if (listObj.id != id) return listObj;

    const updatedList = listObj.cards?.map((card, i) => {
      card.indexNumber = i;
      return card;
    });

    return { ...listObj, cards: updatedList };
  });

  return finalLists as BoardType;
};

export const updatedListOnEmptyList = (
  lists: BoardType,
  id: string,
  itemDragging: React.MutableRefObject<IItemDragging | null>
) => {
  const updatedLists = deepCopiedLists(lists)?.map((listObj) => {
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
      listObj.cards.filter((card) => card.id != itemDragging.current?.item.id);

    return { ...listObj, cards: filteredListOfCards };
  });

  return updatedLists as BoardType;
};

export const updatedListOnListsSwaps = (
  lists: BoardType,
  idOfItemDragging: string,
  indexNumber: number,
  item: IList,
  ev: DragEventMy
) => {
  const filteredLists = deepCopiedLists(lists)?.filter(
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

  return finalLists;
};

export const updatedListOnDrop = (lists: BoardType) => {
  const updatedLists = deepCopiedLists(lists).map((listObj) => {
    listObj.opacity = "1";

    const updatedList = listObj.cards?.map((card) => {
      card.opacity = "1";
      return card;
    });

    return { ...listObj, cards: updatedList };
  });

  return updatedLists as BoardType;
};

export const updatedListByListId = (lists: BoardType, listId: string) => {
  const updatedLists = deepCopiedLists(lists)
    .filter((listObj) => listObj.id != listId)
    .map((listObj, index) => {
      listObj.indexNumber = index;
      return listObj;
    });

  return updatedLists as BoardType;
};
