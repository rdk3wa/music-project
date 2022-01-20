import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../album.service";
import {Router} from "@angular/router";
import {Album} from "../../classes/album";

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})
export class AlbumCreateComponent implements OnInit {

  constructor(
    private service: AlbumService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(album: Album) {
    this.service.create(album).subscribe({
      next: (album) => this.router.navigateByUrl('/album/' + album.id),
      error: (error) => console.log(error),
    })
  }

}
