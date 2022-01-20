import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Music} from "../../classes/music";
import {ActivatedRoute} from "@angular/router";
import {MusicService} from "../music.service";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-music-view',
  templateUrl: './music-view.component.html',
  styleUrls: ['./music-view.component.css']
})
export class MusicViewComponent implements OnInit {
  music$!: Observable<Music>

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {}

  ngOnInit(): void {
    this.music$ = this.route.paramMap.pipe(
      // @ts-ignore
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !isNaN(id)),
      switchMap((id) => this.musicService.find(id))
    );
  }
}
