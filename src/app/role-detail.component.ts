import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Role } from './role';
import { RoleService } from './role.service';
import { NzModalSubject } from 'ng-zorro-antd';


@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html',
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

export class RoleDetailComponent implements OnInit {

    @Input() role: Role;

    validateForm: FormGroup;

    submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private modalSubject: NzModalSubject,
        private roleService: RoleService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]]
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    saveRole = (e) => {
        this.roleService.addRole(this.role).subscribe(data => {
            this.modalSubject.next('ok');
            this.closeDetail(e);
        });
    }

    closeDetail = (e) => {
        this.modalSubject.destroy();
    }

}
