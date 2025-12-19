import type { EditableList } from "../../types/public.js";
import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { EditableListClient } from "../../client/editableListClient.js";
import { withVariables } from "../../utils/withVariables.js";

export const getUserListsHandler = async (
  getCookie: () => string
): Promise<EditableList[]> => {
  const cookie = getCookie();
  const op = withVariables(operationsMap.GetUserLists);

  try {
    const { data } = await imdbGraphQL<any>(cookie, op);

    const edges = data?.lists?.edges ?? [];
    if (!edges.length) return [];

    return edges.map((edge: any) => {
      const { id, ...restData } = edge.node;
      return new EditableListClient(id, `/list/${id}`, restData, getCookie);
    });
  } catch (error) {
    console.error("Failed to fetch user lists:", error);
    return [];
  }
};
