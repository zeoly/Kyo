import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalSubject } from 'ng-zorro-antd';
import { DeptService } from './dept.service';
import { RoleService } from '../role/role.service';
import { People } from './people';
import { Role } from '../role/role';

@Component({
    selector: 'app-people-detail',
    templateUrl: './people-detail.component.html',
    styleUrls: ['./people-detail.component.css']
})

export class PeopleDetailComponent implements OnInit {

    @Input() people: People;

    allRoleList: Role[] = [];

    selectedRole: string[];

    isConfirmLoading = false;

    validateForm: FormGroup;

    validForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private modalSubject: NzModalSubject,
        private deptService: DeptService,
        private roleService: RoleService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            roleList: [null, [Validators.required]]
        });
        this.getRoleList();
        this.getPeopleRole();
    }

    closeDetail = (mark: string) => {
        this.isConfirmLoading = false;
        this.modalSubject.next(mark);
        this.modalSubject.destroy();
    }

    getRoleList(): void {
        this.roleService.getRoles().subscribe(data => {
            this.allRoleList = data;
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    getPeopleRole(): void {
        this.deptService.getPeopleRole(this.people.idBfPeople).subscribe(data => {
            this.selectedRole = [];
            data.forEach(role => {
                this.selectedRole.push(role.idBfRole);
            });
        });
    }

    savePeople = (e) => {
        this.validForm();
        if (!this.validateForm.valid) {
            return;
        }
        this.people.roleIdList = this.selectedRole;
        if (this.people.idBfPeople) {
            this.modifyPeople(e);
        } else {
            this.addPeople(e);
        }
    }

    modifyPeople = (e) => {
        this.deptService.updatePeople(this.people).subscribe(() => {
            this.closeDetail('修改');
        });
    }

    addPeople = (e) => {
        this.deptService.addPeople(this.people).subscribe(() => {
            this.closeDetail('新增');
        });
    }
}
