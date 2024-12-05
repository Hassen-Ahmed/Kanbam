import { useCallback } from "react";
import useKanbamApiClient from "./useKanbamApiClient";

export default function useDeletes() {
  const kanbamApi = useKanbamApiClient();

  // workspace Member
  const deleteWorkspaceMemberById = useCallback(
    async (id: string) => {
      await kanbamApi.delete(`/WorkspacesMembers/${id}`);
    },
    [kanbamApi]
  );

  // workspace
  const deleteWorkspaceById = useCallback(
    async (id: string) => {
      await kanbamApi.delete(`/Workspaces/${id}`);
    },
    [kanbamApi]
  );

  // board Member
  const deleteBoardMemberById = useCallback(
    async (id: string) => {
      await kanbamApi.delete(`/BoardsMembers/${id}`);
    },
    [kanbamApi]
  );

  // board
  const deleteBoardById = useCallback(
    async (id: string, workspaceId: string) => {
      await kanbamApi.delete(`/Boards/${id}/${workspaceId}`);
    },
    [kanbamApi]
  );

  // lists
  const deleteListsById = useCallback(
    async (id: string) => {
      await kanbamApi.delete(`/Lists/${id}`);
    },
    [kanbamApi]
  );

  // cards by listId
  const deleteCardByListId = useCallback(
    async (listId: string) => {
      await kanbamApi.delete(`/Cards/${listId}/list`);
    },
    [kanbamApi]
  );

  // cards by id
  const deleteCardById = useCallback(
    async (id: string) => {
      await kanbamApi.delete(`/Cards/${id}/card`);
    },
    [kanbamApi]
  );

  return {
    deleteWorkspaceMemberById,
    deleteWorkspaceById,
    deleteBoardMemberById,
    deleteBoardById,
    deleteListsById,
    deleteCardByListId,
    deleteCardById,
  };
}
