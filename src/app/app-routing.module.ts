import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleComponent } from './role/role.component';
import { DeptManageComponent } from './dept/dept-manage.component';
import { ReportComponent } from './claim/report.component';
import { ReviewComponent } from './claim/review.component';
import { HistoryComponent } from './claim/history.component';

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
    }, {
        path: 'report',
        component: ReportComponent
    }, {
        path: 'history',
        component: HistoryComponent
    }, {
        path: 'review',
        component: ReviewComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
