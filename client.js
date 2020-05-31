const socket = io('http://timoschessl-chat.herokuapp.com/')
const messageContainer = document.getElementById("messagecontainer") 
const messageForm = document.getElementById("sendcontainer") 
const messageInput = document.getElementById("messageinput")

const name = prompt("Please enter your name:")
appendMessage("You joined")
socket.emit("new-user",name)

socket.on('chat-message', data =>
{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>
{
    appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name =>
{
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit' , e =>
{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`)
    socket.emit("send-chat-message",message)
    messageInput.value = '';
})


function appendMessage(message)
{
    const messageElement = document.createElement("div");
    messageElement.innerText = message
    messageContainer.append(messageElement)

}