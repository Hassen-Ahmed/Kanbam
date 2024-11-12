import { useCallback, useContext, useEffect, useState } from "react";
import { getAllWorkspace } from "../utils/api/gets";
import { IError } from "../types/status.type";
import { IUserResponseDetail, IWorkspace } from "../types/kanbam";
import { IkanbamContext, KanbamContext } from "../context/kanbamContext";

interface IUseFetchAllWorkspace {
  workspaces: IWorkspace[];
  userDetail: IUserResponseDetail;
}

export default function useFetchAllWorkspace() {
  const { setUserDetail } = useContext(KanbamContext) as IkanbamContext;
  const [data, setData] = useState<IUseFetchAllWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspacesData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const response = await getAllWorkspace(token);
      setData(response);
      setUserDetail(response.userDetail);
    } catch (err) {
      const error = err as IError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkspacesData();
  }, [fetchWorkspacesData]);

  return { data, loading, error, refetch: fetchWorkspacesData };
}
