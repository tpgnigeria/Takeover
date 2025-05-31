import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ForbiddenException } from '../../../common/exceptions';

@Injectable()
export class SuperGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const admin = request.admin;

    if (!admin || admin.role !== 'super') {
      throw new ForbiddenException(
        'Invalid Access Criteria',
        'Only super admins are allowed to access this route',
      );
    }

    return true;
  }
}
