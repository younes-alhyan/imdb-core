import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";

const getOperation = (endpoint: string) => {
  if (endpoint.includes("ratings")) return operationsMap.RemoveRating;
  if (endpoint.includes("watchhistory")) return operationsMap.RemoveFromWatched;
  if (endpoint.includes("watchlist")) return operationsMap.RemoveFromWatchList;
  return operationsMap.RemoveItemFromList;
};

export const removeItemHandler = async (
  endpoint: string,
  getCookie: () => string,
  options: {
    listId: string;
    titleId: string;
  }
): Promise<boolean> => {
  const cookie = getCookie();
  const response = await imdbGraphQL(cookie, getOperation(endpoint), options);
 
  if (response.data) return true;
  return false;
};
