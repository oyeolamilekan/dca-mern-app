# DCA core

DCA is an app that automatically schedules purchase of crypto assets from QUIDAX exchage.

## Features

DCA core features include:

- Create purchase plans
- Pause ongoing purchase plans
- Recieve webhook events on transaction executed.
- Fetch all processed transactions
- See ongoing plans.

## Installation

- `git clone <this_url> && cd <repo_name>`
- `install npm on the app`
- Configure Server
    - Create `.env`
    - Update `.env` with the current attributs
        `NODE_ENV = development`
        `PORT = <PORT>`
        `MONGO_URI = <MONGO_URI>`
        `JWT_SECRET = <JWT_SECRET>`
        `ENCRYPTION_KEY = <ENCRYPTION_KEY>` string must be 32 in length
        `ENCRYPTION_IV = <ENCRYPTION_IV>` string must be 16 in length
        `QUIDAX_SECRET_API = <QUIDAX_SECRET_API>`
        `WEBHOOKKEY = <WEBHOOKKEY>`
        `REDIS_URL = <REDIS_URL>`
