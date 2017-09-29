import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeptManageComponent } from './dept/dept-manage.component';
import { PeopleDetailComponent } from './dept/people-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleDetailComponent } from './role/role-detail.component';

import { KyoInterceptor } from './interceptor.service';
import { NotificationService } from './shared/notification.service';
import { RoleService } from './role/role.service';
import { DeptService } from './dept/dept.service';
// import { HttpInterceptor } from './http-interceptor.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    RoleDetailComponent,
    DashboardComponent,
    DeptManageComponent,
    PeopleDetailComponent
  ],
  entryComponents: [
    RoleDetailComponent,
    PeopleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: '../assets/fonts/iconfont' }),
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
