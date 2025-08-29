# Cloudflare Turnstile Verification (Express + TypeScript)

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/express-5.x-lightgrey)](https://expressjs.com/)
[![Cloudflare](https://img.shields.io/badge/cloudflare-turnstile-orange)](https://developers.cloudflare.com/turnstile/)

## Overview
An example **backend validation setup** for [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/), built with **Express** and **TypeScript**.  
This project shows how to validate a Turnstile token securely on the server side.

## Table of Contents

- [Overview](#overview)
- [Application development description](#application-development-description)
- [Project Structure](#project-structure)
- [How to run it?](#how-to-run-it)
- [License](#license)
- [Credits](#credits)

## Application development description

1. Developed with Visual Studio Code v.1.86.1 + Node.js v.20.10.0.
2. Used libs:

   - [@dotenvx/dotenvx v.1.48.4](https://www.npmjs.com/package/@dotenvx/dotenvx/v/1.48.4)
   - [cors v.2.8.5](https://www.npmjs.com/package/cors/v/2.8.5)
   - [@types/cors v.2.8.19](https://www.npmjs.com/package/@types/cors/v/2.8.19)
   - [express v.5.1.0](https://www.npmjs.com/package/express/v/5.1.0)
   - [@types/express v.5.0.3](https://www.npmjs.com/package/@types/express/v/5.0.3)
   - [@types/node v.24.3.0](https://www.npmjs.com/package/@types/node/v/24.3.0)
   - [typescript v.5.9.2](https://www.npmjs.com/package/typescript/v/5.9.2)
   - [@types/cloudflare-turnstile v.0.2.2](https://www.npmjs.com/package/@types/cloudflare-turnstile/v/0.2.2)
   - [firebase v.12.1.0](https://www.npmjs.com/package/firebase/v/12.1.0)
   - [firebase-admin v.13.4.0](https://www.npmjs.com/package/firebase-admin/v/13.4.0)
   - [firebase-functions v.6.4.0](https://www.npmjs.com/package/firebase-functions/v/6.4.0)

## Project Structure

- **`/src`**: Contains Cloudflare Turnstile Verification App.
  - `app`: Firebase Cloud Function entry.
  - `config`: Manage ENV variables and app-level constants in one place.
  - `turnstile`: app’s endpoints (URIs) respond to client requests plus verification logic.
    - `/services`: app calls Cloudflare's API for token validation.
    - `/types`: type definitions.
    - `/utils`: building a response based on whether validation passed or an error/exception was raised plus error handler that catches these errors/exceptions.

## How to run it?

1. **Prerequisites:**

- _`Node.js`_: Make sure you have [Node.js](https://nodejs.org/) and npm installed on your machine. You can download them from https://nodejs.org/.

- _`VSCode`_: [Install Visual Studio Code](https://code.visualstudio.com/) (VSCode) if you haven't already. You can download it from https://code.visualstudio.com/.

2. **Steps**

- **Clone the Repository:**
  - Clone project repository to your local machine using a version control tool like Git. Open your terminal and run:
  ```bash
  git clone https://github.com/JivkoKarakashev/Turnstile-Integration.git
  ```
  - Navigate to the root folder of the project:
  ```bash
  cd Turnstile-Integration
  ```
- **Install Dependencies:**
  - Navigate to the root directory of the project and install the dependencies.
    - In the 'root' directory, install dependencies by running:
    ```bash
    npm install
    ```
- **Transpile TypeScript source code to JavaScript:**
  - Navigate to the root directory of the project.
    - In the 'root' directory, transpile TypeScript source code to JavaScript by running:
    ```bash
    npm run build
    ```
- **Start the Server:**
  - Navigate to the ./dist directory and start the Express.js server. 
    - In the 'root' directory, navigate to ./dist directory:
      ```bash
	    cd dist
	    ``` 
    - In the 'dist' directory run:
      ```bash
	    node app.js
	    ```
    This will start the API Service, and you should see output 'Server is listening on port 3000. You can make requests to http://localhost:3000/*ENDPOINTS/' indicating that the service API is running.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.

## Credits

[ChatGPT](https://chatgpt.openai.com)