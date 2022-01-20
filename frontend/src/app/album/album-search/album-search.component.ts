import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../album.service";
import {FormControl} from "@angular/forms";
import {Album} from "../../classes/album";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent implements OnInit {
  search = new FormControl();

  results: Album[] = [];

  constructor(private service: AlbumService) { }

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
        next: (album) => (this.results = album),
        error: (error) => console.log(error),
      });
  }

}
