![_2cd35ae8-cdf6-47a6-a7a7-c5503281eed2](https://user-images.githubusercontent.com/74973675/232787524-f2835514-6b0c-4b29-b94d-a87fe3d57552.jpeg)

# How to work on your environment

## 1. Get the OpenAI api key

You can get the api key from [Your OpenAI account](https://platform.openai.com/account/api-keys).

## 2. Set the api key

You can set the api key on .env file.

```.env
# When adding additional environment variables, the schema in "/src/env.mjs"
# should be updated accordingly.

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

# OpenAI
OPENAI_API_KEY= // <- Set your api key here!!
```

## 3. Install dependencies

```bash
$ yarn

or 

$ npm install
```

## 4. Run the development server

```bash
$ yarn dev

or

$ npm run dev
```

## 5. Open the app

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
