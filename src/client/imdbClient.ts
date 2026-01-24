import type {
  Imdb,
  PredefinedListRecord,
  EditableList,
  ImmutableList,
  TitleType,
  SortType,
  SortOrder,
} from "../types/public.js";
import {
  setSessionHandler,
  getPredefinedListsHandler,
  getUserListsHandler,
  getPublicListHandler,
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
    return await setSessionHandler(this, options);
  }

  async getPredefinedLists(): Promise<PredefinedListRecord> {
    return await getPredefinedListsHandler(this.getCookie, this.getUserId);
  }

  async getUserLists(): Promise<EditableList[]> {
    return await getUserListsHandler(this.getCookie);
  }

  getPublicList(listId: string): ImmutableList {
    return getPublicListHandler(this.getCookie, listId);
  }

  async searchTitle(
    query: string,
    options?: {
      first?: number;
      locale?: string;
      sortBy?: SortType;
      sortOrder?: SortOrder;
      titleTypes?: TitleType[];
    }
  ) {
    return await searchHandler(this.getCookie, query, options);
  }
}
