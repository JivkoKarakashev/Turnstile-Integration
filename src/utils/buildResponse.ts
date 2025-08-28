import { CustomError } from "../types/customError";
import { ReturnResponse } from "../types/turnstile";

function successResponse(verified: true): ReturnResponse {
  return { success: verified, data: { verified } };
}

function errorResponse(verified: false, error: CustomError): ReturnResponse {
  const { statusCode, name, message } = error;
  return { success: verified, data: { verified, error: { statusCode, name, message } } };
}

const boundSuccessResponse = successResponse.bind(null, true);
const boundErrorResponse = errorResponse.bind(null, false);

export {
  boundSuccessResponse,
  boundErrorResponse
}