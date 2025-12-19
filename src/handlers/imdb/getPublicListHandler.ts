import type { ImmutableList } from "../../types/public.js";
import { ImmutableListClient } from "../../client/immutableListClient.js";

export const getPublicListHandler = (
  getCookie: () => string,
  listId: string
): ImmutableList => {
  return new ImmutableListClient(listId, `/list/${listId}`, {}, getCookie);
};
