# Auth App

NodeJS / Express based API for user authentication

## API Documentation

- Login API
`POST /v1/auth/login`
`Payload - {email: string, password: string}`
`Response - 200 {token: string} , 400 {error: string, message: string}`

- Register API
`POST /v1/auth/register`
`Payload - {firstName:string, lastName:string, email:string, password:string, password: string}`
`Response - 200  , 400 {error: string, message: string}`

- Get Details API
`GET /v1/auth/me`
`Headers - {Authorization: Bearer <token>}` pass the token returned from login API
`Response - 200, 401 {error: string, message: string}`

## How to Run

1. Setup Mongo DB
2. Clone the repo locally `git clone https://github.com/sirohiwebdev/auth-app-assignment.git`
3. Install dependencies `npm i`
4. Setup ENV

   ```env
   SERVER_HOST=http://localhost:3000
   PORT=3000
   GOOGLE_CLIENT_ID=a=client-id
   GOOGLE_CLIENT_SECRET=secret-id
   FACEBOOK_CLIENT_ID=fb-client-id
   FACEBOOK_CLIENT_SECRET=fb-secret
   MONGODB_HOST=localhost
   MONGODB_PORT=27017
   MONGODB_DATABASE=authapp

    ```

5. Run the server using `npm start`
