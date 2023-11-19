## This is a book-selling web project implemented by Pham Viet Hoang(PH21107), use pnpm as the package management tool

## Main Technologies

- Nodejs/express.
- Prisma.

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
pnpm i
# or
npm i
```

- Create .env file:
```bash
DATABASE_URL="postgresql://postgres:6oB1Do2gudMH1Qxp@db.dzjnhjzivoneaxcgrmfb.supabase.co:5432/postgres"
JWT_SECRET="hehe"

```
## Run project

- Migrate prisma 

```bash
pnpm migrate
# or
npm run migrate
```

- Run server local

```bash
pnpm dev
# or
npm run dev
```

Now the server is running on port 8080 (http://localhost:8080/api).

You can use Postman to fetch data.
