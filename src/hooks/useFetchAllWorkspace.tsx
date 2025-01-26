import { useEffect, useState } from "react";
import { IError, IWorkspace } from "../types/kanbam";
import useGets from "../utils/api/useGets";
import axios from "axios";
import { handlingAxioxError } from "../utils/errorHandling";

export default function useFetchAllWorkspace() {
  const { getAllWorkspace } = useGets();
  const [data, setData] = useState<IWorkspace[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IError | null>(null);

  const fetchWorkspacesData = async () => {
    try {
      const response = await getAllWorkspace();
      setData(response.workspaces);
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
    fetchWorkspacesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refetch: fetchWorkspacesData };
}
