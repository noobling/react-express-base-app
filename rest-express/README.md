# Express + Prisma Backend

## Requirements

- Node
- yarn
- sqlite

## Getting started

1. Create a `.env` file you can ask me for some dev credentials
2. `yarn` to get the dependencies
3. `yarn global add prisma2` get the prisma cli
4. `prisma2 lift up` run database migrations
5. `yarn dev` start the server
6. `prisma2 dev` [optional] get an admin ui to explore your data

## About

This is an example of app. Is it production ready? depends... There are some gotchas that you need to be aware of if you want to use this for prod

- Add some logging I recommend Sentry
- Don't return the entire error handle it that is the point of a try catch
- You probably want some integration tests that simulate a hit to an endpoint but there is unit tests
- Probably more stuff... honestly express is great to get started but isn't great for production for most people use a fully featured framework like Laravel
