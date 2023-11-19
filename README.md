## This is a book-selling web project implemented by Pham Viet Hoang(PH21107)

## Main Technologies

- Nodejs/express.
- Prisma.

## Installation

- Clone the Project:

```bash
git clone https://github.com/hoangbru/spotify-clone.git
```

- Create .env file:
```bash
DATABASE_URL="postgresql://postgres:6oB1Do2gudMH1Qxp@db.dzjnhjzivoneaxcgrmfb.supabase.co:5432/postgres"
JWT_SECRET="hehe"

```
## Run project:

- Migrate prisma 

```bash
npm run migrate
# or
yarn migrate
# or
pnpm migrate
```

- Run server local

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can use Postman to fetch data .
