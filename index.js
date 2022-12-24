const connectToMongo = require('./db')

const bodyparser = require('body-parser');

connectToMongo();

const express = require('express');
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

app.use(bodyparser.urlencoded({extended:false}));

app.use(bodyparser.json())

app.use('/uploads',express.static('uploads'))

// available routes

app.use('/api/auth',require('./Routes/auth.js'))
app.use('/api/blog',require('./Routes/blog.js'))


// Cyclick deplyment setup
const path = require('path')

app.use(express.static(path.join(__dirname, './Frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})