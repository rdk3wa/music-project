import {Component, Inject, OnInit} from '@angular/core';
import {Music, MusicApiInterface} from "../../classes/music";

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {
  musics: Music[] = [];
  musicCount = 0;
  currentPage = 1;
  isLoading = false;

  constructor(@Inject('MUSIC_API') private musicService: MusicApiInterface) {}

  ngOnInit(): void {
    this.loadMusic();
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.loadMusic();
  }

  private loadMusic(): void {
    this.isLoading = true;
    this.musicService.paginate(this.currentPage).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.musics = data.musics;
        this.musicCount = data.total;
      },
      error: (error) => console.log(error)
    });
  }
}
