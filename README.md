# [Timestamp Microservice](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice)

Part of the [freecodecamp](https://www.freecodecamp.com) curriculum.

## Objective

Build a full stack JavaScript app that is functionally similar to this: https://curse-arrow.glitch.me/

## Solution

- Implemented in vanilla node to practice working with request and response objects.
- Created a route handler class. This matches incoming requests to a handler function. Each request is matched to a function by way of a regular expression which tests the request path.
- Three handler functions are created.
  1.  Matches a number (timestamp).
  2.  Matches a date (date string).
  3.  Matches any string (default handler).
- When a new request hits the server, each regular expression is tested in turn until a match is found.
- The function corresponding to the regular expression is invoked. It is passed the request and response objects as well as any captures made from the regular expression.
- It is the responsibility of the handler function to write a response to the client and end the request.
- See testing.http for example usage.
