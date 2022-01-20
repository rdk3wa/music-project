import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../artist.service";
import {Router} from "@angular/router";
import {Artist} from "../../classes/artist";

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.css']
})
export class ArtistCreateComponent implements OnInit {

  constructor(
    private service: ArtistService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  handleSubmit(artist: Artist) {
    this.service.create(artist).subscribe({
      next: (artist) => this.router.navigateByUrl('/artist/' + artist.id),
      error: (error) => console.log(error),
    })
  }
}
