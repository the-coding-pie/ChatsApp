const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const name = document.getElementById('name');
const msg = document.getElementById('msg');
const typing = document.getElementById('typing');

msg.addEventListener('focus', () => {
  socket.emit('typing', {
    name: name.value ? name.value : socket.id
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    name: name.value,
    msg: msg.value
  });
  
});

socket.on('message', (data) => {
typing.innerHTML = "";
// reset the msg
const messageElement = `<div class="message">
<span class="name">${data.name}</span>${data.msg}
</div>`;
messages.innerHTML += messageElement;
});

socket.on('typing', (data) => {
  typing.innerHTML = `<div class="message">
    <span class="name">${data.name}</span> is typing...
  </div>`;
});