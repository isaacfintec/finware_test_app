import Router, { RequestHandler, Express } from 'express';

interface IRoutes {
  path: string;
  method: string;
  handlers: RequestHandler[];
}

export default class RoutesGen {
  static exec(routes: IRoutes[]): Express {
    const router = Router();
    for (const route of routes) {
      const { method, path, handlers } = route;
      router[method](path, handlers);
    }
    return router;
  }

  static generateRoutes(routes): Express {
    const router = RoutesGen.exec(routes);
    return router;
  }
}
