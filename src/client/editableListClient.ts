import { ImmutableListClient } from "./immutableListClient.js";
import type { EditableList } from "../types/public.js";
import {
  addItemHandler,
  removeItemHandler,
} from "../handlers/editableList/index.js";

export class EditableListClient
  extends ImmutableListClient
  implements EditableList
{
  async addItem({
    titleId,
    includeListItemMetadata = false,
    refTagQueryParam = "tt_ov_lst",
    originalTitleText = false,
    isInPace = true,
    rating,
  }: {
    titleId: string;
    includeListItemMetadata?: boolean;
    refTagQueryParam?: string;
    originalTitleText?: boolean;
    isInPace?: boolean;
    rating?: number;
  }): Promise<any> {
    const options = {
      listId: this.id,
      titleId,
      includeListItemMetadata,
      refTagQueryParam,
      originalTitleText,
      isInPace,
      ...(rating !== undefined ? { rating } : {}),
    };

    return addItemHandler(this.endpoint, this.getCookie, options);
  }

  async removeItem({ titleId }: { titleId: string }): Promise<any> {
    return removeItemHandler(this.endpoint, this.getCookie, {
      listId: this.id,
      titleId,
    });
  }
}
