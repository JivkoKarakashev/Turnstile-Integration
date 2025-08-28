import { CustomError } from "./customError"

interface ApiResponse {
    success: boolean,
    challenge_ts?: string,
    hostname?: string,
    'error-codes': string[],
    action?: string,
    cdata?: string,
    metadata?: {
        ephemeral_id: string
    }
}

interface SuccessData {
    verified: boolean
}

interface ErrorData extends SuccessData {
    error: Error | CustomError
}

interface ReturnResponse {
    success: boolean,
    data: SuccessData | ErrorData
}

export {
    type ApiResponse,
    type SuccessData,
    type ErrorData,
    type ReturnResponse
}