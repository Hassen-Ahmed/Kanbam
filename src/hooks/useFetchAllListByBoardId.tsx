import { useCallback, useContext, useEffect, useState } from "react";
import { getAllCardsByListId, getAllListByBoardId } from "../utils/api/gets";
import { IError } from "../types/status.type";
import { IListsContext, IListsWithCards } from "../types/kanbam";
import { ListsContext } from "../context/ListsContext";
import { handleReorderingData } from "../utils/order_and_update";

export default function useFetchAllListByBoardId(b_id: string) {
  const { lists, dispatch } = useContext(ListsContext) as IListsContext;
  const [data, setData] = useState<IListsWithCards[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListsData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      dispatch({
        type: "ADD_ALL_LISTS",
        payload: null,
      });

      const fetchedLists = await getAllListByBoardId(token, b_id);
      const listsWithCards: IListsWithCards[] = await Promise.all(
        fetchedLists.map(async (list) => {
          const cards = await getAllCardsByListId(token, list.id);

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
  }, [b_id, dispatch]);

  useEffect(() => {
    if (lists) {
      const reorderedData = handleReorderingData(lists);
      setData(reorderedData);
      setLoading(false);
      setError(null);
    } else {
      fetchListsData();
    }

    return () => {
      setData(null);
      setError(null);
      setLoading(true);
    };
  }, [lists, fetchListsData]);

  return { data, loading, error, refetch: fetchListsData };
}
