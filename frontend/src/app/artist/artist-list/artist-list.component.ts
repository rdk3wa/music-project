import {Component, Inject, OnInit} from '@angular/core';
import {Artist, ArtistApiInterface} from "../../classes/artist";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  artistCount = 0;
  currentPage = 1;
  isLoading = false;

  constructor(@Inject('ARTIST_API') private artistService: ArtistApiInterface) {}

  ngOnInit(): void {
    console.log(this.loadArtist());
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.loadArtist();
  }

  private loadArtist(): void {
    this.isLoading = true;
    this.artistService.paginate(this.currentPage).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.artists = data.artists;
        this.artistCount = data.total;
      },
      error: (error) => console.log(error)
    });
  }
}
