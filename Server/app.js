const express = require('express')

const app = express()

app.use(express.static('./dist'))

app.listen(520, () => {
  console.log('127.0.0.1')
})
