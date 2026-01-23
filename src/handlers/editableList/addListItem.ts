import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { withVariables } from "../../utils/withVariables.js";

const getOperation = (
  endpoint: string,
  listId: string,
  titleId: string,
  options?: {
    rating?: number;
  }
) => {
  if (listId === "ratings") {
    return withVariables(operationsMap.AddRating, titleId, options?.rating);
  }
  return withVariables(operationsMap.AddItemToList, listId, titleId);
};

export const addListItem = async (
  endpoint: string,
  listId: string,
  titleId: string,
  getCookie: () => string,
  options?: {
    rating?: number;
  }
): Promise<boolean> => {
  const op = getOperation(endpoint, listId, titleId, options);

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
