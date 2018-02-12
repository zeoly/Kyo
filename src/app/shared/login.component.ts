import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    message: string;

    constructor(
        private authService: AuthService
    ) {
        this.message = '';
    }

    login(user: string, password: string): boolean {
        const data = this.authService.login(user, password);
        if (data['code'] !== '999999') {
            this.message = data['msg'];
        } else {
            return true;
        }
    }

    logout(): boolean {
        this.authService.logout();
        return false;
    }
}
