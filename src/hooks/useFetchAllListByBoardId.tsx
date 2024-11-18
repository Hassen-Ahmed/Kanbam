import { useContext, useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { IListsContext, IListsWithCards } from "../types/kanbam";
import { ListsContext } from "../context/ListsContext";
import { handleReorderingData } from "../utils/order_and_update";
import useGets from "../utils/api/useGets";

export default function useFetchAllListByBoardId(b_id: string) {
  const { getAllListByBoardId, getAllCardsByListId } = useGets();
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const [data, setData] = useState<IListsWithCards[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListsData = async () => {
    try {
      dispatch({
        type: "ADD_ALL_LISTS",
        payload: null,
      });

      const fetchedLists = await getAllListByBoardId(b_id);
      const listsWithCards: IListsWithCards[] = await Promise.all(
        fetchedLists.map(async (list) => {
          const cards = await getAllCardsByListId(list.id);

          return {
            ...list,
            cards,
          };
        })
      );

      const reorderedData = handleReorderingData(listsWithCards);

      dispatch({
        type: "ADD_ALL_LISTS",
        payload: reorderedData,
      });
      localStorage.setItem("storedLists", JSON.stringify(reorderedData));

      setData(listsWithCards);

      return listsWithCards;
    } catch (err) {
      const error = err as IError;
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lists) {
      const reorderedData = handleReorderingData(lists);
      setData(reorderedData);
      setLoading(false);
      setError(null);
    } else {
      fetchListsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists, b_id, dispatch]);

  return { data, loading, error, refetch: fetchListsData };
}
