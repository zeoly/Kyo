import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleComponent } from './role/role.component';
import { DeptManageComponent } from './dept-manage.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, {
        path: 'home',
        component: DashboardComponent
    }, {
        path: 'role',
        component: RoleComponent
    }, {
        path: 'dept',
        component: DeptManageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
