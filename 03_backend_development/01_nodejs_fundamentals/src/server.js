import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = extractQueryParams(query)

    try {
      return route.handler(req, res);
    } catch (error) {
      if (error.message === 'not_found') return res.writeHead(404).end()
      return res.writeHead(500).end()
    }
  }

  return res.writeHead(404).end();
});

server.listen(3333);
