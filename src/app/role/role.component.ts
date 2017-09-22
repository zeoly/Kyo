import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { RoleService } from './role.service';
import { RoleDetailComponent } from './role-detail.component';
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
        private _message: NzMessageService,
        private modalService: NzModalService,
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

    openBlank = () => {
        this.role = new Role();
        this.openDetail();
    }

    openDetail = () => {
        const subscription = this.modalService.open({
            title: '角色详情',
            content: RoleDetailComponent,
            footer: false,
            componentParams: {
                role: this.role
            }
        });
        subscription.subscribe(result => {
            if (result === 'add') {
                this.errorNotification('新增角色成功');
            } else if (result === 'modify') {
                this.errorNotification('修改角色成功');
            }
            this.fetchRoleList();
        });
    }

    delete = (role) => {
        this.roleService.deleteRole(role.idBfRole).subscribe(data => {
            this.errorNotification('删除角色成功');
            this.fetchRoleList();
        });
    }

    modify = (role) => {
        Object.assign(this.role, role);
        this.openDetail();
    }

    errorNotification = (msg) => {
        this._message.create('success', msg);
    }
}
