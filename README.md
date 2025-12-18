## SETUP

Make sure to create and fill a .env file at project's root. Here is one I used for testing : 

```
API_URL="http://localhost:8080/"
DATABASE_URL="file:./dev.db"
DEFAULT_TTL_MINUTES=60
MAX_SHORTCODE_GENERATION_ATTEMPTS=5
```

```bash 
npm install
npm run start:dev
npx prisma generate
npx prisma db push
```

## Examples

run 
```
curl -X POST http://localhost:8080/shortener/shorten -H "Content-Type: application/json" -d '{"originalUrl":"https://google.com/"}'
```

example output:

```
{"shortUrl":"http://localhost:8080/vRHC7y"}
```

Clicking the url should (hopefully) redirect you to the original URL.

## Notes


I chosed to put a ttl for the redirection, after which the server will not redirect. For now, I didn't delete the actual entry in database because it could prevent old url invalidation.

Let's say we generate a short url one time in Jan, invalidate it, then re allocate it to some other url in Oct, that could lead to bad redirection if urls have not been cleaned by users. For the sake of the exercise I'd rather have dead than wrong links, and eventually expand on url size for more possibilities.

I opted for a random non deterministic approach to short url. I wanted to use the actual id of the DB record to generate the url from it, but wasn't sure I could handle random generation from it with salt an everything in the time frame.

As of now the generation is not fully satisfying but it's ok for a first implementation at low scale to iterate on.


Architecture wise I didn't bother with repositories and just splitted logic in two modules.

And as I'm writing this I realise that there was a requirement on using PostgreSQL, I took a relative shortcut, that's on me.
