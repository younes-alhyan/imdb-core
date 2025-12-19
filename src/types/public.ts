export interface ImmutableList {
  id: string;
  endpoint: string;
  data: any;
  getItems: () => Promise<any[]>;
}

export interface EditableList extends ImmutableList {
  addItem: (itemId: string, options?: { rating?: number }) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<boolean>;
}

const PREDEFINED_LIST_KEYS = [
  "ratings",
  "watchlist",
  "watchHistory",
  "checkins",
] as const;
type PredefinedListKey = (typeof PREDEFINED_LIST_KEYS)[number];

export type PredefinedListRecord = Partial<
  Record<PredefinedListKey, EditableList>
>;

export interface Imdb {
  cookie: string;
  userId: string;
  setSession: (options: {
    path?: string;
    cookie?: string;
    userId?: string;
  }) => Promise<boolean>;
  getPredefinedLists: () => Promise<PredefinedListRecord>;
  getUserLists: () => Promise<EditableList[]>;
  getPublicList: (listId: string) => ImmutableList;
}
