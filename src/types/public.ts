export interface ImmutableList {
  id: string;
  endpoint: string;
  data: any;
  getItems: () => Promise<any[]>;
}

export interface EditableList extends ImmutableList {
  addItem: (options: {
    titleId: string;
    includeListItemMetadata?: boolean;
    refTagQueryParam?: string;
    originalTitleText?: boolean;
    isInPace?: boolean;
    rating?: number;
  }) => Promise<boolean>;
  removeItem: (options: { titleId: string }) => Promise<boolean>;
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

export const TITLE_TYPES = [
  "short",
  "tvSeries",
  "movie",
  "tvSpecial",
  "podcastSeries",
  "musicVideo",
  "tvMovie",
  "tvShort",
  "podcastEpisode",
  "videoGame",
  "tvMiniSeries",
  "tvEpisode",
  "video",
] as const;
export type TitleType = (typeof TITLE_TYPES)[number];

export const SORT_TYPES = [
  "POPULARITY",
  "TITLE_REGIONAL",
  "USER_RATING",
  "USER_RATING_COUNT",
  "BOX_OFFICE_GROSS_DOMESTIC",
  "RUNTIME",
  "YEAR",
  "RELEASE_DATE",
  "MY_RATING_DATE",
  "MY_RATING",
] as const;
export type SortType = (typeof SORT_TYPES)[number];

export const SORT_ORDER_TYPES = ["ASC", "DESC"] as const;
export type SortOrder = (typeof SORT_ORDER_TYPES)[number];

export interface Imdb {
  // Session
  cookie: string;
  userId: string;
  setSession: (options: {
    path?: string;
    cookie?: string;
    userId?: string;
  }) => Promise<boolean>;

  // Lists
  getPredefinedLists: (options?: {
    isInFavPeopleWeblab?: boolean;
    locale?: string;
  }) => Promise<PredefinedListRecord>;
  getUserLists: (options?: {
    first?: number;
    locale?: string;
  }) => Promise<EditableList[]>;
  getPublicList: (listId: string) => ImmutableList;

  // Search
  searchTitle: (options: {
    first?: number;
    locale?: string;
    sortBy?: SortType;
    sortOrder?: SortOrder;
    query: string;
    titleTypes?: TitleType[];
  }) => Promise<any>;
}
