import { useCallback } from "react";
import useKanbamApiClient from "./useKanbamApiClient";
import {
  IAuthLogin,
  IAuthRegistarion,
  IAuthRegistarionSuccess,
} from "../../types/auth.type";
import {
  IBoardCreate,
  IBoardMemberCreate,
  ICard,
  ICardCreate,
  IList,
  IListCreate,
  IWorkspaceCreate,
  IWorkspaceMemberCreate,
} from "../../types/kanbam";

export default function usePosts() {
  const kanbamApi = useKanbamApiClient();

  // Auth registration
  const postAuthRegistarion = useCallback(
    async (registarionDetail: IAuthRegistarion) => {
      const { data }: { data: IAuthRegistarionSuccess } = await kanbamApi.post(
        "/auth/registration",
        registarionDetail
      );

      return data;
    },

    [kanbamApi]
  );

  // Auth login
  const postAuthLogin = useCallback(
    async (loginDetail: IAuthLogin) => {
      const { data } = await kanbamApi.post("/auth/login", loginDetail);
      return data;
    },

    [kanbamApi]
  );

  // Auth login
  const postAuthRevoke = useCallback(async () => {
    await kanbamApi.post("/auth/RevokeRefreshToken");
  }, [kanbamApi]);

  // WorkspaceMember
  const postWorkspaceMemeber = useCallback(
    async (newWorkspaceMember: IWorkspaceMemberCreate) => {
      const { data } = await kanbamApi.post<IWorkspaceMemberCreate>(
        "/WorkspacesMembers",
        newWorkspaceMember
      );
      return data;
    },

    [kanbamApi]
  );

  // Workspace
  const postWorkspace = useCallback(
    async (newWorkspace: IWorkspaceCreate) => {
      const { data } = await kanbamApi.post<IWorkspaceCreate>(
        "/Workspaces",
        newWorkspace
      );
      return data;
    },

    [kanbamApi]
  );

  // BoardMember
  const postBoardMemeber = useCallback(
    async (newBoardMember: IBoardMemberCreate) => {
      const { data } = await kanbamApi.post<IBoardMemberCreate>(
        "/BoardsMembers",
        newBoardMember
      );
      return data;
    },

    [kanbamApi]
  );

  // Board
  const postBoard = useCallback(
    async (newBoard: IBoardCreate) => {
      const { data } = await kanbamApi.post<IBoardCreate>("/Boards", newBoard);
      return data;
    },

    [kanbamApi]
  );

  // lists
  const postList = useCallback(
    async (newList: IListCreate) => {
      const { data } = await kanbamApi.post<IList>("/Lists", newList);
      return data;
    },

    [kanbamApi]
  );

  // card
  const postCard = useCallback(
    async (newCard: ICardCreate) => {
      const { data } = await kanbamApi.post<ICard>("/Cards", { ...newCard });
      return data;
    },

    [kanbamApi]
  );

  return {
    postAuthRegistarion,
    postAuthLogin,
    postAuthRevoke,
    postWorkspaceMemeber,
    postWorkspace,
    postBoardMemeber,
    postBoard,
    postList,
    postCard,
  };
}
