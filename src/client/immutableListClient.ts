import type { ImmutableList } from "../types/public.js";
import { fetchListItems } from "../handlers/immutableList/fetchListItems.js";

export class ImmutableListClient implements ImmutableList {
  constructor(
    public id: string,
    public endpoint: string,
    public data: any,
    protected getCookie: () => string
  ) {}

  async getItems(): Promise<any> {
    return await fetchListItems(this.endpoint, this.getCookie);
  }
}
