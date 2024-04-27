import { useContext, useEffect } from "react";
import { IkanbamContext, KanbamContext } from "./context/kanbamContext";
import { IListsContext, ListsContext } from "./context/ListsContext";
import { getAllLists } from "./utils/api/gets";
import CardModal from "./components/card/modal/CardModal";
import Home from "./pages/home/Home";
import { updateCard, updateList } from "./utils/api/updates";
import { IList, ListType } from "./types/board.type";

const App = () => {
  const { idOfModalCard, handleModalCardId } = useContext(
    KanbamContext
  ) as IkanbamContext;
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;

  const fetchAllLists = async () => {
    console.log("onece app fetchAllLists ####");

    try {
      const res = await getAllLists();

      res?.sort((a, b) => a.indexNumber - b.indexNumber);

      res?.map((listsObj) => {
        const sortedlist = listsObj.list.sort(
          (a, b) => a.indexNumber - b.indexNumber
        );
        return { ...listsObj, list: sortedlist };
      });
      // save res to localStorage for later we compare this storedLists/res to lists and for PUT request.
      localStorage.setItem("storedLists", JSON.stringify(res));
      dispatch({ type: "GET_ALL_LISTS", payload: res });
    } catch (err) {
      console.log(`Error message: ${err}`);
    } finally {
      console.log("Sent GET / getAllLists request from App.");
    }
  };

  useEffect(() => {
    fetchAllLists();
  }, []);

  const handleAppOnDrop = () => {
    const storedLists = localStorage.getItem("storedLists");

    if (!storedLists) return;
    const pareseStoredLists = JSON.parse(storedLists);

    if (lists == undefined) return;
    // for lists only difference checking
    let isThereSomeListsDifference = false;
    const listsForPutRequest = [];

    for (let i = 0; i < lists?.length; i++) {
      if (lists[i].title != pareseStoredLists[i].title) {
        isThereSomeListsDifference = true;

        listsForPutRequest.push({
          title: lists[i].title,
          id: lists[i].id as string,
          indexNumber: lists[i].indexNumber,
        });
      }
    }

    // reset localStorage of storedLists with edited lists
    if (isThereSomeListsDifference) {
      localStorage.setItem("storedLists", JSON.stringify(lists));
      // do put request for lists here
      try {
        asyncUpdaterList(listsForPutRequest).then((data) =>
          console.log("UpdateLists is successful --->>", data)
        );
      } catch (err) {
        console.log(`Updating List err ${err}`);
      }
    } else {
      // for cards only if the lists result is ok no difference.
      let isThereSomeCardsDiff = false;
      const cardsForPutRequest: ListType = [];

      for (let j = 0; j < lists?.length; j++) {
        const updatedCardsFromLists = lists[j].list;
        const cardsFromStoredLists = pareseStoredLists[j].list;

        if (updatedCardsFromLists?.length == undefined) return;
        for (let i = 0; i < updatedCardsFromLists?.length; i++) {
          if (
            updatedCardsFromLists[i].title != cardsFromStoredLists[i]?.title
          ) {
            isThereSomeCardsDiff = true;
            console.log(
              "---->>",
              updatedCardsFromLists[i]?.title,
              lists[j].title
            );

            cardsForPutRequest.push({
              id: updatedCardsFromLists[i].id,
              listId: lists[j].id as string,
              indexNumber: updatedCardsFromLists[i].indexNumber,
              title: updatedCardsFromLists[i].title,
            });
          }
        }
      }

      // reset localStorage of storedLists with edited lists
      if (isThereSomeCardsDiff) {
        localStorage.setItem("storedLists", JSON.stringify(lists));
        console.log("cardsForPutRequest ---", cardsForPutRequest);

        // do put request for lists here
        try {
          asyncUpdateCard(cardsForPutRequest).then((data) =>
            console.log("UpdateCard is successful --->>", data)
          );
        } catch (err) {
          console.log(`Updating cards err ${err}`);
        }
      }
    }
  };

  async function asyncUpdaterList(lists: IList[]) {
    return Promise.all(
      lists.map(async (list) => {
        return await updateList(list.id!, list);
      })
    );
  }

  async function asyncUpdateCard(list: ListType) {
    return Promise.all(
      list.map((card) => {
        return updateCard(card.id!, card);
      })
    );
  }

  return (
    <div className="app" onDrop={handleAppOnDrop}>
      {idOfModalCard?.title || idOfModalCard?.id ? (
        <CardModal
          handleModalCardId={handleModalCardId}
          id={idOfModalCard.id}
          title={idOfModalCard.title}
        />
      ) : null}
      <Home />
    </div>
  );
};

export default App;
