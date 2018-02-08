import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
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
