import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '../shared/notification.service';
import { RoleService } from './role.service';
import { RoleDetailComponent } from './role-detail.component';
import { Role } from './role';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {

    roles = [];

    selectedRole: Role = new Role();

    isVisible = false;

    constructor(
        private notificationService: NotificationService,
        private modalService: NzModalService,
        private roleService: RoleService
    ) { }

    ngOnInit(): void {
        this.fetchRoleList();
    }

    fetchRoleList = () => {
        this.roleService.getRoles().subscribe(data => {
            this.roles = data;
        });
    }

    openBlank = () => {
        this.selectedRole = new Role();
        this.openDetail();
    }

    openDetail = () => {
        const subscription = this.modalService.open({
            title: '角色详情',
            content: RoleDetailComponent,
            footer: false,
            componentParams: {
                role: this.selectedRole
            }
        });
        subscription.subscribe(result => {
            if (result === '新增' || result === '修改') {
                this.notificationService.success(result + '角色成功');
                this.fetchRoleList();
            }
        });
    }

    delete = (role: Role) => {
        this.roleService.deleteRole(role.idBfRole).subscribe(data => {
            this.notificationService.success('删除角色成功');
            this.fetchRoleList();
        });
    }

    modify = (role: Role) => {
        Object.assign(this.selectedRole, role);
        this.openDetail();
    }

}
