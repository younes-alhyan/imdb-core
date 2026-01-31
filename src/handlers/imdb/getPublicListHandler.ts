import type { ImmutableList } from "../../types/public.js";
import { createImmutableList } from "../../client/index.js";
import { imdbApi } from "../../utils/imdbApi.js";

export const getPublicListHandler = async (
  getCookie: () => string,
  listId: string
): Promise<ImmutableList> => {
  const response = await imdbApi(getCookie(), `/list/${listId}`);

  if (response.includes("data-styled.g404")) throw new Error("List not found");

  return createImmutableList(listId, `/list/${listId}`, {}, getCookie);
};
