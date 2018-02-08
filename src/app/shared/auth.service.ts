import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private USER_KEY = 'user';

    login(name: string, password: string): boolean {
        if (name === 'name' && password === 'pass') {
            localStorage.setItem(this.USER_KEY, name);
            return true;
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
