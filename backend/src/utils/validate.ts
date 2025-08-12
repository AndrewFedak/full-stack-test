import { z } from 'zod';
import { ValidationException } from '../exceptions/HttpException';

export function validate<T extends z.ZodTypeAny>(
  schema: T,
  data: z.input<T>,
): z.output<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationException(result.error.flatten());
  }
  return result.data;
}