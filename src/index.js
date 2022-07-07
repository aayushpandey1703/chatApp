const express=require('express')
const path=require('path')
const http=require('http')
const socketio=require('socket.io')
const Filter=require('bad-words')
const filter=new Filter()


const app=express()
const server=http.createServer(app)
const io=socketio(server)

const port=process.env.PORT

const publicDirectory=path.join(__dirname,"../public")
app.use(express.static(publicDirectory))

let count=0

io.on('connection',(socket)=>{
    count++
    io.emit('increment',count)

    socket.emit('message','Welcome!')

    socket.broadcast.emit('message','new user entered chat')
    
    // listen to client
    socket.on('message',(message,callback)=>{
        const check=filter.isProfane(message)
        if(check)
            return callback('Please dont use abusive language')
        io.emit('message',message)
        callback('Delivered!')

   
    })

    socket.on('sendLocation',(position,callback)=>{
        io.emit('message','https://google.com/maps?q='+position.latitude+','+position.longitude)
        callback()
    })

    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat')
        count--
        io.emit('increment',count)
    })

})


server.listen(port,()=>{
    console.log('server up on port '+port)
})
