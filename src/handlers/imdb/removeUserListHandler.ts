import { operationsMap } from "../../utils/operationsMap.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";

export async function removeUserListHandler(
  getCookie: () => string,
  options: { listId: string }
) {
  const cookie = getCookie();
  const op = operationsMap.RemoveList;

  const { data } = await imdbGraphQL<any>(cookie, op, options);

  if (!data || !data.deleteList || !data.deleteList.listId) return false;
  return data.deleteList.listId === options.listId;
}
