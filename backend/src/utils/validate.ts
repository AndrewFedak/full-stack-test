import { ZodSchema } from 'zod';
import { ValidationException } from '../exceptions/HttpException';

export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationException(result.error.flatten());
  }
  return result.data;
}
