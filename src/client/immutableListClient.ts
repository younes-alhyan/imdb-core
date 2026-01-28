import type { ImmutableList } from "../types/public.js";
import { getItemsHandler } from "../handlers/immutableList/getItemsHandler.js";

export class ImmutableListClient implements ImmutableList {
  constructor(
    public id: string,
    public endpoint: string,
    public data: any,
    protected getCookie: () => string
  ) {}

  async getItems(): Promise<any> {
    return getItemsHandler(this.endpoint, this.getCookie);
  }
}
