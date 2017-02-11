# [Timestamp Microservice](https://www.freecodecamp.com/challenges/timestamp-microservice)

Part of the [freecodecamp](https://www.freecodecamp.com) curriculum.

## Objective

Build a full stack JavaScript app that is functionally similar to this: https://timestamp-ms.herokuapp.com/ and deploy it to Heroku.

1. User Story: I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
2. User Story: If it does, it returns both the Unix timestamp and the natural language form of that date.
3. User Story: If it does not contain a date or Unix timestamp, it returns null for those properties.

## Solution

* Implemented in vanilla node - with no dependencies - to practice working with request and response objects.
* Created a route handler object. This matches incoming requests to a handler function. Each request is matched to a function by way of a regular expression which tests the request path.
* Three handler functions are created.
  1. Matches a number (timestamp).
  2. Matches a date (natural format).
  3. Matches any string (default handler).
* When a new request hits the server, each regular expression is tested in turn until a match is found.
* The function corresponding to the regular expression is invoked. It is passed the request and response objects as well as any captures made from the regular expression.
* It is the responsibility of the handler function to write a response to the client and end the request.
