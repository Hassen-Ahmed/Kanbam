import { IBoardCreate, ICard, IList } from "../../types/kanbam";
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

// Workspace
export const updateWorkspace = async (
  id: string,
  updatedWorkspace: IBoardCreate,
  token: string
) => {
  await kanbamApi.patch(`/Workspaces/${id}`, updatedWorkspace, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// users
// auth
