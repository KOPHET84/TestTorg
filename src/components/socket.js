import { io } from 'socket.io-client';
const socket = io('http://192.168.1.44:4000', {
    withCredentials: true
}); 
export default socket;
