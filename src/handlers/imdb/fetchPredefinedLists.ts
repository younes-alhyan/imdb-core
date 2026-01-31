import type { PredefinedListRecord, EditableList } from "../../types/public.js";
import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { withVariables } from "../../utils/withVariables.js";
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

export const fetchPredefinedLists = async (
  getCookie: () => string,
  getUserId: () => string
): Promise<PredefinedListRecord> => {
  const cookie = getCookie();
  const userId = getUserId();

  const op = operationsMap.GetPredefinedLists;
  const opWithVars = withVariables(op);

  try {
    const { data } = await imdbGraphQL<any>(cookie, opWithVars);

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
      checkins: createList(
        `/user/${userId}/checkins`,
        data.checkins,
        getCookie
      ),
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
  } catch (error: any) {
    console.error(error);
    return {};
  }
};
