import express from "express";
import cors, { CorsOptions } from "cors";

import config from "./config";
import { validateToken } from "./services/validateToken";
import { successResponse, errorResponse } from "./utils/apiResponse";
import { CustomError } from "./types/customError";
import { onRequest } from "firebase-functions/v2/https";

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
verifyApp.options('*', cors(corsOptions));

verifyApp.get('/health', (req, res) => {
    res.json({ ok: true, environment: config.env });
});

verifyApp.post('/verify-turnstile-widget', async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    const secret = config.turnstile.secretKey;
    // console.log(`Secret: ${secret}`);
    const token = req.body.token || req.body["cf-turnstile-response"];
    // console.log(`Token: ${token}`);
    // console.log(req.body);
    try {
        const verified = await validateToken(secret, token);
        return res.status(200).json(successResponse({ verified: verified }));
    } catch (error) {
        if (error instanceof CustomError) {
            const { statusCode, message } = error;
            return res.status(statusCode).json(errorResponse(message));
        }
    }
});
export const turnstileVerify = onRequest({ region: "europe-west1" }, verifyApp);

// Proxy Turnstile JS loader
export const apiProxy = onRequest({ region: "europe-west1" }, async (_req, res) => {
    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/api.js");
        const body = await response.text();

        res.set("Content-Type", "application/javascript");
        res.set("Cache-Control", "public, max-age=3600");
        res.send(body);
    } catch (err) {
        console.error("Error proxying Turnstile API:", err);
        res.status(500).send("Failed to load Turnstile script.");
    }
});