import { useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { handleReorderingData } from "../utils/order_and_update";
import useGets from "../utils/api/useGets";
import axios from "axios";
import { handlingAxioxError } from "../utils/errorHandling";
import { useAppDispath, useAppSelector } from "../features/hooks";
import { addAllList } from "../features/slices/listsSlice";
import { IListsWithCards } from "../types/kanbam";

export default function useFetchAllListByBoardId(b_id: string) {
  const dispatchRdx = useAppDispath();
  const { getAllListWithCardsByBoardId } = useGets();
  const lists = useAppSelector((state) => state.lists.lists);

  const [data, setData] = useState<IListsWithCards[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IError | null>(null);

  const fetchListsData = async () => {
    try {
      dispatchRdx(addAllList(null));
      const fetchedLists = await getAllListWithCardsByBoardId(b_id);

      const reorderedData = handleReorderingData(fetchedLists);

      dispatchRdx(addAllList(reorderedData));

      localStorage.setItem("storedLists", JSON.stringify(reorderedData));

      setData(fetchedLists);

      return fetchedLists;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = handlingAxioxError(err.response?.status) as IError;
        setError(error);
      }
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
  }, [lists, b_id]);

  return { data, loading, error, refetch: fetchListsData, setData };
}
