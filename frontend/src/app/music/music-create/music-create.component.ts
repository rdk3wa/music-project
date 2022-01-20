import { Component, OnInit } from '@angular/core';
import {MusicService} from "../music.service";
import {Router} from "@angular/router";
import {Music} from "../../classes/music";

@Component({
  selector: 'app-music-create',
  templateUrl: './music-create.component.html',
  styleUrls: ['./music-create.component.css']
})
export class MusicCreateComponent implements OnInit {

  constructor(
    private service: MusicService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleSubmit(music: Music) {
    this.service.create(music).subscribe({
      next: (music) => this.router.navigateByUrl('/music/' + music.id),
      error: (error) => console.log(error),
    })
  }
}
