export interface PaginationParams<T = any> {
  page?: number;
  limit?: number;
  where?: Record<string, any>;
  orderBy?: {
    [K in keyof T]?: 'asc' | 'desc';
  };
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface QueryOptions<T = any> extends PaginationParams<T> {
  select?: Record<string, boolean>;
  include?: Record<string, boolean | QueryOptions>;
}
