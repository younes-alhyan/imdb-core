import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { withVariables } from "../../utils/withVariables.js";

const getOperation = (endpoint: string, listId: string, titleId: string) => {
  if (listId === "ratings") {
    return withVariables(operationsMap.RemoveRating, titleId);
  }

  if (listId === "watchhistory") {
    return withVariables(operationsMap.RemoveFromWatched, titleId);
  }

  if (endpoint.includes("watchlist")) {
    return withVariables(operationsMap.RemoveFromWatchList, titleId);
  }

  return withVariables(operationsMap.RemoveItemFromList, listId, titleId);
};

export const removeItemHandler = async (
  endpoint: string,
  listId: string,
  titleId: string,
  getCookie: () => string
): Promise<boolean> => {
  const op = getOperation(endpoint, listId, titleId);

  const cookie = getCookie();
  try {
    const response = await imdbGraphQL(cookie, op);

    if (response.data) return true;
    return false;
  } catch (error) {
    console.error("Failed to add list item:", error);
    return false;
  }
};
