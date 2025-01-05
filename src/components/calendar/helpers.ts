/* eslint-disable @typescript-eslint/no-explicit-any */
import { addAllList } from "../../features/slices/listsSlice";
import { IListsWithCards, ICard, ICardCreate } from "../../types/kanbam";
import { IError } from "../../types/status.type";

export const createNewTask = async (
  dispatchRdx: any,
  lists: IListsWithCards[],
  newTask: ICardCreate,
  postCard: (newCard: ICardCreate) => Promise<ICard>
) => {
  try {
    const res = (await postCard(newTask)) as ICard;
    const updatedLists = lists?.map((list) => {
      if (list.id != newTask.listId) return list;
      return { ...list, cards: [...list.cards!, res] };
    }) as IListsWithCards[];

    dispatchRdx(addAllList(updatedLists));
    localStorage.setItem("storedLists", JSON.stringify(updatedLists));
  } catch (err) {
    const error = err as IError;
    console.log(`Error message: ${error.message}`);
  } finally {
    console.log("Send POST request for new task...");
  }
};

export const eventResize = async (
  info: any,
  cardDetails: ICard[],
  updateCard: (id: string, updatedCard: ICard) => Promise<void>
) => {
  const year = info.event.end.getFullYear();
  const month = info.event.end.getMonth() + 1;
  const day = info.event.end.getDate();

  const cardToModify = cardDetails?.filter(
    (card) => card.id == info.event.id
  )[0] as ICard;

  cardToModify.dueDate = new Date(`${year}/${month}/${day}`).toISOString();

  try {
    await updateCard(info.event.id, cardToModify);
  } catch (err) {
    const error = err as IError;
    console.log(`Error message: ${error.message}`);
  } finally {
    console.log("Send update request for a task...");
  }
};

export const eventDrop = async (
  info: any,
  cardDetails: ICard[],
  updateCard: (id: string, updatedCard: ICard) => Promise<void>
) => {
  const cardDetail = cardDetails?.filter(
    (cardDetail) => cardDetail.id == info.event.id
  )[0] as ICard;

  const setStartAndDue = (position: "start" | "end") => {
    const year = info.event[position].getFullYear();
    const month = info.event[position].getMonth() + 1;
    const day = info.event[position].getDate();

    return `${year}/${month}/${day}`;
  };

  cardDetail.startDate = new Date(setStartAndDue("start")).toISOString();
  if (cardDetail.dueDate) {
    cardDetail.dueDate = new Date(setStartAndDue("end")).toISOString();
  }

  try {
    await updateCard(info.event.id, cardDetail);
  } catch (err) {
    const error = err as IError;
    console.log(`Error message: ${error.message}`);
  } finally {
    console.log("Card dates are updating...");
  }
};

export const events = (cardDetails: ICard[] | null) => {
  return cardDetails
    ? cardDetails?.map((card) => {
        return {
          id: card.id,
          listId: card.listId,
          title: card.title,
          // start: card.startDate?.slice(0, 10),
          start: new Date(`${card.startDate}`)
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-"),
          // end: card.dueDate?.slice(0, 10),
          end: new Date(`${card.dueDate}`)
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-"),
          backgroundColor: (() => {
            switch (card.priority) {
              case "High":
                return "#c1121f";
              case "Medium":
                return "#ffc300";
              case "Low":
                return "#588157";
              default:
                return "#0077b6";
            }
          })(),
        };
      })
    : [];
};
