const path = require('path')
const puppeteer = require('puppeteer')

class Crawler {
  constructor(config) {
    const { headless, baseUrl } = config
    this.baseUrl = baseUrl
    this.headless = headless || true
  }

  async init() {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: this.headless
    })
    this.page = await this.browser.newPage()
  }

  async crawl(crawlPath) {
    const url = path.join(this.baseUrl, crawlPath)
    await this.page.goto(url, {
      waitUntil: 'networkidle2' // TODO: more option to wait for content
    })

    const html = await this.page.content()
    return html
  }

  async close() {
    await this.browser.close()
  }
}

module.exports = Crawler
