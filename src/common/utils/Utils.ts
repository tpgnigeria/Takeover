import { HttpStatus } from '@nestjs/common';
import { successResponse } from '../app';
import { AppResponse, PaginatedResponse } from '../types';
import { Model, Document } from 'mongoose';
import { NotFoundException } from '../exceptions';

export class AppUtils {
  static pickAttributes<T, K extends keyof T>(
    obj: T,
    keys: readonly K[],
  ): Pick<T, K> {
    return keys.reduce(
      (acc, key) => {
        acc[key] = obj[key];
        return acc;
      },
      {} as Pick<T, K>,
    );
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

export class DBUtils {
  static async createEntity<T extends Document, Dto, K extends keyof T>(
    model: Model<T>,
    dto: Dto,
    attributes: readonly K[],
    message: string,
  ): Promise<AppResponse<Pick<T, K>>> {
    const instance = new model(dto);
    const saved = await instance.save();

    const plain = saved.toObject() as T;

    return successResponse(
      message,
      AppUtils.pickAttributes(plain, attributes),
      HttpStatus.CREATED,
    );
  }

  static async findEntity<T, K extends keyof T>(
    model: Model<T>,
    attributes: readonly K[],
    message: string,
  ): Promise<AppResponse<Pick<T, K>[]>> {
    const entities = await model.find().lean().exec();

    if (!entities.length) {
      return successResponse('No Records Found', [], HttpStatus.NOT_FOUND);
    }

    return successResponse(
      message,
      entities.map((item) =>
        AppUtils.pickAttributes(item as T, [...attributes]),
      ),
    );
  }

  static async findOneEntity<T, K extends keyof T>(
    model: Model<T>,
    filter: Record<string, any>,
    attributes: readonly K[],
    message: string,
    errorMessage: string = 'Entity Not Found',
  ): Promise<AppResponse<Pick<T, K> | null>> {
    const entity = await model.findOne(filter).lean().exec();

    if (!entity) {
      throw new NotFoundException(errorMessage, '');
    }

    return successResponse(
      message,
      AppUtils.pickAttributes(entity as T, [...attributes]),
      HttpStatus.OK,
    );
  }
}
