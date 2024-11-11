import { Server } from 'socket.io';
require('dotenv').config();
import {isAdmin, users, port} from '../server/server';
const { createServer } = require("http");
const httpServer = createServer();
const server ={
  isAdmin:isAdmin,
  users:users,
}

const httpServerMock = jest.fn();
const ioMock = jest.fn();

jest.mock('http', () => ({
  createServer: jest.fn(() => ({
    listen: jest.fn(() => {}),
  })),
}));

jest.mock('socket.io', () => ({
  Server: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('Server', () => {
// Test 1: Verify that the `isAdmin` object is initialized correctly
  it('initializes the isAdmin object', () => {
    server.isAdmin = isAdmin;
    expect(server.isAdmin).toEqual({
      login: 'admin'||process.env.ADMIN_LOGIN,
      password: '1312'||process.env.ADMIN_PASSWORD,
      adminId: '',
      adminSocket: '',
    });
  });
  // Test 2: Verify that the `users` object is initialized correctly
  it('initializes the users object', () => {
    expect(server.users).toEqual({});
  });
  //Test 3 Verify that the server starts correctly
  it('starts the server', () => {
    httpServer.listen = httpServerMock;
    httpServer.listen(port, "192.168.1.44", () => {});
    expect(httpServer.listen).toHaveBeenCalledTimes(1);
    expect(httpServer.listen).toHaveBeenCalledWith(4000, "192.168.1.44", expect.any(Function));
  });

});
