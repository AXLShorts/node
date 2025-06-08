export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  status: number;
  message: string;
}

export const createSuccessResponse = <T>(
  data: T,
  message = 'Success',
  status = 200
): ApiResponse<T> => ({
  success: true,
  data,
  status,
  message,
});

export const createErrorResponse = (message: string, status = 500): ApiResponse => ({
  success: false,
  status,
  message,
});
