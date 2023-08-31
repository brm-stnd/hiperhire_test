## Running the app

```bash
# migrations database
$ npx prisma migrate dev --name init

# seeds data to database
$ npm run seed

# watch mode
$ npm run start:dev
```

## Docs

http://localhost:3000/api/docs

## CURL Example

```bash
#register
curl --location 'http://localhost:3000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "asdfadsfdasf",
    "email": "brm.stnd@gmail.com",
    "password": "cobalagi"
}'

#login
curl --location 'http://localhost:3000/user/login/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "brm.stnd@gmail.com",
    "password": "cobalagi"
}'

#create order
curl --location 'http://localhost:3000/order' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYnJtLnN0bmRAZ21haWwuY29tIiwiaWF0IjoxNjkzNDg5NzMyLCJleHAiOjE2OTQwOTQ1MzJ9.OOeDV1jj8Ubqg1ILdXrhyxUY5pMVMrDemcQrLN0rZy0' \
--header 'Content-Type: application/json' \
--data '{
    "bookId": 3
}'

#Get list order
curl --location 'http://localhost:3000/order?page=2&limit=1' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYnJtLnN0bmRAZ21haWwuY29tIiwiaWF0IjoxNjkzNDg5NzMyLCJleHAiOjE2OTQwOTQ1MzJ9.OOeDV1jj8Ubqg1ILdXrhyxUY5pMVMrDemcQrLN0rZy0' \

#Cancel Order
curl --location --request DELETE 'http://localhost:3000/order/2' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYnJtLnN0bmRAZ21haWwuY29tIiwiaWF0IjoxNjkzNDg5NzMyLCJleHAiOjE2OTQwOTQ1MzJ9.OOeDV1jj8Ubqg1ILdXrhyxUY5pMVMrDemcQrLN0rZy0' \
```
