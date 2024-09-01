import express from 'express'

import routes from './routes/route-chatwoot'
class ServerHttp {
    app;
    port = process.env?.PORT_API
    providerWs;
    constructor(_providerWs) {
        this.providerWs = _providerWs
    }

    build = () => {
        this.app = express()
            .use(express.json())
            .use((req, _, next) => {
                req.providerWs = this.providerWs
                next()
            })
            .use(routes)
            .listen(this.port, () => console.log(`Server running on port ${this.port}`))
    }

    start = () => {
        this.build()
    }
}

export default ServerHttp