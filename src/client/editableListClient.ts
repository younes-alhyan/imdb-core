import { ImmutableListClient } from "./immutableListClient.js";
import type { EditableList } from "../types/public.js";
import { addItemHandler, removeItemHandler } from "../handlers/editableList/index.js";

export class EditableListClient
  extends ImmutableListClient
  implements EditableList
{
  async addItem(itemId: string, options?: { rating?: number }): Promise<any> {
    return addItemHandler(
      this.endpoint,
      this.id,
      itemId,
      this.getCookie,
      options
    );
  }

  async removeItem(itemId: string): Promise<any> {
    return removeItemHandler(this.endpoint, this.id, itemId, this.getCookie);
  }
}
