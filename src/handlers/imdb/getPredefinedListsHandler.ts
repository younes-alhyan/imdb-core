import type { PredefinedListRecord, EditableList } from "../../types/public.js";
import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { EditableListClient } from "../../client/index.js";

const createList = (
  endpoint: string,
  listData: any,
  getCookie: () => string,
  customId?: string
): EditableList => {
  const { id, ...data } = listData;
  return new EditableListClient(id || customId, endpoint, data, getCookie);
};

export const getPredefinedListsHandler = async (
  getCookie: () => string,
  getUserId: () => string,
  options: {
    isInFavPeopleWeblab: boolean;
    locale: string;
  }
): Promise<PredefinedListRecord> => {
  const cookie = getCookie();
  const userId = getUserId();

  const { data } = await imdbGraphQL<any>(
    cookie,
    operationsMap.GetPredefinedLists,
    options
  );

  if (
    !data?.checkins ||
    !data?.ratings ||
    !data?.watchHistory ||
    !data?.watchlist
  ) {
    throw new Error("No predefined lists data");
  }

  return {
    watchlist: createList(
      `/user/${userId}/watchlist`,
      data.watchlist,
      getCookie
    ),
    checkins: createList(`/user/${userId}/checkins`, data.checkins, getCookie),
    watchHistory: createList(
      `/user/${userId}/watchhistory`,
      data.watchHistory,
      getCookie,
      "watchhistory"
    ),
    ratings: createList(
      `/user/${userId}/ratings`,
      data.ratings,
      getCookie,
      "ratings"
    ),
  };
};
