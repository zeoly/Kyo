import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { RoleService } from './role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {

    data = [];

    isVisible = false;

    constructor(
        private http: HttpClient,
        private _message: NzMessageService,
        private roleService: RoleService
    ) { }

    ngOnInit(): void {
        this.fetchRoleList();
    }

    fetchRoleList = () => {
        this.roleService.getRoles().subscribe(data => {
            this.data = data;
        });
    }

    openDetail = () => {
        this.isVisible = true;
    }

    saveRole = (e) => {
        const param = {
            name: 'testtesttest',
            description: 'adsfadsfad'
        };
        this.http.post('/role', param).subscribe(data => {
            this.errorNotification('新增角色成功');
            this.isVisible = false;
            this.fetchRoleList();
        });
    }

    closeDetail = (e) => {
        this.isVisible = false;
    }

    delete = (role) => {
        const param = { roleId: role.idBfRole };
        this.http.delete(
            '/role/' + role.idBfRole
        ).subscribe(data => {
            this.errorNotification('删除角色成功');
            this.fetchRoleList();
        });
    }

    errorNotification = (msg) => {
        this._message.create('success', msg);
    }
}
