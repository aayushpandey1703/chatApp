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

socket.on('increment',(count)=>{
    document.getElementById('count').innerHTML="<b style='color:red'>"+count+"</b> users online"
})

// socket.on('countUpdate',(count)=>{
//     console.log('the count has updated',count)
// })

// // send message from client
// $('#increment').on('click',()=>{
//     socket.emit('increment')
// })
