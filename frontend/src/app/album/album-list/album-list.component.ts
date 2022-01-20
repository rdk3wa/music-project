import {Component, Inject, OnInit} from '@angular/core';
import {Album, AlbumApiInterface} from "../../classes/album";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [];
  albumCount = 0;
  currentPage = 1;
  isLoading = false;

  constructor(@Inject('ALBUM_API') private albumService: AlbumApiInterface) {}

  ngOnInit(): void {
    console.log(this.loadAlbum());
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.loadAlbum();
  }

  private loadAlbum(): void {
    this.isLoading = true;
    this.albumService.paginate(this.currentPage).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.albums = data.albums;
        this.albumCount = data.total;
      },
      error: (error) => console.log(error)
    });
  }
}
