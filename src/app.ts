import { onRequest } from "firebase-functions/v2/https";

import { verifyApp } from "./turnstile";

exports.turnstileVerify = onRequest({ region: "europe-west1" }, verifyApp);