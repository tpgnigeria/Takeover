import { HttpStatus } from '@nestjs/common';
import { successResponse } from '../app';
import { AppResponse, PaginatedResponse } from '../types';
import { Model, Document } from 'mongoose';

export class Utils {
  static pickAttributes<T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> {
    return keys.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Pick<T, K>);
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

  static async createEntity<T extends Document, Dto, K extends keyof T>(
    model: Model<T>, // the Mongoose model
    dto: Dto, // DTO used for creation
    attributes: readonly K[], // fields to return
    message: string,
  ): Promise<AppResponse<Pick<T, K>>> {
    const instance = new model(dto);
    const saved = await instance.save();

    const plain = saved.toObject() as T;

    return successResponse(
      message,
      this.pickAttributes<T, K>(plain, attributes),
      HttpStatus.CREATED,
    );
  }
}
