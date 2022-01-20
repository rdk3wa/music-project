import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Album} from "../../classes/album";
import {ArtistService} from "../../artist/artist.service";
import {Artist} from "../../classes/artist";

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter();
  @Input()
  album: Album;
  artists: Artist[] = [];
  error = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    duration: new FormControl(),
    nb_music: new FormControl(),
    artist: new FormControl()
  });

  constructor(private artistService: ArtistService) {}

  ngOnInit(): void {
    this.artistService.findAll().subscribe({
      next: (artists) => this.artists = artists,
      error: () => this.error = true,
    });

    if (this.album) {
      this.form.patchValue(this.album);
    }
  }

  get f(){
    return this.form.controls;
  }

  handleSubmit(): void {
    let artist: Artist;
    artist = this.artists.find((t) => t.id === +this.form.value['artist'])!;

    const data = {
      title: this.form.value['title'],
      duration: this.form.value['duration'],
      nb_music: this.form.value['nb_music'],
      artist
    }

    this.onSubmit.emit(data);
  }

}
