import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html'
})

export class RoleComponent implements OnInit {

    data = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

        this.http.get('http://localhost:8081/roleAction/getRoleList.do').subscribe(data => {
            console.log(data);
            this.data = data['data'];
        });

    }

}
