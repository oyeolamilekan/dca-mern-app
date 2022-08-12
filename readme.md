# DCA core

This app automatically buys crypto on your behalf on Quidax using their API while you sit back, relax and enjoy a cold one.

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
    - Update `.env` with the current attributes
        - `NODE_ENV = development`
        - `PORT = <PORT>`
        - `MONGO_URI = <MONGO_URI>`
        - `JWT_SECRET = <JWT_SECRET>`
        - `ENCRYPTION_KEY = <ENCRYPTION_KEY>` string must be 32 in length
        - `ENCRYPTION_IV = <ENCRYPTION_IV>` string must be 16 in length
        - `QUIDAX_SECRET_API = <QUIDAX_SECRET_API>`
        - `WEBHOOKKEY = <WEBHOOKKEY>`
        - `REDIS_URL = <REDIS_URL>`
    - Setup markets `npm run setup`
- Run the app locally `npm run server`

## APP STRUCTURE

- config: This directory stores all of the configuration for the app.
- constants: This directory stores constants for the application.
- controllers: This directory stores all business logic.
- jobs: This folder contains all cron and backgroud jobs.
- middleware: 
- models:
- plugins:
- routes:
- services: