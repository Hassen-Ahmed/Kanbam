import { useCallback, useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { getAllBoardMembersByBoardId } from "../utils/api/gets";
import { IBoardMember } from "../types/kanbam";

export default function useFetchAllBoardMembersByBoardId(b_id: string) {
  const [dataBoardMembers, setDataBoardMembers] = useState<
    IBoardMember[] | null
  >(null);
  const [loadingBoardMembers, setLoadingBoardMembers] = useState(true);
  const [errorBoardMembers, setErrorBoardMembers] = useState<string | null>(
    null
  );

  const fetchBoardsData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorBoardMembers("No token found");
        setLoadingBoardMembers(false);
        return;
      }

      const res = await getAllBoardMembersByBoardId(token, b_id);

      setDataBoardMembers(res);
      setLoadingBoardMembers(false);
    } catch (err) {
      const errorBoardMembers = err as IError;
      setErrorBoardMembers(errorBoardMembers.message);
      setLoadingBoardMembers(false);
    }
  }, [b_id]);

  useEffect(() => {
    fetchBoardsData();
  }, [fetchBoardsData]);

  return {
    dataBoardMembers,
    loadingBoardMembers,
    errorBoardMembers,
    refetchBoardMembers: fetchBoardsData,
  };
}
