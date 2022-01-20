import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { AlbumSearchComponent } from './album-search/album-search.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {HttpClientModule} from "@angular/common/http";
import {AlbumService} from "./album.service";
import {MusicViewComponent} from "../music/music-view/music-view.component";
import { AlbumFormComponent } from './album-form/album-form.component';
import { AlbumCreateComponent } from './album-create/album-create.component';



@NgModule({
  declarations: [
    AlbumListComponent,
    AlbumViewComponent,
    AlbumSearchComponent,
    AlbumFormComponent,
    AlbumCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: AlbumListComponent },
      { path: "create", component: AlbumCreateComponent },
      { path: ":id", component: AlbumViewComponent },
      { path: "/music/:id", component: MusicViewComponent }
    ]),
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'ALBUM_API',
      useClass: AlbumService
    }
  ],
})
export class AlbumModule { }
