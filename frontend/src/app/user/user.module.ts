import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    UserViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: UserViewComponent}
    ]),
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class UserModule { }
