import express from "express";
import cors, { CorsOptions } from "cors";
// import { onRequest } from "firebase-functions/v2/https";

import config from "./config";
import { validateToken } from "./services/validateToken";
import { boundErrorResponse, boundSuccessResponse } from "./utils/buildResponse";
import { CustomError } from "./types/customError";
import { errorHandler } from "./utils/errorHandler";

const allowedOrigins = [
    'https://jivkokarakashev.dev',
    'https://www.jivkokarakashev.dev',
    'https://portfolio.jivkokarakashev.dev',
    'https://www.portfolio.jivkokarakashev.dev',
    'http://localhost:5173',
    'http://www.localhost:5173',
    'http://127.0.0.1:5173',
    'http://www.127.0.0.1:5173',
];

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Verify Turnstile token
const verifyApp = express();
verifyApp.use(express.json());
verifyApp.use(cors(corsOptions));

verifyApp.get("/sync-error", (_req, _res) => {
    // throw new Error("Synchronous error occurred!");
    throw new CustomError(500, "Synchronous error occurred!");
});

verifyApp.get("/async-error", async (_req, _res, next) => {
    try {
        // await Promise.reject(new Error("Async error occurred!"));
        await Promise.reject(new CustomError(500, "Async error occurred!"));
    } catch (err) {
        next(err);
    }
});

verifyApp.get('/health', (_req, res) => {
    res.json({ ok: true, environment: config.env });
});

verifyApp.post('/verify-turnstile-widget', async (req, res, next) => {
    if (req.method !== "POST") {
        throw new CustomError(405, 'Method Not Allowed');
    }
    const secret = config.turnstile.secretKey;
    // console.log(`Secret: ${secret}`);
    const token = req.body.token || req.body["cf-turnstile-response"];
    // console.log(`Token: ${token}`);
    // console.log(req.body);
    try {
        const verified = await validateToken(secret, token);
        if (verified) {
            return res.status(200).json(boundSuccessResponse());
        }
    } catch (error) {
        next(error);
    }
});

if (config.env === 'development') {
    verifyApp.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`);
    });
}

verifyApp.use(errorHandler);

// export const turnstileVerify = onRequest({ region: "europe-west1" }, verifyApp);

// Proxy Turnstile JS loader
// export const apiProxy = onRequest({ region: "europe-west1" }, async (_req, res) => {
//     try {
//         const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/api.js");
//         const body = await response.text();

//         res.set("Content-Type", "application/javascript");
//         res.set("Cache-Control", "public, max-age=3600");
//         res.send(body);
//     } catch (err) {
//         console.error("Error proxying Turnstile API:", err);
//         res.status(500).send("Failed to load Turnstile script.");
//     }
// });

export {
    verifyApp,
}