const socket = io();

const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const joinBtn = document.getElementById('join-btn');
const usernameInput = document.getElementById('username');
const roomSelect = document.getElementById('room-select');

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const userList = document.getElementById('user-list');

let username = '';
let room = '';

// Join chat room
joinBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  room = roomSelect.value;

  if (!username) {
    alert('Please enter a username');
    return;
  }

  // Hide login, show chat
  loginContainer.style.display = 'none';
  chatContainer.style.display = 'flex';

  // Join the room
  socket.emit('join room', { username, room });
});

// Listen for user list updates
socket.on('user list', (users) => {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });
});

// Listen for chat messages
socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.innerHTML = `<strong>${msg.user}</strong> <span style="color: gray; font-size: 0.8em;">${msg.time ? '[' + msg.time + ']' : ''}</span>: ${msg.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

// Load existing messages when joining a room
socket.on('load messages', (msgs) => {
  messages.innerHTML = '';
  msgs.forEach(msg => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${msg.user}</strong> <span style="color: gray; font-size: 0.8em;">${msg.time ? '[' + msg.time + ']' : ''}</span>: ${msg.text}`;
    messages.appendChild(item);
  });
  messages.scrollTop = messages.scrollHeight;
});

// Send message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    socket.emit('chat message', {
      user: username,
      text: input.value.trim(),
      room,
      time: timestamp
    });
    input.value = '';
  }
});
