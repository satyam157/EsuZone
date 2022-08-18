//node server which will handle socket
//here we are running socket.io server which attached itself with http
const io=require('socket.io')(8000)

const users={}

//this socket.io server (io) listen the incoming events. as socket is a particular connection
// io.on is a io instance which listen to many connection
//like rohan,amir,satyam get cinnected and chat with each other.
io.on('connection',socket=>{
    //if any new user joins,let other people connected to the user know
    //socket.on listen to a particular connection, what will happen to a particular connection it will listen to it.
    socket.on('new-user-joined',name => {
        //socker.on is doing what is whenever anyone join the server, it will set the user.id with name.
        //whenever new user joins, client.js emit user name which is accepted by this console.log
        
        // console.log("New User ",name);
        users[socket.id]=name;
        //whenever a new user joined,it say to all old user that he/she has joined the call.
        socket.broadcast.emit('user-joined',name)
    });
    //If someone send the message then it will broadcast that message to everyone, that the message has come
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    //If any user leave the chat, it will notify the rest.
    //if someone leaves the chat let othet know
    //disconnect here is built in, above send,receive all are variable created by me
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        //deleting the that user id from the dictionary
        delete users[socket.id]; 
    });
})