import { CustomError } from "../types/customError";
import { TurnstileVerifyResponse } from "../types/turnstile";
import config from "../config";

async function validateToken(secret: string, token: string): Promise<boolean> {
    if (!token) {
        throw new CustomError(400, 'Missing token!');
    }
    if (!secret) {
        throw new CustomError(500, 'Server misconfiguration!');
    }

    const url = config.turnstile.verifyApi;
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            secret,
            response: token
        })
    };
    const cfRes = await fetch(url, options);

    if (!cfRes.ok) {
        throw new CustomError(502, 'Failed to reach Cloudflare!');
    }

    const cfData = await cfRes.json() as TurnstileVerifyResponse;
    if (!cfData.success) {
        throw new CustomError(401, 'Turnstile verification failed!');
    }

    return cfData.success === true;
}

export {
    validateToken
}