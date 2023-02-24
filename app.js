const express = require('express')
const app = express()
const port = 3000

// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
  })
  
  // POST method route
app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})