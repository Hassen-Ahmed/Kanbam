import { useEffect, useState } from "react";
import { IError } from "../types/status.type";
import { IBoardMember } from "../types/kanbam";
import useGets from "../utils/api/useGets";

export default function useFetchAllBoardMembersByBoardId(b_id: string) {
  const { getAllBoardMembersByBoardId } = useGets();
  const [dataBoardMembers, setDataBoardMembers] = useState<
    IBoardMember[] | null
  >(null);
  const [loadingBoardMembers, setLoadingBoardMembers] = useState(true);
  const [errorBoardMembers, setErrorBoardMembers] = useState<string | null>(
    null
  );

  const fetchBoardsData = async () => {
    try {
      const res = await getAllBoardMembersByBoardId(b_id);

      setDataBoardMembers(res);
      setLoadingBoardMembers(false);
    } catch (err) {
      const errorBoardMembers = err as IError;
      setErrorBoardMembers(errorBoardMembers.message);
      setLoadingBoardMembers(false);
    }
  };

  useEffect(() => {
    fetchBoardsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b_id]);

  return {
    dataBoardMembers,
    loadingBoardMembers,
    errorBoardMembers,
    refetchBoardMembers: fetchBoardsData,
  };
}
