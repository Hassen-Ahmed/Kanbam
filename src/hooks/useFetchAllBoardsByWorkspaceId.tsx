import { useCallback, useEffect, useState } from "react";
import { getAllBoardsByWorkspaceId } from "../utils/api/gets";
import { IError } from "../types/status.type";
import { IBoard } from "../types/kanbam";

export default function useFetchAllBoardsByWorkspaceId(w_id: string) {
  const [data, setData] = useState<IBoard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoardsData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const res = await getAllBoardsByWorkspaceId(token, w_id);

      setData(res);
      setLoading(false);
    } catch (err) {
      const error = err as IError;
      setError(error.message);
      setLoading(false);
    }
  }, [w_id]);

  useEffect(() => {
    fetchBoardsData();
    return () => {
      setData(null);
      setLoading(false);
      setError(null);
    };
  }, [fetchBoardsData]);

  return { data, loading, error, refetch: fetchBoardsData };
}
