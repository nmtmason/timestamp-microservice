var http = require('http');
var url = require('url');

var handler = {
  routes: [],
  addRoute: function (pattern, handler) {
    this.routes.push({ pattern: pattern, handler: handler.bind(this) });
  },
  getRoute: function getRoute (pathname) {
    for (var i = 0; i < this.routes.length; i++) {
      var route = this.routes[i];
      if (route.pattern.test(pathname)) {
        return route;
      }
    }
    return undefined;
  }
};

var routes = Object.create(handler);

routes.createResponse = function (date) {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return JSON.stringify({
    unix: Math.floor(date.getTime() / 1000),
    natural: months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  });
};
routes.addRoute(/^\/(\d+)$/, function (request, response, matches) {
  response.write(this.createResponse(new Date(Number(matches[0]) * 1000)));
  response.end();
});
routes.addRoute(/^\/(\w+) (\d{1,2}), (\d{4})$/, function (request, response, matches) {
  response.write(this.createResponse(new Date(matches[0])));
  response.end();
});
routes.addRoute(/^\/.*$/, function (request, response) {
  response.write(JSON.stringify({ unix: null, natural: null }));
  response.end();
});

var server = http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  var sanitized = pathname.replace(/%20/g, ' ');
  var route = routes.getRoute(sanitized);
  var matches = route.pattern.exec(sanitized);
  route.handler(request, response, matches);
});

server.listen(process.env.PORT);
