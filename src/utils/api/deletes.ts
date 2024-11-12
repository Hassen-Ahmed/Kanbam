import { kanbamApi } from "./baseApi";

// cards
export const deleteCardById = async (id: string, token: string) => {
  await kanbamApi.delete(`/Cards/${id}/card`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

export const deleteCardByListId = async (listId: string, token: string) => {
  await kanbamApi.delete(`/Cards/${listId}/list`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// lists

export const deleteListsById = async (id: string, token: string) => {
  await kanbamApi.delete(`/Lists/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// board
export const deleteBoardById = async (id: string, token: string) => {
  await kanbamApi.delete(`/Boards/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};

// workspace
export const deleteWorkspaceById = async (id: string, token: string) => {
  await kanbamApi.delete(`/Workspaces/${id}`, {
    headers: {
      Authorization: `Bearer  ${token}`,
    },
  });
};
