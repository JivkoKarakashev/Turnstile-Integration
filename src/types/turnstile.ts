interface TurnstileVerifyResponse {
    success: boolean,
    challenge_ts?: string,
    hostname?: string,
    'error-codes'?: string[],
    action?: string,
    cdata?: string
}

interface ApiResponse {
    success: boolean,
    data?: any,
    error?: string,
    codes?: string[] | undefined
}

export {
    type TurnstileVerifyResponse,
    type ApiResponse
}