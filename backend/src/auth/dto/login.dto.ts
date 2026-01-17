import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(50),
});

export class LoginDto extends createZodDto(LoginSchema) {}
