import type {
  Imdb,
  PredefinedListRecord,
  EditableList,
  ImmutableList,
  TitleType,
  SortType,
  SortOrder,
  ListType,
  ListVisibility,
} from "../types/public.js";
import { TITLE_TYPES } from "../types/public.js";
import {
  setSessionHandler,
  getPredefinedListsHandler,
  getUserListsHandler,
  getPublicListHandler,
  createUserListHandler,
  removeUserListHandler,
  searchHandler,
} from "../handlers/imdb/index.js";

export class ImdbClient implements Imdb {
  cookie = "";
  userId = "";

  private getCookie = () => this.cookie;
  private getUserId = () => this.userId;

  async setSession(options: {
    path?: string;
    cookie?: string;
    userId?: string;
  }): Promise<boolean> {
    return setSessionHandler(this, options);
  }

  async getPredefinedLists({
    isInFavPeopleWeblab = false,
    locale = "en-US",
  }: {
    isInFavPeopleWeblab?: boolean;
    locale?: string;
  } = {}): Promise<PredefinedListRecord> {
    const options = {
      isInFavPeopleWeblab,
      locale,
    };
    return getPredefinedListsHandler(this.getCookie, this.getUserId, options);
  }

  async getUserLists({
    first = 10,
    locale = "en-US",
  }: {
    first?: number;
    locale?: string;
  } = {}): Promise<EditableList[]> {
    const options = { first, locale };
    return getUserListsHandler(this.getCookie, options);
  }

  getPublicList(listId: string): ImmutableList {
    return getPublicListHandler(this.getCookie, listId);
  }

  async createUserList({
    name,
    listDescription = "",
    listType = "TITLES" as ListType,
    visibility = "PRIVATE" as ListVisibility,
    allowDuplicates = true,
  }: {
    name: string;
    listDescription?: string;
    listType?: ListType;
    visibility?: ListVisibility;
    allowDuplicates?: boolean;
  }): Promise<EditableList> {
    const options = {
      name,
      listDescription,
      listType,
      visibility,
      allowDuplicates,
    };
    return createUserListHandler(this.getCookie, options);
  }

  async removeUserList(options: { listId: string }): Promise<boolean> {
    return removeUserListHandler(this.getCookie, options);
  }

  async searchTitle({
    first = 50,
    locale = "en-US",
    sortBy = "POPULARITY" as SortType,
    sortOrder = "ASC" as SortOrder,
    query,
    titleTypes = [...TITLE_TYPES],
  }: {
    first?: number;
    locale?: string;
    sortBy?: SortType;
    sortOrder?: SortOrder;
    query: string;
    titleTypes?: TitleType[];
  }) {
    const options = {
      first,
      locale,
      sortBy,
      sortOrder,
      query,
      titleTypes,
    };

    return searchHandler(this.getCookie, options);
  }
}
