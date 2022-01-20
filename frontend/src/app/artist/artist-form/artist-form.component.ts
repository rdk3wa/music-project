import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Artist} from "../../classes/artist";

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent implements OnInit {
  @Output()
  onSubmit = new EventEmitter();
  @Input()
  artist: Artist;
  error = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl()
  });

  constructor() {}

  ngOnInit(): void {
    if (this.artist) {
      this.form.patchValue(this.artist);
    }
  }

  get f(){
    return this.form.controls;
  }

  handleSubmit(): void {
    this.onSubmit.emit(this.form.value);
  }

}
