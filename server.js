const server = require('koa')()
const static = require('koa-static')

server.use(static(__dirname + './public'))

server.listen(1337) 
