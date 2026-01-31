import type {
  Imdb,
  PredefinedListRecord,
  EditableList,
  ImmutableList,
} from "../types/public.js";
import {
  setSessionHandler,
  fetchPredefinedLists,
  fetchUserLists,
  createImmutableList,
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
    return await fetchPredefinedLists(this.getCookie, this.getUserId);
  }

  async getUserLists(): Promise<EditableList[]> {
    return await fetchUserLists(this.getCookie);
  }

  getPublicList(listId: string): ImmutableList {
    return createImmutableList(this.getCookie, listId);
  }
}
