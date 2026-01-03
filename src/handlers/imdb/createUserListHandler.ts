import type {
  EditableList,
  ListType,
  ListVisibility,
} from "../../types/public.js";
import { createEditableList } from "../../client/index.js";
import { imdbGraphQL } from "../../utils/imdbGraphQl.js";
import { operationsMap } from "../../utils/operationsMap.js";

export async function createUserListHandler(
  getCookie: () => string,
  options: {
    name: string;
    listDescription?: string;
    listType?: ListType;
    visibility?: ListVisibility;
    allowDuplicates?: boolean;
  }
): Promise<EditableList> {
  const cookie = getCookie();
  const op = operationsMap.CreateList;
  
  const { data } = await imdbGraphQL<any>(cookie, op, options);
  const id = data.createList.listId;

  return createEditableList(id, `/list/${id}`, {}, getCookie);
}
