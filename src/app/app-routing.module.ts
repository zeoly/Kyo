import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/role',
        pathMatch: 'full'
    }, {
        path: 'role',
        component: RoleComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
