import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';
import { RoleService } from './role.service';
import { Role } from './role';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {

    data = [];

    role: Role = new Role();

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
        this.role.name = 'test士大夫test';
        this.role.description = '时刻都将发挥';
        this.roleService.addRole(this.role).subscribe(data => {
            this.errorNotification('新增角色成功');
            this.isVisible = false;
            this.fetchRoleList();
        });
    }

    closeDetail = (e) => {
        this.isVisible = false;
    }

    delete = (role) => {
        this.roleService.deleteRole(role.idBfRole).subscribe(data => {
            this.errorNotification('删除角色成功');
            this.fetchRoleList();
        });
    }

    modify = (role) => {
        this.role = role;
        this.openDetail();
    }

    errorNotification = (msg) => {
        this._message.create('success', msg);
    }
}
