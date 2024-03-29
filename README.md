## This is a book-selling web project, use npm as the package management tool

## Main Technologies

- Node.js/Express.js
- Prisma

## Installation

- Clone the Project:

```bash
git clone https://github.com/hoangbru/bookee-api.git
```
- Access the project on your local machine:

```bash
cd bookee-api
```

- Install all packages:

```bash
npm i
# or
pnpm i
```

- Create .env file:
```bash
DATABASE_URL=""
DIRECT_URL=""
JWT_SECRET=""

```
## Run project

- Migrate prisma 

```bash
npm migrate
# or
pnpm run migrate
```

- Run server local

```bash
npm dev
# or
pnpm run dev
```

Now the server is running on port 8080 (http://localhost:8080/api).

You can use Postman to fetch data.
