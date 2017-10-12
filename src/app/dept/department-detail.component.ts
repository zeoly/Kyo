import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzModalSubject } from 'ng-zorro-antd';
import { DeptService } from './dept.service';
import { Department } from './department';

@Component({
    selector: 'app-department-detail',
    templateUrl: './department-detail.component.html',
    styleUrls: ['./department-detail.component.css']
})

export class DepartmentDetailComponent implements OnInit {

    @Input() department: Department;

    @Input() parentDepartment: Department;

    isConfirmLoading = false;

    validateForm: FormGroup;

    validForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    constructor(
        private formBuilder: FormBuilder,
        private modalSubject: NzModalSubject,
        private deptService: DeptService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            code: [null, [Validators.required]],
            name: [null, [Validators.required]],
            parent: [null, [Validators.required]]
        });
    }

    closeDetail = (mark: string) => {
        this.isConfirmLoading = false;
        this.modalSubject.next(mark);
        this.modalSubject.destroy();
    }

    saveDepartment = (e) => {
        this.validForm();
        if (!this.validateForm.valid) {
            return;
        }
        if (this.department.idBfDepartment) {
            this.modifyDepartment(e);
        } else {
            this.addDepartment(e);
        }
    }

    modifyDepartment = (e) => {
        this.deptService.modifyDepartment(this.department).subscribe(() => {
            this.closeDetail('修改');
        });
    }

    addDepartment = (e) => {
        this.department.parentDepartmentId = this.parentDepartment.idBfDepartment;
        this.deptService.addDepartment(this.department).subscribe(() => {
            this.closeDetail('新增');
        });
    }
}
