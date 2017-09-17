import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Role } from './role';

@Injectable()
export class RoleService {

    private Role_URL = '/role';

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get(this.Role_URL).map(data =>
            data['data'] as Role[]
        );
    }
}
