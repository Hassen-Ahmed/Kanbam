import { useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { IBoard } from "../types/kanbam";
import useGets from "../utils/api/useGets";
import axios from "axios";
import { handlingAxioxError } from "../utils/errorHandling";

export default function useFetchAllBoardsByWorkspaceId(w_id: string) {
  const { getAllBoardsByWorkspaceId } = useGets();
  const [data, setData] = useState<IBoard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IError | null>(null);

  const fetchBoardsData = async () => {
    try {
      const res = await getAllBoardsByWorkspaceId(w_id);
      setData(res);
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
    fetchBoardsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w_id]);

  return { data, loading, error, refetch: fetchBoardsData };
}
