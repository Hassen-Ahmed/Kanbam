import { IActionBoard } from "./actions.type";

// cards
export interface ICardCreate {
  listId: string;
  title: string;
  indexNumber: number;
  description?: string;
  comments?: string[];
  priority?: string;
  isDragging?: boolean;
  opacity?: string;
  startDate?: string;
  dueDate?: string;
  dueDateReminder?: string;
}

export interface ICard extends ICardCreate {
  id: string;
  comments: string[];
}

// lists
export interface IListCreate {
  boardId: string;
  title: string;
  indexNumber: number;
  isDragging?: boolean;
  opacity?: string;
}

export interface IList extends IListCreate {
  id: string;
}

export interface IListsWithCards extends IList {
  cards: ICard[];
}

// boards
export interface IBoardCreate {
  workspaceId: string;
  name: string;
  description: string;
}

export interface IBoard extends IBoardCreate {
  boardId: string;
  role: string;
}

// boardMember
export interface IBoardMemberCreate {
  boardId: string;
  role: string;
  email: string;
}

export interface IBoardMember extends IBoardMemberCreate {
  userId: string;
  userName: string;
}

// workspace
export interface IWorkspaceCreate {
  name: string;
  description: string;
}

export interface IWorkspace extends IWorkspaceCreate {
  role: string;
  workspaceId: string;
  boardAccessLevel: string;
}

// workspaceMember

export interface IWorkspaceMemberCreate {
  workspaceId: string;
  userId?: string;
  userName?: string;
  email?: string;
  role: string;
}

export interface IWorkspaceMember extends IWorkspaceMemberCreate {
  id: string;
  userId: string;
}

// userDetail

export interface IUserResponseDetail {
  email: string;
  userName: string;
}

// others
export interface IListsContext {
  lists: IListsWithCards[] | null;
  dispatch: React.Dispatch<IActionBoard>;
  searchText: string;
  handleSearchTextUpdate: (text: string) => void;
}

export interface IUserDecodedResult {
  userId: string;
  role: string;
  exp: number;
}
