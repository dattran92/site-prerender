# Site Prerender

- prerender an SPA (react, vue, angular or whatever), for better SEO and first page load


## Installation

```
npm install site-prerender --save
```

## Usage

```
const SitePrerender = require('site-prerender')

const sp = new SitePrerender({
  staticPath: '/my-project/dist,
  outputFolder: '/my-project/output,
  routes: ['/', '/about']
})

await sp.init()
await sp.start()
await sp.close()
```

## How it works

1. Build a temporary express server to serve the SPA.
2. Use `puppeteer` to open a headless browser and crawl the pages based of routes config.
3. Get the HTML rendered in that headless browser
4. Save it the destination

## Example

### Working website with VueJS
[https://blog.dattran.one](https://blog.dattran.one)

### Demo usage
[https://github.com/dattranone/markdown-vue-blog/blob/master/scripts/prerender.js](https://github.com/dattranone/markdown-vue-blog/blob/master/scripts/prerender.js)
