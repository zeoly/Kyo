import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class NotificationService {

    constructor(
        private message: NzMessageService,
    ) { }

    success = (msg: string) => {
        this.message.success(msg);
    }

    error = (msg: string) => {
        this.message.error(msg, { nzDuration: 5000 });
    }

}
