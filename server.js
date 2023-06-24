const path = require("path");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// 接続したユーザーに対するイベント
io.on('connection', (socket) => {

  // chat messageイベントを受信
  socket.on('chat message', (msg) => {
  
    // ユーザーにchat messageイベントでメッセージを送信
    io.emit('chat message', msg);
    
  });
  
  socket.on('disconnect', () => {
  });
});

// ポート3000番でサーバを起動します。
server.listen(3000, () => {
  console.log('listening on *:3000');
});