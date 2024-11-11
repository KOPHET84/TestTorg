require('dotenv').config();
const port =  process.env.SERVER_PORT||4000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
      origin: true, // connection decision
      credentials: true
    }
  });
let connectUser = 0; 
let users = {}
const isAdmin ={
  login:'admin'||process.env.ADMIN_LOGIN,
  password:'1312'||process.env.ADMIN_PASSWORD,
  adminId:'',
  adminSocket : ''
};
let usersTime = [];
let usersTorg = {};

/*io.use((socket, next) => {
  // Obtaining the client's IP address
  const ip = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
  socket.ip = ip;
  next();
});*/

io.on('connection', (socket) => {
  connectUser++;
  users[socket.id] = connectUser
  if(isAdmin.adminId.length>0){
    isAdmin.adminSocket.emit('sendUsers', Object.keys(users));
  }

  
  socket.on('goTorg', ()=>{
    usersTorg[socket.id] = 1000;
    io.emit('yourTorg', Object.keys(usersTorg));
    io.emit('sendPlus', Object.values(usersTorg));
    socket.emit('yourId', socket.id);
    io.emit('sendTime', usersTime);
  })

  socket.on('goHome', ()=>{
    delete usersTorg[socket.id];
    io.emit('sendPlus', Object.values(usersTorg));
    io.emit('yourTorg', Object.keys(usersTorg));
  });
  socket.on('plus', ()=>{
    usersTorg[socket.id] +=200;
    io.emit('sendPlus', Object.values(usersTorg))
  });

  socket.on('update', ()=>{
    io.emit('sendPlus', Object.values(usersTorg));
    io.emit('yourTorg', Object.keys(usersTorg));
  });

  socket.on('startTorg', ()=>{
    for (let key in usersTorg) {
      usersTorg[key] = 1000;
    };
    io.emit('yourTorg', Object.keys(usersTorg));
    io.emit('sendPlus', Object.values(usersTorg));
    io.emit('start', true);
  })

  socket.on('stopTorg', ()=>{
    io.emit('start', false);
  })

  socket.on('massTime', (mass)=>{
    usersTime = [...mass];
    io.emit('sendTime', mass);
  });



  socket.on('sendVerify', (mess)=>{// verification
    if(isAdmin.login===mess.login&&isAdmin.password===mess.password&&isAdmin.adminId.length===0){
      socket.emit('backVerify', true, socket.id); 
      isAdmin.adminId = socket.id;
      isAdmin.adminSocket = socket;
      console.log('admin is online')
    }else{socket.emit('backVerify', false)}
  });
  //
  socket.on('returnVerify', ()=>{
    socket.emit('backVerify', false);
    isAdmin.adminId = '';
    isAdmin.adminSocket ='';
    console.log('admin is offline');
  })


  socket.on('disconnect', () => {
        if(socket.id === isAdmin.adminId){
          isAdmin.adminId = '';
          isAdmin.adminSocket = '';
          console.log('admin is offline')
        }
        delete usersTorg[socket.id]
        delete users[socket.id]
        connectUser--;
        if(isAdmin.adminId.length>0){
          isAdmin.adminSocket.emit('sendUsers', Object.keys(users));
        }

    io.emit('numbersUsers',connectUser);
    io.emit('yourTorg', Object.keys(usersTorg));
    io.emit('sendPlus', Object.values(usersTorg));
  });
});

httpServer.listen(port, () => {
    console.log(`Server is running on pOrt ${port}`);
});

module.exports = {isAdmin, users, port};
