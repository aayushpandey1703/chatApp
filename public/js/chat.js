const socket=io()

socket.on('message',(message)=>{
    console.log(message)    
})

$('#sendMessage').on('submit',(e)=>{
    e.preventDefault()
    var msg=$('#message').val()
    if(msg)
        socket.emit('message',msg)
})

// socket.on('countUpdate',(count)=>{
//     console.log('the count has updated',count)
// })

// // send message from client
// $('#increment').on('click',()=>{
//     socket.emit('increment')
// })

