import { WebSocketGateway, WebSocketServer, OnGatewayInit, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server) {
    this.socketService.setServer(server); 
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { sender: string; message: string }): void {
      console.log('Received message:', data);
    this.socketService.sendMessageToClients('receiveMessage', `Server: ${data.message.toUpperCase()}`);
  }

}
