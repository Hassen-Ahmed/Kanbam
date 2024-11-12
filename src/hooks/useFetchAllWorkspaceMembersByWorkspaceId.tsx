import { useCallback, useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { IWorkspaceMember } from "../types/kanbam";
import { getAllWorkspaceMembersByWorkspaceId } from "../utils/api/gets";

export default function useFetchAllWorkspaceMembersByWorkspaceId(w_id: string) {
  const [dataWrMembers, setDataWrMembers] = useState<IWorkspaceMember[] | null>(
    null
  );
  const [loadingWrMembers, setLoadingWrMembers] = useState(true);
  const [errorWrMembers, setErrorWrMembers] = useState<string | null>(null);

  const fetchBoardsData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorWrMembers("No token found");
        setLoadingWrMembers(false);
        return;
      }

      const res = await getAllWorkspaceMembersByWorkspaceId(token, w_id);

      setDataWrMembers(res);
      setLoadingWrMembers(false);
    } catch (err) {
      const errorWrMembers = err as IError;
      setErrorWrMembers(errorWrMembers.message);
      setLoadingWrMembers(false);
    }
  }, [w_id]);

  useEffect(() => {
    fetchBoardsData();
    return () => {
      setDataWrMembers(null);
      setLoadingWrMembers(false);
      setErrorWrMembers(null);
    };
  }, [fetchBoardsData]);

  return {
    dataWrMembers,
    loadingWrMembers,
    errorWrMembers,
    refetchWrMembers: fetchBoardsData,
  };
}
