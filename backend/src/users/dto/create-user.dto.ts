import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  password: z.string().min(3).max(50),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
