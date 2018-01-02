import { Injectable } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class NotificationService {

    constructor(
        private messageService: NzMessageService,
        private notifiService: NzNotificationService
    ) { }

    success = (msg: string) => {
        this.messageService.success(msg);
    }

    error = (msg: string) => {
        // this.messageService.error(msg, { nzDuration: 5000 });
        this.notifiService.error('系统错误', msg, { nzDuration: 0 });
    }

}
