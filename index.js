const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
app.use(express.static(__dirname + '/assets'))


io.on('connection', (socket) => {

  // data - emitting value from client (main.js 15)
  socket.on('chat message', (data) => {
    // emit data to client again
    io.emit('chat message', {
      message: data.message,
      name: data.name,
    })
  })
})

http.listen(3001, () => {
  console.log('server started')
})