import { useCallback } from "react";
import useKanbamApiClient from "./useKanbamApiClient";
import {
  IBoard,
  IBoardMember,
  ICard,
  IList,
  IListsWithCards,
  IUserResponseDetail,
  IWorkspace,
  IWorkspaceMember,
} from "../../types/kanbam";

export default function useGets() {
  const kanbamApi = useKanbamApiClient();

  // workspaces
  const getAllWorkspace = useCallback(async () => {
    const {
      data: { workspaces, userDetail },
    } = await kanbamApi.get<{
      workspaces: IWorkspace[];
      userDetail: IUserResponseDetail;
    }>(`/Workspaces`);

    return { workspaces, userDetail };
  }, [kanbamApi]);

  // WorkspaceMembers By WorkspaceId
  const getAllWorkspaceMembersByWorkspaceId = useCallback(
    async (workspaceId: string) => {
      const {
        data: { workspacesMembers },
      } = await kanbamApi.get<{ workspacesMembers: IWorkspaceMember[] }>(
        `/WorkspacesMembers/${workspaceId}`
      );

      return workspacesMembers;
    },

    [kanbamApi]
  );

  // BoardMembers By BoardId
  const getAllBoardMembersByBoardId = useCallback(
    async (boardId: string) => {
      const {
        data: { boardMembers },
      } = await kanbamApi.get<{ boardMembers: IBoardMember[] }>(
        `/BoardsMembers/${boardId}`
      );

      return boardMembers;
    },

    [kanbamApi]
  );

  // boards by workspaceId
  const getAllBoardsByWorkspaceId = useCallback(
    async (workspaceId: string) => {
      const {
        data: { boards },
      } = await kanbamApi.get<{ boards: IBoard[] }>(`/Boards/${workspaceId}`);

      return boards;
    },

    [kanbamApi]
  );

  // lists by BoardId
  const getAllListWithCardsByBoardId = useCallback(
    async (boardId: string) => {
      const {
        data: { lists },
      } = await kanbamApi.get<{ lists: IListsWithCards[] }>(
        `/Lists/${boardId}`
      );

      return lists;
    },

    [kanbamApi]
  );

  // lists
  const getAllLists = useCallback(async () => {
    const { data } = await kanbamApi.get<IList[]>("/Lists");
    return data;
  }, [kanbamApi]);

  // cards by listId
  const getAllCardsByListId = useCallback(
    async (listId: string) => {
      const {
        data: { cards },
      } = await kanbamApi.get<{ cards: ICard[] }>(`/Cards/${listId}/list`);

      return cards;
    },

    [kanbamApi]
  );

  // cards by Id
  const getCardByCardId = useCallback(
    async (cardId: string) => {
      const { data } = await kanbamApi.get<ICard>(`/cards/${cardId}/card`);

      return data;
    },

    [kanbamApi]
  );

  return {
    getAllWorkspace,
    getAllWorkspaceMembersByWorkspaceId,
    getAllBoardMembersByBoardId,
    getAllBoardsByWorkspaceId,
    getAllListWithCardsByBoardId,
    getAllLists,
    getAllCardsByListId,
    getCardByCardId,
  };
}
