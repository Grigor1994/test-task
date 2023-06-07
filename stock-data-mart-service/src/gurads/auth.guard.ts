import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly AUTH_SERVICE_URL: string;
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.AUTH_SERVICE_URL = this.configService.get('AUTH_SERVICE_URL');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    return axios
      .post(
        `${this.AUTH_SERVICE_URL}/api/auth/verify-token`,
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        return response.status === 200;
      })
      .catch((error) => {
        console.error('Error validating token:', error.message);
        return false;
      });
  }
}
