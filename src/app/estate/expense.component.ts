import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expense } from './expense';

@Component({
    selector: 'app-expense',
    templateUrl: './expense.component.html'
})

export class ExpenseComponent implements OnInit {

    validateForm: FormGroup;

    expenses: Expense[] = [];

    total = 2871000;
    buy = 2790000;
    debt = 1800000;
    year = '1';
    area = '0';
    barrier = '1';
    first = '0';

    _submitForm() {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls[i]) {
                this.validateForm.controls[i].markAsDirty();
            }
        }
        if (!this.validateForm.valid) {
            return;
        }
        this.calculate();
    }

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.validateForm = this.formBuilder.group({
            total: [null, [Validators.required]],
            buy: [null, [Validators.required]],
            debt: [null, [Validators.required]],
            year: [null, [Validators.required]],
            area: [null, [Validators.required]],
            barrier: [null, [Validators.required]],
            first: [null, [Validators.required]]
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    calculate() {
        console.log('start calc');
        this.expenses = [];
        let e = new Expense();
        e.name = '增值税';
        if (this.year === '0') {
            e.amount = this.total / 1.05 * 0.056;
        } else {
            e.amount = (this.total - this.buy) / 1.05 * 0.056;
        }
        this.expenses.push(e);

        e = new Expense();
        e.name = '契税';
        if (this.first === '0') {
            if (this.area === '0') {
                e.amount = this.total * 0.01;
            } else if (this.area === '1') {
                e.amount = this.total * 0.015;
            } else {
                e.amount = this.total * 0.03;
            }
        } else {
            e.amount = this.total * 0.03;
        }
        this.expenses.push(e);

        e = new Expense();
        e.name = '个人所得税';
        if (this.year === '2') {
            e.amount = 0;
        } if (this.area === '2') {
            e.amount = (this.total - this.expenses[0].amount) * 0.015;
        } else {
            if (this.barrier === '0' && this.total > 3900000) {
                e.amount = (this.total - this.expenses[0].amount) * 0.015;
            } else if (this.barrier === '1' && this.total > 2800000) {
                e.amount = (this.total - this.expenses[0].amount) * 0.015;
            } else if (this.barrier === '2' && this.total > 4700000) {
                e.amount = (this.total - this.expenses[0].amount) * 0.015;
            } else if (this.barrier === '3' && this.total > 4900000) {
                e.amount = (this.total - this.expenses[0].amount) * 0.015;
            } else if (this.barrier === '4' && this.total > 3300000) {
                e.amount = (this.total - this.expenses[0].amount) * 0.015;
            } else if (this.barrier === '5' && this.total > 3600000) {
                e.amount = (this.total - this.expenses[0].amount) * 0.015;
            } else {
                e.amount = (this.total - this.expenses[0].amount) * 0.01;
            }
        }
        this.expenses.push(e);

        e = new Expense();
        e.name = '按揭服务费';
        e.amount = 3000;
        this.expenses.push(e);

        e = new Expense();
        e.name = '评估费';
        e.amount = this.total * 0.0005;
        this.expenses.push(e);

        e = new Expense();
        e.name = '公证费';
        e.amount = 800;
        this.expenses.push(e);

        e = new Expense();
        e.name = '产权登记费';
        e.amount = 80;
        this.expenses.push(e);

        e = new Expense();
        e.name = '抵押登记费';
        e.amount = 80;
        this.expenses.push(e);

        e = new Expense();
        e.name = '贴花';
        e.amount = 5;
        this.expenses.push(e);

        e = new Expense();
        e.name = '担保费';
        e.amount = this.debt * 0.012;
        this.expenses.push(e);

        e = new Expense();
        e.name = '赎楼利息';
        e.amount = this.debt * 0.018;
        this.expenses.push(e);

        e = new Expense();
        e.name = '总计';
        e.amount = 0;
        for (let expense of this.expenses) {
            e.amount += expense.amount;
        }
        this.expenses.push(e);
    }
}
