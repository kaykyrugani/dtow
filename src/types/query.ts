export interface QueryOptions<T = any> {
  select?: Record<keyof T, boolean>;
  include?: Record<string, boolean | QueryOptions>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  where?: any;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 