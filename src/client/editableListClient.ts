import { ImmutableListClient } from "./immutableListClient.js";
import type { EditableList } from "../types/public.js";
import { addListItem, removeListItem } from "../handlers/editableList/index.js";

export class EditableListClient
  extends ImmutableListClient
  implements EditableList
{
  async addItem(itemId: string, options?: { rating?: number }): Promise<any> {
    return await addListItem(
      this.endpoint,
      this.id,
      itemId,
      this.getCookie,
      options
    );
  }

  async removeItem(itemId: string): Promise<any> {
    return await removeListItem(this.endpoint, this.id, itemId, this.getCookie);
  }
}
