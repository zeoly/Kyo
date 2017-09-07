import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {

    data = [];

    isVisible = false;

    constructor(private http: HttpClient, private _message: NzMessageService) { }

    ngOnInit(): void {
        this.http.get('/role').subscribe(data => {
            this.data = data['data'];
        });
    }

    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        console.log('点击了确定');
        this.isVisible = false;
    }

    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }

    delete = (role) => {
        const param = { roleId: role.idBfRole };
        this.http.delete(
            '/role/' + role.idBfRole
        ).subscribe(data => {
            this.errorNotification(data['msg']);
            console.log(data);
        });
    }

    errorNotification = (msg) => {
        this._message.create('error', msg, { nzDuration: 4000 });
    }
}
