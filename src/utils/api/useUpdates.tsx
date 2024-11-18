import { useCallback } from "react";
import useKanbamApiClient from "./useKanbamApiClient";
import {
  IBoardCreate,
  IBoardMemberUpdate,
  ICard,
  IList,
  IWorkspaceMemberUpdate,
  IWorkspaceUpdate,
} from "../../types/kanbam";

export default function useUpdates() {
  const kanbamApi = useKanbamApiClient();

  // Workspace Member
  const updateWorkspaceMember = useCallback(
    async (id: string, updatedWorkspaceMember: IWorkspaceMemberUpdate) => {
      await kanbamApi.patch(`/WorkspacesMembers/${id}`, updatedWorkspaceMember);
    },

    [kanbamApi]
  );

  // Workspace
  const updateWorkspace = useCallback(
    async (id: string, updatedWorkspace: IWorkspaceUpdate) => {
      await kanbamApi.patch(`/Workspaces/${id}`, updatedWorkspace);
    },

    [kanbamApi]
  );

  // Board Member
  const updateBoardMember = useCallback(
    async (id: string, updatedBoardMember: IBoardMemberUpdate) => {
      await kanbamApi.patch(`/BoardsMembers/${id}`, updatedBoardMember);
    },

    [kanbamApi]
  );

  // Board
  const updateBoard = useCallback(
    async (id: string, updatedBoard: IBoardCreate) => {
      await kanbamApi.patch(`/Boards/${id}`, updatedBoard);
    },

    [kanbamApi]
  );

  // lists
  const updateList = useCallback(
    async (id: string, updatedList: IList) => {
      await kanbamApi.patch(`/Lists/${id}`, updatedList);
    },

    [kanbamApi]
  );

  // Board
  const updateCard = useCallback(
    async (id: string, updatedCard: ICard) => {
      await kanbamApi.patch(`/Cards/${id}`, updatedCard);
    },

    [kanbamApi]
  );

  return {
    updateWorkspaceMember,
    updateWorkspace,
    updateBoardMember,
    updateBoard,
    updateList,
    updateCard,
  };
}
