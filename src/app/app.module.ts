import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgZorroAntdModule, NzMessageService } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeptManageComponent } from './dept/dept-manage.component';
import { DepartmentDetailComponent } from './dept/department-detail.component';
import { PeopleDetailComponent } from './dept/people-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleDetailComponent } from './role/role-detail.component';

import { KyoInterceptor } from './interceptor.service';
import { NotificationService } from './shared/notification.service';
import { RoleService } from './role/role.service';
import { DeptService } from './dept/dept.service';
// import { HttpInterceptor } from './http-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { ReportComponent } from './claim/report.component';
import { ReviewComponent } from './claim/review.component';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { HistoryComponent } from './claim/history.component';

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    RoleDetailComponent,
    DashboardComponent,
    DeptManageComponent,
    DepartmentDetailComponent,
    PeopleDetailComponent,
    ReportComponent,
    HistoryComponent,
    ReviewComponent
  ],
  entryComponents: [
    RoleDetailComponent,
    PeopleDetailComponent,
    DepartmentDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    FileUploadModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont' }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KyoInterceptor,
      multi: true,
    },
    NotificationService,
    RoleService,
    DeptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
