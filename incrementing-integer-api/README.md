# Increment Integer API

## Live
[http://increment-integer.api.fillipemassuda.com/v1](http://increment-integer.api.fillipemassuda.com/v1)

# Documentation
The API has the following resources

`GET /health`
* Return 200 OK if the API is alive
```
curl  http://increment-integer.api.fillipemassuda.com/v1/health 
```

`POST /auth`
* receives the email and password and return the access_token
* Returns 201 if the session was created
* Returns 400 if one of the required inputs were missing
```
curl -X "POST" http://increment-integer.api.fillipemassuda.com/v1/auth --data '{"email": "john.doe@example.com", "password": "password"}' -H "Content-Type:application/json"
```

`GET /next`
* Get the next integer value
* Returns 200 if the session was created
* Returns 401 if request is unauthorized
```
curl http://increment-integer.api.fillipemassuda.com/v1/next -H "Authorization: Bearer <access_token>"
```

`GET /current`
* Get the current integer value
* Returns 200 if the session was created
* Returns 401 if request is unauthorized
```
curl http://increment-integer.api.fillipemassuda.com/v1/current -H "Authorization: Bearer <access_token>"
```

`PUT /current`
* Updates the current value
* Returns 204 if the session was updated
* Returns 401 if request is unauthorized
```
curl -X "PUT" http://increment-integer.api.fillipemassuda.com/v1/current -H "Authorization: Bearer <access_token>" --data "current=1000"
```

**TODO:** Create a swagger file to describe the API

# Run Locally
## Configuration
**Environment Variables:**
- PORT - Port to expose API - Optional : Default 3000
- REDISHOST : Default to localhost
- REDISPORT : Default to 6379

```
# install dependencies
npm install

npm start

# to run in development mode with eslint verification and live-reload
grunt

```
**Testing with mocha**
```
grunt test
```

## Docker

Build and create the image:

```
docker build -t increment-integer-api .

docker run -p 3000:3000 -it increment-integer-api
```

You can get my latest image in docker hub by pulling fimassuda/increment-integer-api:latest

## Docker Compose

Running the `docker-compose.yml` will create a redis container and links it to increment-integer-api container.

```
docker-compose up
```
