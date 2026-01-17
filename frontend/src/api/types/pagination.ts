/**
 * API pagination request record
 *
 * To retrieve all items, set `page` to `1` and `size` to `0`.
 */
export type ApiPaginationRequestRecord = {
  /** Page index */
  page?: number;
  /** Page size */
  size?: number;
};

/**
 * API ordering request record
 */
export type ApiOrderingRequestRecord = {
  /** Sort fields: "field" = ASC, "-field" = DESC (e.g. ["-created_at", "name"]) */
  ordering?: string[];
};

/**
 * API pagination response record
 */
export type ApiPaginationResponseRecord<Item> = {
  items: Item[];
  total: number;
  page: number;
  size: number;
  pages: number;
};
