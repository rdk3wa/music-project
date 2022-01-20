import {NgModule} from "@angular/core";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PaginationComponent,
  ],
  exports: [
    PaginationComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {}
