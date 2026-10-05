/**
 * Deterministic API Response Contracts
 * Strictly adhering to docs/ARCHITECTURE.md §4.2 and docs/RULES.md §8
 */

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetail;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function createSuccessResponse<T>(data: T, meta?: ApiSuccessResponse<T>['meta']): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };
}

export function createErrorResponse(code: string, message: string, details?: unknown): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
}
