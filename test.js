const path = require('path')
const SitePrerender = require('./index')

;(async () => {
  const sp = new SitePrerender({
    staticPath: path.join(__dirname, 'dist'),
    outputFolder: path.join(__dirname, 'output'),
    routes: ['/', '/about']
  })

  await sp.init()
  await sp.start()
  await sp.close()

})()
