import { Component, OnInit } from '@angular/core';
import {MusicService} from "../music.service";
import {FormControl} from "@angular/forms";
import {Music} from "../../classes/music";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {
  search = new FormControl();

  results: Music[] = [];

  constructor(private service: MusicService) { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        // Je mets un délai de 300 ms
        debounceTime(300),
        distinctUntilChanged(),
        // J'interviens pour un cas particulier (aucune transformation ni rien)
        tap((value: string) => {
          if(value.length === 0) {
            this.results = [];
          }
        }),
        // Je filtre pour qu'une valeur vide n'aille pas plus loin dans le tuyeau
        filter((value: string) => value.length > 0),
        switchMap((value: string) => this.service.search(value)),
      )
      .subscribe({
        next: (music) => (this.results = music),
        error: (error) => console.log(error),
      });
  }

}
