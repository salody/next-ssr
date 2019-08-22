const express = require('express')
const next = require('next')

const cacheableResponse = require('cacheable-response')

const port = parseInt(process.env.PORT, 10) || 50001
// const dev = process.env.NODE_ENV !== 'production'
const dev = false
const app = next({ dev })
const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
	ttl: 1000 * 60 * 60, // 1hour
	get: async ({ req, res, pagePath, queryParams }) => ({
		data: await app.renderToHTML(req, res, pagePath, queryParams)
	}),
	send: ({ data, res }) => res.send(data)
})

app.prepare().then(() => {
	const server = express()

	server.get('/article', (req, res) => {
		return app.render(req, res, '/article', req.query)
	})

	server.get('/article/:id', (req, res) => {
		const queryParams = { id: req.params.id }
		const pagePath = '/article'
		console.log('queryParams', queryParams)
		return ssrCache({ req, res, pagePath, queryParams })
	})

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	server.listen(port, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})
