const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')

const app=express()
const server=http.createServer(app)
const io=socketio(server)

const port=process.env.PORT

const publicDirectory=path.join(__dirname,"../public")
app.use(express.static(publicDirectory))

let count=0

io.on('connection',(socket)=>{
    console.log('new WebSocket connection')

    socket.emit('message','Welcome!')

    // listen to client
    socket.on('message',(message)=>{
        io.emit('message',message)
    })

})

server.listen(port,()=>{
    console.log('server up on port '+port)
})