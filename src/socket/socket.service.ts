import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  sendMessageToClients(channel: string, message: string) {
    if (this.server) {
      this.server.emit(channel, { message });
    }
  }
}
