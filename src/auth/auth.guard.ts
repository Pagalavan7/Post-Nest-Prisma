import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = await this.jwtService.verifyToken(token);
      request.user = decoded; // Attach user information to the request object
      return true; // User is authenticated
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
