import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";

const getOperation = (endpoint: string) => {
  if (endpoint.includes("watchlist")) return operationsMap.AddToWatchList;
  if (endpoint.includes("watchhistory")) return operationsMap.AddToWatched;
  if (endpoint.includes("ratings")) return operationsMap.AddRating;
  return operationsMap.AddItemToList;
};

export const addItemHandler = async (
  endpoint: string,
  getCookie: () => string,
  options: {
    listId: string;
    titleId: string;
    includeListItemMetadata: boolean;
    refTagQueryParam: string;
    originalTitleText: boolean;
    isInPace: boolean;
    rating?: number;
  }
): Promise<boolean> => {
  const { listId, rating } = options;
  if (listId === "ratings" && !rating) {
    throw new Error("Ratings list must include rating to add item");
  }

  const cookie = getCookie();
  const response = await imdbGraphQL(cookie, getOperation(endpoint), options);

  if (response.data) return true;
  return false;
};
