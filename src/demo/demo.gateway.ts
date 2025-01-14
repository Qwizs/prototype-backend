import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, MessageBody, WsResponse, ConnectedSocket  } from '@nestjs/websockets';
import { subscribe } from 'diagnostics_channel';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DemoGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any) {
    this.server.to(data.room).emit("events",data)
  }

  @SubscribeMessage('connectionRoom')
  connection(@ConnectedSocket() socket: Socket,@MessageBody() data: any){
    socket.join(data.room);
    this.server.to(data.room).emit("events",{"user":"server",message:`${data.user} joined`});
  }
}