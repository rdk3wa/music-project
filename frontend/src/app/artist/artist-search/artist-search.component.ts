import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../artist.service";
import {FormControl} from "@angular/forms";
import {Artist} from "../../classes/artist";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {
  search = new FormControl();

  results: Artist[] = [];

  constructor(private service: ArtistService) { }

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
        next: (artist) => (this.results = artist),
        error: (error) => console.log(error),
      });
  }

}
