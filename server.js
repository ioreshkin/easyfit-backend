const http = require('http')
const hostname = '127.0.0.1'
const port = 3002
const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    if (req.url == "/") {
        res.end("хуяка");
    }
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})