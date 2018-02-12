import { Injectable } from '@angular/core';
import { Md5 } from './md5.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    private USER_KEY = 'user';

    constructor(private http: HttpClient) { }

    login(name: string, password: string): any {
        if (name === 'name' && password === 'pass') {
            localStorage.setItem(this.USER_KEY, name);
            return true;
        } else {
            const auth = Md5.hashStr(name + password);
            console.log('auth:' + auth);
            this.http.get('/session?' + 'username=' + name + '&password=' + auth).subscribe(
                data => {
                    if (data['code'] === '999999') {
                        localStorage.setItem(this.USER_KEY, data['data'].name);
                    }
                    return data;
                }
            );
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem(this.USER_KEY);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem(this.USER_KEY) !== null;
    }

    getUser(): string {
        return localStorage.getItem(this.USER_KEY);
    }
}

export let AUTH_PROVIDERS: Array<any> = [
    { provide: AuthService, useClass: AuthService }
];
