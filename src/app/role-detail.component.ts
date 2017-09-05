import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html'
})

export class RoleDetailComponent implements OnInit {

    validateForm: FormGroup;

    submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
    }


    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]]
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }


}
