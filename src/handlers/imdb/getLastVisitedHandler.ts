import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { operationsMap } from "../../utils/operationsMap.js";

export async function getLastVisitedHandler(
  getCookie: () => string,
  options: {
    count: number;
    locale: string;
  }
) {
  const cookie = getCookie();
  const op = operationsMap.GetLastVisited;

  const { data } = await imdbGraphQL<any>(cookie, op, options);

  return data.recentlyViewedItems.edges;
}
