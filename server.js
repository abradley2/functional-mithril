const fs = require('fs')
const server = require('koa')()
const static = require('koa-static')
const router = require('koa-router')()

const index = fs.readFileSync(__dirname + '/public/index.html', 'utf8')

router.get('/app/*', function* () {
	this.response.type = 'text/html'
	this.response.body = index
})

server.use(static(__dirname + '/public'))

server.use(router.routes())


server.listen(1337)
