const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res) => {
    res.send('POST request to the homepage TEST')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})