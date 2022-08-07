import io from 'socket.io-client'


// const socket = io('ws://localhost:8081');
let socket: any

// 连接服务器, 得到与服务器的连接对象
// const socket = require('socket.io-client')('http://localhost:8081')
// 绑定监听, 接收服务器发送的消息

export function getInstance() {
  if(!socket) {
    socket = io({
      protocols: ["http"],
    });
    socket.on('error', async () => {
      // 更新数据库status中的socket.id
    });
    
  }
  return socket;
}

export function disconnectInstance() {
  if(socket) {
    socket.disconnect()
    socket = null
  }
}

