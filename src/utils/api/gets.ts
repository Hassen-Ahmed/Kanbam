import {
  IBoard,
  IWorkspace,
  ICard,
  IList,
  IWorkspaceMember,
  IUserResponseDetail,
  IBoardMember,
} from "../../types/kanbam";
import { kanbamApi } from "./baseApi";

const token = localStorage.getItem("token");

// cards by listId
export const getAllCardsByListId = async (token: string, listId: string) => {
  const {
    data: { cards },
  } = await kanbamApi.get<{ cards: ICard[] }>(`/Cards/${listId}/list`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return cards;
};

// cards by Id
export const getCardByCardId = async (cardId: string) => {
  const { data } = await kanbamApi.get<ICard>(`/cards/${cardId}/card`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return data;
};

// lists
export const getAllLists = async (token: string) => {
  const { data } = await kanbamApi.get<IList[]>("/Lists", {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return data;
};

// lists by BoardId
export const getAllListByBoardId = async (token: string, boardId: string) => {
  const {
    data: { lists },
  } = await kanbamApi.get<{ lists: IList[] }>(`/Lists/${boardId}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return lists;
};

// boards by workspaceId
export const getAllBoardsByWorkspaceId = async (
  token: string,
  workspaceId: string
) => {
  const {
    data: { boards },
  } = await kanbamApi.get<{ boards: IBoard[] }>(`/Boards/${workspaceId}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return boards;
};

// BoardMembers By BoardId
export const getAllBoardMembersByBoardId = async (
  token: string,
  boardId: string
) => {
  const {
    data: { boardMembers },
  } = await kanbamApi.get<{ boardMembers: IBoardMember[] }>(
    `/BoardsMembers/${boardId}`,
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );

  return boardMembers;
};

// workspaces
export const getAllWorkspace = async (token: string) => {
  const {
    data: { workspaces, userDetail },
  } = await kanbamApi.get<{
    workspaces: IWorkspace[];
    userDetail: IUserResponseDetail;
  }>(`/Workspaces`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });

  return { workspaces, userDetail };
};

// WorkspaceMembers By WorkspaceId
export const getAllWorkspaceMembersByWorkspaceId = async (
  token: string,
  workspaceId: string
) => {
  const {
    data: { workspacesMembers },
  } = await kanbamApi.get<{ workspacesMembers: IWorkspaceMember[] }>(
    `/WorkspacesMembers/${workspaceId}`,
    {
      headers: {
        Authorization: `Bearer  ${token}`,
      },
    }
  );

  return workspacesMembers;
};
