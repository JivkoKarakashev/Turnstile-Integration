const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.LISTENING_PORT || '3000'),
    turnstile: {
        secretKey: process.env.TURNSTILE_SECRET_KEY,
        verifyApi: process.env.TURNSTILE_VERIFY_API,
    }
}

export default config;