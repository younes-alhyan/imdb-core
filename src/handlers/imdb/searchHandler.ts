import type { SortOrder, SortType, TitleType } from "../../types/public.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { withVariables } from "../../utils/withVariables.js";
import { operationsMap } from "../../utils/operationsMap.js";

export async function searchHandler(
  getCookie: () => string,
  query: string,
  options?: {
    first?: number;
    locale?: string;
    sortBy?: SortType;
    sortOrder?: SortOrder;
    titleTypes?: TitleType[];
  }
) {
  const cookie = getCookie();

  const op = withVariables(
    operationsMap.AdvancedTitleSearch,
    query,
    options?.first,
    options?.locale,
    options?.sortBy,
    options?.sortOrder,
    options?.titleTypes
  );

  const { data } = await imdbGraphQL<any>(cookie, op);

  return data?.advancedTitleSearch?.edges || [];
}
