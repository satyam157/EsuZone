const socket =io('http://localhost:8000');

//Get DOM elements in respective js variables
//We have to take the form to here by using id selector of DOM
const form=document.getElementById('send-container');
//we are selecting the inputted message from the socket.io
const messageInput=document.getElementById('messageInp');
//it means whenever we get message we have to put it on container.
const messageContainer = document.querySelector(".container");

var audio= new Audio('ting.mp3');

//Function which will append event info to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    if (position=='left'){
        audio.play();
    }
}


//Ask new user for name and let the server know
//prompt come where we have to enter username whenever we refresh the system
const name=prompt("Enter your name to join");
//socket will emit the messge for newly joined user
socket.emit('new-user-joined',name);

//If a new user joins,recive the event or name from the server
socket.on('user-joined',data=>{
    append(`${name} joined the chat`,'right');
})

//if user sends a message,receive it
// whenever index.js socket.on 'send' sends message and tell to braodcast everyone except that sender
//so, as it send 'receive', we have to take it in client and receive it as data and we put it in left/
socket.on('receive',data=>{
    //index.js at last send the name and message by broadcasating
    append(`${data.name}: ${data.message}`,'left');
})

//If a user leaves the chat,append the info to the container
socket.on('left',name=>{
    //index.js at last send the name and message by broadcasating
    append(`${data.name} left the chat`,'left');
})

//If the form gets submitted,send server the message
form.addEventListener('submit',(e)=>{
    //this will prevent the unneccessary loading of page/
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`);
    //sending the message
    socket.emit('send',message);
    //emptying the message box after sending the message
    messageInput.value=''

})


