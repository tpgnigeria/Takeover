import { PaginatedResponse } from '../types';

export class Utils {
  static pickAttributes<T>(obj: T, keys: (keyof T)[]): Partial<T> {
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Partial<T>);
  }

  static paginateResponse<T = any>(
    data: [T[], number],
    page: number,
    take: number,
  ): PaginatedResponse<T> {
    const [result, total] = data;
    const lastPage = Math.ceil(total / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      results: [...result],
      pageData: {
        total,
        currentPage: +page,
        nextPage,
        prevPage,
        lastPage,
      },
    };
  }

  static calcSkip(page: number, limit: number) {
    return (page - 1) * limit;
  }
}
