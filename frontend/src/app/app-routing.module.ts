import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth-guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: "music",
    loadChildren: () => import("./music/music.module").then((m) => m.MusicModule),
  },
  {
    path: "album",
    loadChildren: () => import("./album/album.module").then((m) => m.AlbumModule),
  },
  {
    path: "artist",
    loadChildren: () => import("./artist/artist.module").then((m) => m.ArtistModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
