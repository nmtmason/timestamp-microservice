class Handler {
  constructor() {
    this.routes = [];
  }

  addRoute(pattern, handler) {
    this.routes.push({ pattern: pattern, handler: handler });
  }

  getRoute(pathname) {
    return this.routes.find(route => route.pattern.test(pathname));
  }
}

module.exports = Handler;
