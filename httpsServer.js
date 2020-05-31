const https = require('https')
const fs = require('fs')
const options = {
  cert: fs.readFileSync(''),
  key: fs.readFileSync('')
}

https.createServer(options, app).listen(443)
