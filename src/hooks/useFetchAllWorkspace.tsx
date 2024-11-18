import { useContext, useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { IUserResponseDetail, IWorkspace } from "../types/kanbam";
import { IkanbamContext, KanbamContext } from "../context/kanbamContext";
import useGets from "../utils/api/useGets";

interface IUseFetchAllWorkspace {
  workspaces: IWorkspace[];
  userDetail: IUserResponseDetail;
}

export default function useFetchAllWorkspace() {
  const { getAllWorkspace } = useGets();
  const { setUserDetail } = useContext(KanbamContext) as IkanbamContext;
  const [data, setData] = useState<IUseFetchAllWorkspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspacesData = async () => {
    try {
      const response = await getAllWorkspace();
      setData(response);
      setUserDetail(response.userDetail);
    } catch (err) {
      const error = err as IError;
      setError(error.message);
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
