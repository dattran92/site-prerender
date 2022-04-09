const express = require('express')
const fp = require('find-free-port')
const path = require('path')

const log = require('./log')

class Serve {
  constructor() {
    this.app = express()
    this.httpServer = null
  }

  async start(config) {
    const { staticPath } = config
    const [freeP] = await fp(3000)
    this.httpServer = this.app.listen(freeP, () => {
      log.info(`Server started at http://localhost:${freeP}`)
    })

    this.app.use(express.static(staticPath))
    this.app.use((req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'))
    })

    return {
      baseUrl: `http://127.0.0.1:${freeP}`,
    }
  }

  async close() {
    if (this.httpServer) {
      await this.httpServer.close()
      this.httpServer = null
      log.info('Server stopped')
    }
  }
}

module.exports = Serve

