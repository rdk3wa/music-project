import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth-service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    this.service.authenticate(this.form.value)
      .subscribe({
        next: () => {
           this.router.navigateByUrl('/music');
        },
        error: (error) => this.error = true,
      })
  }

}
