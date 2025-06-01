# -CHAT-APPLICATION

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: JANAPAREDDI VEDHA VARSHINI

*INTERN ID*: CT04DN896

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTHOSH KUMAR

*Description* :

This project is a real-time chat application built using Node.js, Express, and Socket.IO for seamless bidirectional communication between clients and the server. The application allows multiple users to join and exchange messages instantly in a live chat environment.

Key Features
Real-time Messaging: Users can send and receive messages instantly without refreshing the page, enabled by WebSocket technology through Socket.IO.

Backend Server: Built with Express.js, the server handles client connections, broadcasts messages to all connected users, and manages message flow.

MongoDB Integration: Messages are stored persistently in a MongoDB database using Mongoose, allowing chat history to be saved and retrieved.

Simple Frontend: The client-side interface is built with HTML, CSS, and JavaScript, providing a clean and responsive chat UI that updates dynamically as new messages arrive.

Nodemon for Development: Utilizes Nodemon to automatically restart the server during development on code changes, improving productivity.

Architecture Overview
The server listens for new WebSocket connections and manages events such as user messages.

Incoming chat messages are received on the server via Socket.IO, saved to MongoDB, and then broadcasted to all connected clients.

The client connects to the server using Socket.IO’s client library, sends messages to the server, and listens for broadcasted messages to update the chat window in real-time.

Technologies Used
Node.js & Express.js: Server-side JavaScript runtime and web framework.

Socket.IO: Enables real-time bidirectional communication between clients and server.

MongoDB & Mongoose: NoSQL database and object data modeling for persistent message storage.

Nodemon: Development utility to monitor and automatically restart the server.

HTML/CSS/JavaScript: Frontend technologies for creating the user interface.

How It Works
A user opens the chat client in their browser, which connects to the server via Socket.IO.

When the user sends a message, it is emitted to the server.

The server saves the message in the database and broadcasts it to all connected clients.

Each client receives the message event and appends the message to their chat window instantly.

Use Cases
Real-time communication in small groups or communities.

Basis for building more complex chat applications, including private messaging or chat rooms.

Learning project for understanding WebSockets, real-time data handling, and full-stack JavaScript development.

*OUTPUT*:

![Image](https://github.com/user-attachments/assets/c5760e44-6e65-4078-a07e-df0c66fcf11d)
![Image](https://github.com/user-attachments/assets/4e295fc5-9c1b-46be-a258-2ca76133efbd)

