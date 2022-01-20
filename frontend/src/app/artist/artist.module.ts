import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistViewComponent } from './artist-view/artist-view.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {HttpClientModule} from "@angular/common/http";
import {ArtistService} from "./artist.service";
import { ArtistFormComponent } from './artist-form/artist-form.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';



@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistViewComponent,
    ArtistSearchComponent,
    ArtistFormComponent,
    ArtistCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: ArtistListComponent },
      { path: "create", component: ArtistCreateComponent },
      { path: ":id", component: ArtistViewComponent },
      { path: "album/:id", component: ArtistListComponent }
    ]),
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: 'ARTIST_API',
      useClass: ArtistService
    }
  ],
})
export class ArtistModule { }
