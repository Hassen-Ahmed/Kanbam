import { useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { IWorkspaceMember } from "../types/kanbam";
import useGets from "../utils/api/useGets";

export default function useFetchAllWorkspaceMembersByWorkspaceId(w_id: string) {
  const { getAllWorkspaceMembersByWorkspaceId } = useGets();
  const [dataWrMembers, setDataWrMembers] = useState<IWorkspaceMember[] | null>(
    null
  );
  const [loadingWrMembers, setLoadingWrMembers] = useState(true);
  const [errorWrMembers, setErrorWrMembers] = useState<string | null>(null);

  const fetchBoardsData = async () => {
    try {
      const res = await getAllWorkspaceMembersByWorkspaceId(w_id);

      setDataWrMembers(res);
      setLoadingWrMembers(false);
    } catch (err) {
      const errorWrMembers = err as IError;
      setErrorWrMembers(errorWrMembers.message);
      setLoadingWrMembers(false);
    }
  };

  useEffect(() => {
    fetchBoardsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w_id]);

  return {
    dataWrMembers,
    loadingWrMembers,
    errorWrMembers,
    refetchWrMembers: fetchBoardsData,
  };
}
