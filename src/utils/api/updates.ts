import {
  IBoardCreate,
  IBoardMemberUpdate,
  ICard,
  IList,
  IWorkspaceMemberUpdate,
  IWorkspaceUpdate,
} from "../../types/kanbam";
import { kanbamApi } from "./baseApi";

// card
export const updateCard = async (
  id: string,
  updatedCard: ICard,
  token: string
) => {
  await kanbamApi.patch(`/Cards/${id}`, updatedCard, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// lists
export const updateList = async (
  id: string,
  updatedList: IList,
  token: string
) => {
  await kanbamApi.patch(`/Lists/${id}`, updatedList, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// Board
export const updateBoard = async (
  id: string,
  updatedBoard: IBoardCreate,
  token: string
) => {
  await kanbamApi.patch(`/Boards/${id}`, updatedBoard, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// Board Member
export const updateBoardMember = async (
  id: string,
  updatedBoardMember: IBoardMemberUpdate,
  token: string
) => {
  await kanbamApi.patch(`/BoardsMembers/${id}`, updatedBoardMember, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// Workspace
export const updateWorkspace = async (
  id: string,
  updatedWorkspace: IWorkspaceUpdate,
  token: string
) => {
  await kanbamApi.patch(`/Workspaces/${id}`, updatedWorkspace, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// Workspace Member
export const updateWorkspaceMember = async (
  id: string,
  updatedWorkspaceMember: IWorkspaceMemberUpdate,
  token: string
) => {
  await kanbamApi.patch(`/WorkspacesMembers/${id}`, updatedWorkspaceMember, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// users
// auth
