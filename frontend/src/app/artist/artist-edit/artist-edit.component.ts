import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ArtistService} from "../artist.service";
import {Artist} from "../../classes/artist";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {
  artist: Artist;

  constructor(
    private routerActive: ActivatedRoute,
    private router: Router,
    private service: ArtistService
  ) { }

  ngOnInit(): void {
    this.routerActive.paramMap.pipe(
      map((paramMap) => +paramMap.get('id')),
      switchMap((id) => this.service.find(id))
    ).subscribe((artist) => this.artist = artist);
  }

  handleSubmit(data: Artist): void {
    const updatedArtist = {...this.artist, ...data};

    this.service.update(updatedArtist).subscribe({
      next: (artist) => this.router.navigate(['../'], {
        relativeTo: this.routerActive
      }),
      error: (error) => console.log(error),
    });
  }
}
