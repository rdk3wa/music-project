import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Music} from "../../classes/music";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Album} from "../../classes/album";
import {Type} from "../../classes/type";
import {AlbumService} from "../../album/album.service";
import {TypeService} from "../../type/type.service";
import {MusicService} from "../music.service";

@Component({
  selector: 'app-music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.css']
})
export class MusicFormComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter();
  @Input()
  music: Music;
  albums: Album[] = [];
  types: Type[] = [];
  error = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    year: new FormControl('', [
      Validators.required,
      Validators.pattern("^(19|20)\\d{2}$"),
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.pattern("/^\\d*\\.?\\d*$/"),
    ]),
    type: new FormControl(),
    album: new FormControl()
  });

  constructor(
    private musicService: MusicService,
    private albumService: AlbumService,
    private typeService: TypeService
  ) {}

  ngOnInit(): void {
    this.albumService.findAll().subscribe({
      next: (albums) => this.albums = albums,
      error: () => this.error = true,
    });

    this.typeService.findAll().subscribe({
      next: (types) => this.types = types,
      error: () => this.error = true,
    });

    if (this.music) {
      this.form.patchValue(this.music);
    }
  }

  get f(){
    return this.form.controls;
  }

  handleSubmit(): void {
    let album: Album;
    album = this.albums.find((a) => a.id === +this.form.value['album'])!;

    let type: Type;
    type = this.types.find((t) => t.id === +this.form.value['type'])!;

    const data = {
      title: this.form.value['title'],
      year: this.form.value['year'],
      duration: this.form.value['duration'],
      album,
      type
    }

    this.onSubmit.emit(data);
  }
}
