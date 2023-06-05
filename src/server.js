const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Home Page!')
})

app.get('/product', (req, res) => {
  res.send('Product Page!')
})

app.get('/product/:id', (req, res) => {
  res.send('Product Detail Page!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})