import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Album} from "../../classes/album";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../album.service";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
export class AlbumViewComponent implements OnInit {
  album$!: Observable<Album>

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      // @ts-ignore
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !isNaN(id)),
      switchMap((id) => this.albumService.find(id))
    );
  }

}
