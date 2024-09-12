import http from 'node:http'

const server = http.createServer((req, res) => {
  return res.end('Hello world')
})

server.listen(3333)