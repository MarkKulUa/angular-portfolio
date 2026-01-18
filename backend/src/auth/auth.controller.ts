import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register new user
   * POST /api/auth/register
   */
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{
    user: { id: string; email: string; name: string; createdAt: Date };
  }> {
    const result = await this.authService.register(registerDto);

    // Set HttpOnly cookie with token
    this.setAuthCookie(reply, result.access_token);

    return { user: result.user };
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<{
    user: { id: string; email: string; name: string; createdAt: Date };
  }> {
    const result = await this.authService.login(loginDto);

    // Set HttpOnly cookie with token
    this.setAuthCookie(reply, result.access_token);

    return { user: result.user };
  }

  /**
   * Get current user (verify authentication)
   * GET /api/auth/me
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Returns current user' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCurrentUser(
    @Req() request: FastifyRequest & { user: { id: string; email: string; name: string } },
  ): Promise<{
    user: { id: string; email: string; name: string };
  }> {
    const user = request.user;
    return { user };
  }

  /**
   * Logout user
   * POST /api/auth/logout
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  async logout(@Res({ passthrough: true }) reply: FastifyReply): Promise<{ message: string }> {
    // Clear auth cookie by setting Max-Age to 0
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = ['auth_token=', 'Max-Age=0', 'Path=/', 'HttpOnly'];

    if (isProduction) {
      cookieOptions.push('Secure');
      cookieOptions.push('SameSite=None');
    } else {
      cookieOptions.push('SameSite=Lax');
    }

    reply.header('Set-Cookie', cookieOptions.join('; '));

    return { message: 'Logged out successfully' };
  }

  /**
   * Helper method to set auth cookie
   */
  private setAuthCookie(reply: FastifyReply, token: string): void {
    const isProduction = process.env.NODE_ENV === 'production';
    const maxAge = 30 * 60; // 30 minutes in seconds

    // Build cookie string manually
    const cookieOptions = [
      `auth_token=${token}`,
      `Max-Age=${maxAge}`,
      'Path=/',
      'HttpOnly', // Prevents JavaScript access (XSS protection)
    ];

    if (isProduction) {
      // For cross-domain cookies in production
      cookieOptions.push('Secure'); // HTTPS only
      cookieOptions.push('SameSite=None'); // Allow cross-domain
    } else {
      // For local development (same domain)
      cookieOptions.push('SameSite=Lax');
    }

    reply.header('Set-Cookie', cookieOptions.join('; '));
  }
}
