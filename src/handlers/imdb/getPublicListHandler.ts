import type { ImmutableList } from "../../types/public.js";
import { createImmutableList } from "../../client/index.js";

export const getPublicListHandler = (
  getCookie: () => string,
  listId: string
): ImmutableList => {
  return createImmutableList(listId, `/list/${listId}`, {}, getCookie);
};
