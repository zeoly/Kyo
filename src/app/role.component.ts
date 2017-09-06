import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {

    data = [];

    isVisible = false;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

        this.http.get('/roleAction/getRoleList.do').subscribe(data => {
            console.log(data);
            this.data = data['data'];
        });

    }

    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        console.log('点击了确定');
        this.isVisible = false;
    }

    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }

}
