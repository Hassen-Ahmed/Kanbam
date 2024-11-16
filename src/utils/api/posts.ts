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
import { kanbamApi } from "./baseApi";

// card
export const postCard = async (newCard: ICardCreate, token: string) => {
  const { data } = await kanbamApi.post<ICard>(
    "/Cards",
    { ...newCard },
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );
  return data;
};

// lists
export const postList = async (newList: IListCreate, token: string) => {
  const { data } = await kanbamApi.post<IList>("/Lists", newList, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// Board
export const postBoard = async (newBoard: IBoardCreate, token: string) => {
  const { data } = await kanbamApi.post<IBoardCreate>("/Boards", newBoard, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
  return data;
};

// BoardMember
export const postBoardMemeber = async (
  newBoardMember: IBoardMemberCreate,
  token: string
) => {
  const { data } = await kanbamApi.post<IBoardMemberCreate>(
    "/BoardsMembers",
    newBoardMember,
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );
  return data;
};

// Workspace
export const postWorkspace = async (
  newWorkspace: IWorkspaceCreate,
  token: string
) => {
  const { data } = await kanbamApi.post<IWorkspaceCreate>(
    "/Workspaces",
    newWorkspace,
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );
  return data;
};

// WorkspaceMember
export const postWorkspaceMemeber = async (
  newWorkspaceMember: IWorkspaceMemberCreate,
  token: string
) => {
  const { data } = await kanbamApi.post<IWorkspaceMemberCreate>(
    "/WorkspacesMembers",
    newWorkspaceMember,
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );
  return data;
};

// auth
export const postAuthLogin = async (loginDetail: IAuthLogin) => {
  const { data } = await kanbamApi.post("/auth/login", loginDetail);
  return data;
};

export const postAuthRegistarion = async (
  registarionDetail: IAuthRegistarion
) => {
  const { data }: { data: IAuthRegistarionSuccess } = await kanbamApi.post(
    "/auth/registarion",
    registarionDetail
  );

  return data;
};

// users
