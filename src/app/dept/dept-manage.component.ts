import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '../shared/notification.service';
import { PeopleDetailComponent } from './people-detail.component';
import { DeptService } from './dept.service';
import { People } from './people';

@Component({
    selector: 'app-dept-manage',
    templateUrl: './dept-manage.component.html'
})

export class DeptManageComponent implements OnInit {

    peopleList: People[] = [];

    people: People = new People();

    deptId: string;

    constructor(
        private notificationService: NotificationService,
        private modalService: NzModalService,
        private deptService: DeptService
    ) { }

    ngOnInit(): void {
        this.deptId = '8a808086591812ec01591812f1860000';
        this.getPeopleList(this.deptId);
    }

    getPeopleList = (deptId: string) => {
        this.deptService.getPeopleList(deptId).subscribe(peopleList => {
            this.peopleList = peopleList;
        });
    }

    modifyPeople = (people: People) => {
        Object.assign(this.people, people);
        this.openPeopleDetail();
    }

    deletePeople = (people: People) => {
        this.deptService.deletePeople(people.idBfPeople).subscribe(data => {
            this.notificationService.success('删除人员成功');
            this.getPeopleList(this.deptId);
        });
    }

    openPeopleDetail = () => {
        const subscription = this.modalService.open({
            title: '人员信息详情',
            content: PeopleDetailComponent,
            footer: false,
            componentParams: {
                people: this.people
            }
        });
        subscription.subscribe(result => {
            if (result === 'add') {
                this.notificationService.success('新增人员成功');
            } else if (result === 'modify') {
                this.notificationService.success('修改人员信息成功');
            }
            this.getPeopleList(this.deptId);
        });
    }
}
