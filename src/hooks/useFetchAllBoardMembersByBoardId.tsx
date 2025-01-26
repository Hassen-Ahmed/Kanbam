import { useEffect, useState } from "react";
import { IBoardMember, IError } from "../types/kanbam";
import useGets from "../utils/api/useGets";
import axios from "axios";
import { handlingAxioxError } from "../utils/errorHandling";

export default function useFetchAllBoardMembersByBoardId(b_id: string) {
  const { getAllBoardMembersByBoardId } = useGets();
  const [dataBoardMembers, setDataBoardMembers] = useState<
    IBoardMember[] | null
  >(null);
  const [loadingBoardMembers, setLoadingBoardMembers] = useState(true);
  const [errorBoardMembers, setErrorBoardMembers] = useState<IError | null>(
    null
  );

  const fetchBoardsData = async () => {
    try {
      const res = await getAllBoardMembersByBoardId(b_id);

      setDataBoardMembers(res);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = handlingAxioxError(err.response?.status) as IError;
        setErrorBoardMembers(error);
      }
    } finally {
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
