const express = require('express')
const bp = require('body-parser')
const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// GET method route
app.get('/', (req, res) => {
    res.send('GET request to the homepage');
  })
  
  // POST method route
app.post('/', (req, res) => {
    console.log(req.body);
    res.send('POST request to the homepage');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})