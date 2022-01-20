import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicViewComponent } from './music-view/music-view.component';
import { MusicSearchComponent } from './music-search/music-search.component';
import {MusicService} from "./music.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MusicCreateComponent } from './music-create/music-create.component';
import { MusicFormComponent } from './music-form/music-form.component';



@NgModule({
  declarations: [
    MusicListComponent,
    MusicViewComponent,
    MusicSearchComponent,
    MusicCreateComponent,
    MusicFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: MusicListComponent},
      {path: "create", component: MusicCreateComponent},
      {path: ":id", component: MusicViewComponent}
    ]),
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'MUSIC_API',
      useClass: MusicService
    }
  ],
})
export class MusicModule { }
