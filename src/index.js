require('dotenv').config();

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const { Handler } = require('./handler');

let handler = new Handler();

const isValidDate = date => {
  return date instanceof Date && !isNaN(date);
};

const createResponse = date => {
  if (!isValidDate) {
    return {
      error: 'Invalid Date'
    };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
};

handler.addRoute(/^\/api\/timestamp\/(\d+)\/?$/, function(req, res, matches) {
  let json = createResponse(new Date(Number(matches[1])));
  res.write(JSON.stringify(json));
  res.end();
});

handler.addRoute(/^\/api\/timestamp\/(.+)\/?$/, function(req, res, matches) {
  let json = createResponse(new Date(matches[1]));
  res.write(JSON.stringify(json));
  res.end();
});

handler.addRoute(/^\/api\/timestamp\/?$/, (req, res) => {
  let json = createResponse(new Date());
  res.write(JSON.stringify(json));
  res.end();
});

handler.addRoute(/$.*$/, (req, res) => {
  let json = { error: 'Invalid URL' };
  res.write(JSON.stringify(json));
  res.end();
});

let server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  let unescaped = querystring.unescape(pathname);
  let route = handler.getRoute(unescaped);
  let matches = route.pattern.exec(unescaped);
  route.handler(req, res, matches);
});

server.listen(process.env.PORT);
