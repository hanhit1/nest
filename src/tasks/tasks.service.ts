import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class TasksService {
    constructor(private readonly socketService: SocketService){}
    @Cron('*/30 * * * * *')
    handleCron() {
        console.log('Task chạy định kỳ mỗi 30 giây:', new Date());
        this.socketService.sendMessageToClients('receiveMessage', `Server: Còn sống không`);
    }
    
}
