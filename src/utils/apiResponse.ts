import { ApiResponse } from "../types/turnstile";

function successResponse(data?: any): ApiResponse {
  return { success: true, data };
}

function errorResponse(error: string, codes?: string[]): ApiResponse {
  return { success: false, error, codes };
}

export {
  successResponse,
  errorResponse
}