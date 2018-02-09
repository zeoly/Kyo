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
        if (!this.authService.login(user, password)) {
            this.message = 'Incorrect credentials.';
        }
        return false;
    }

    logout(): boolean {
        this.authService.logout();
        return false;
    }
}
