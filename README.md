
# Simple microservice using redis stream

  

![example workflow](https://github.com/khaninejad/nodejs-simpleMicroservice/workflows/Node.js%20CI/badge.svg)
Make sure that you installed the [Redis](https://redis.io/)

Install dependencies:

    npm install

Start the service:

    npm run service

Open another terminal and Send a message:

    node src/register/register.js --email=\"email@gmail.com\" --firstname=\"Payam\" --lastname=\"Khaninejad\"



