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
    styles: [
        `
        :host ::ng-deep .customize-footer {
          border-top: 1px solid #e9e9e9;
          padding: 10px 18px 0 10px;
          text-align: right;
          border-radius: 0 0 0px 0px;
          margin: 15px -16px -5px -16px;
        }
      `
    ]
})

export class PeopleDetailComponent implements OnInit {

    @Input() people: People;

    roleList: Role[] = [];

    isConfirmLoading = false;

    validateForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private modalSubject: NzModalSubject,
        private deptService: DeptService,
        private roleService: RoleService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]]
        });
        this.getRoleList();
    }

    getRoleList(): void {
        this.roleService.getRoles().subscribe(data => {
            this.roleList = data;
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
