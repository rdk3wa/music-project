import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Artist} from "../../classes/artist";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../artist.service";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.css']
})
export class ArtistViewComponent implements OnInit {
  artist$!: Observable<Artist>

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    this.artist$ = this.route.paramMap.pipe(
      // @ts-ignore
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !isNaN(id)),
      switchMap((id) => this.artistService.find(id))
    );
  }
}
