import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { NotificationService } from '../shared/notification.service';
import { DepartmentDetailComponent } from './department-detail.component';
import { PeopleDetailComponent } from './people-detail.component';
import { DeptService } from './dept.service';
import { Department } from './department';
import { People } from './people';

@Component({
    selector: 'app-dept-manage',
    templateUrl: './dept-manage.component.html'
})

export class DeptManageComponent implements OnInit {

    peopleList: People[] = [];

    people: People = new People();

    deptList: Department[];

    selectedDept: Department = new Department();

    constructor(
        private notificationService: NotificationService,
        private modalService: NzModalService,
        private deptService: DeptService
    ) { }

    ngOnInit(): void {
        this.getAllDepartment();
    }

    getAllDepartment(): void {
        this.deptService.getAllDepartment().subscribe(departmentList => {
            this.deptList = departmentList;
            this.preHandleDept(this.deptList);
        });
    }

    selectDept(e: { option: Department, index: number }): void {
        this.selectedDept = e.option;
    }

    clearDept(): void {
        this.selectedDept = new Department();
    }

    _console(value) {
        console.log(value);
    }

    getPeopleList = (deptId: string) => {
        this.deptService.getPeopleList(deptId).subscribe(peopleList => {
            this.peopleList = peopleList;
        });
    }

    addPeople(): void {
        this.people = new People();
        this.people.departmentId = this.selectedDept.idBfDepartment;
        this.openPeopleDetail();
    }

    modifyPeople = (people: People) => {
        Object.assign(this.people, people);
        this.openPeopleDetail();
    }

    deletePeople = (people: People) => {
        this.deptService.deletePeople(people.idBfPeople).subscribe(data => {
            this.notificationService.success('删除人员成功');
            this.getPeopleList(this.selectedDept.idBfDepartment);
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
            if (result === '修改' || result === '新增') {
                this.notificationService.success(result + '人员信息成功');
                this.getPeopleList(this.selectedDept.idBfDepartment);
            }
        });
    }

    loadChildDept(e: { option: Department, index: number, resolve: Function, reject: Function }): void {
        e.resolve(e.option.childDepartmentList);
    }

    preHandleDept = (deptList: Department[]) => {
        deptList.forEach(dept => {
            if (!dept.childDepartmentList || dept.childDepartmentList.length === 0) {
                dept.isLeaf = true;
            } else {
                this.preHandleDept(dept.childDepartmentList);
            }
        });
    }

    addDepartment = () => {
        this.openDepartmentDetail(new Department(), this.selectedDept);
    }

    openDepartmentDetail = (department: Department, parentDepartment: Department) => {
        let dept: Department = new Department();
        let parentDept: Department = new Department();
        dept = Object.assign(dept, department);
        dept.parent = null;
        parentDept = Object.assign(parentDept, parentDepartment);
        const subscription = this.modalService.open({
            title: '机构信息详情',
            content: DepartmentDetailComponent,
            footer: false,
            componentParams: {
                department: dept,
                parentDepartment: parentDept
            }
        });
        subscription.subscribe(result => {
            if (result === '修改' || result === '新增') {
                this.notificationService.success(result + '机构信息成功');
                this.getAllDepartment();
            }
        });
    }

    modifyDepartment = () => {
        this.openDepartmentDetail(this.selectedDept, this.selectedDept.parent);
    }

    deleteDepartment = () => {
        this.deptService.deleteDepartment(this.selectedDept.idBfDepartment).subscribe(data => {
            this.notificationService.success('删除机构成功');
            this.getAllDepartment();
        });
    }
}
