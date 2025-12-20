import type { SortOrder, SortType, TitleType } from "../../types/public.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { operationsMap } from "../../utils/operationsMap.js";

export async function searchHandler(
  getCookie: () => string,
  options: {
    first: number;
    locale: string;
    sortBy: SortType;
    sortOrder: SortOrder;
    query: string;
    titleTypes: TitleType[];
  }
) {
  const cookie = getCookie();

  const { data } = await imdbGraphQL<any>(
    cookie,
    operationsMap.AdvancedTitleSearch,
    options
  );

  return data?.advancedTitleSearch?.edges || [];
}
