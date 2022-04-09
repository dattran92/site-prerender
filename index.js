const fse = require('fs-extra')
const path = require('path')

const Serve = require('./lib/serve')
const Crawler = require('./lib/crawler')
const log = require('./lib/log')

class SitePrerender {
  constructor(config) {
    const {
      staticPath,
      routes,
      outputFolder,
    } = config

    this.config = {
      staticPath,
      routes,
      outputFolder,
    }

    this.baseUrl = null
    this.serve = null
    this.crawler = null
  }

  async init() {
    this.serve = new Serve()
    const { baseUrl } = await this.serve.start({
      staticPath: this.config.staticPath
    })
    this.baseUrl = baseUrl
    this.crawler = new Crawler({
      baseUrl
    })
    await this.crawler.init()
  }

  async start() {
    log.info(`Copy ${this.config.staticPath} to ${this.config.outputFolder}`)
    await fse.ensureDir(this.config.outputFolder)
    // copy all static to output folder first
    await fse.copy(this.config.staticPath, this.config.outputFolder)

    log.info('Start crawling')
    for (const route of this.config.routes) {
      log.info('Crawling', route)
      const html = await this.crawler.crawl(route)
      const routeFolder = path.join(this.config.outputFolder, route)
      await fse.ensureDir(routeFolder)
      await fse.writeFile(
        path.join(routeFolder, 'index.html'),
        html
      )
    }
    log.info('Done crawling')
  }

  async close() {
    await this.crawler.close()
    await this.serve.close(this.config.staticPath)
  }
}

module.exports = SitePrerender
