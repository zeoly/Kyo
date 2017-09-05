import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    RoleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
