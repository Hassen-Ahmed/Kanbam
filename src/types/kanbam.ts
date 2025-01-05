// comment
export interface IComment {
  id?: string;
  description: string;
  author: string;
  createdAt?: string;
  userId: string;
  cardId: string;
}

// cards
export interface ICardCreate {
  listId: string;
  title: string;
  indexNumber: number;
  description?: string;
  comments?: IComment[];
  priority?: string;
  isDragging?: boolean;
  opacity?: string;
  startDate?: string;
  dueDate?: string;
  dueDateReminder?: string;
}

export interface ICard extends ICardCreate {
  id: string;
  comments: IComment[];
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
}

// boardMember
export interface IBoardMemberCreate {
  boardId: string;
  role: string;
  email: string;
}

export interface IBoardMemberUpdate {
  role: string;
}

export interface IBoardMember extends IBoardMemberUpdate {
  id: string;
  email: string;
  userId: string;
  userName: string;
}

// workspace
export interface IWorkspaceCreate {
  name: string;
  description: string;
}

export interface IWorkspaceUpdate {
  workspaceId: string;
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

export interface IWorkspaceMemberUpdate {
  role: string;
}

// userDetail

export interface IUserResponseDetail {
  id: string;
  email: string;
  userName: string;
}

export interface IUserDecodedResult {
  userId: string;
  unique_name: string;
  role: string;
  exp: number;
}

interface IItem {
  id?: string;
  listId?: string;
  boardId?: string;
  indexNumber: number;
  title: string;
  description?: string;
  priority?: string;
  comments?: IComment[];
  isDragging?: boolean;
  cards?: ICard[];
  opacity: string;
}

export interface IItemDragging {
  item: IItem;
  identity: string;
}
