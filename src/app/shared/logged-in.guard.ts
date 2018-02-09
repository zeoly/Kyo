import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            location.href = '/home';
            return false;
        }
    }
}
