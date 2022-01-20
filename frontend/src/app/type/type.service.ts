import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type, TypesResponse} from "../classes/type";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Type[]> {
    return this.http
      .get<TypesResponse>("http://localhost:3000/api/types")
      .pipe(
        map((response) => response['hydra:member']),
        map((type) => { return type })
      );
  }
}
