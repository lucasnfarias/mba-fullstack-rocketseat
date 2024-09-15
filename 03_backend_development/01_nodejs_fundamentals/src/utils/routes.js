export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-z0-9\-]+)/g
  const pathWithParams = path.replaceAll(routeParamsRegex, '(?<$1>[a-zA-Z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}

export function extractQueryParams(query) {
  if (!query) return {};

  return String(query).substring(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    return {
      ...queryParams,
      [key]: value,
    }
  }, {})
}