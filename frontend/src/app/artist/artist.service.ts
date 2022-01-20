import { Injectable } from '@angular/core';
import {Artist, ArtistApi, ArtistApiInterface, ArtistsResponse, PaginatedArtists} from "../classes/artist";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArtistService implements ArtistApiInterface {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Artist[]> {
    return this.http
      .get<ArtistsResponse>("http://localhost:3000/api/artists")
      .pipe(
        map((response) => response['hydra:member']),
        map((apiArtists) => {
          return apiArtists.map((apiArtists) => {
            return this.mapApiArtistToArtist(apiArtists);
          })
        })
      );
  }

  public find(id: number): Observable<Artist> {
    return this.http
      .get<ArtistApi>("http://localhost:3000/api/artists/" + id)
      .pipe(
        map((apiArtist) => {
          return this.mapApiArtistToArtist(apiArtist);
        })
      );
  }

  public create(artist: Artist): Observable<Artist> {
    const artistApi = this.mapArtistToApiArtist(artist);

    return this.http.post<ArtistApi>("http://localhost:3000/api/artists", artistApi)
      .pipe(
        map((apiArtist) => this.mapApiArtistToArtist(apiArtist))
      );
  }

  public paginate(page: number): Observable<PaginatedArtists> {
    return this.http
      .get<ArtistsResponse>("http://localhost:3000/api/artists?page=" + page)
      .pipe(
        map((artistResponse) => {
          const pagination: PaginatedArtists = {
            artists: artistResponse["hydra:member"]
              .map((apiArtist) => this.mapApiArtistToArtist(apiArtist)),
            total: artistResponse["hydra:totalItems"],
            currentPage: page
          }
          return pagination
        })
      );
  }

  public search(search: string): Observable<Artist[]> {
    return this.http
      .get<ArtistsResponse>("http://localhost:3000/api/artist/search?q=" + search)
      .pipe(
        map((response) => response['hydra:member']),
        map((apiArtists) => {
          return apiArtists.map((apiArtists) => {
            return this.mapApiArtistToArtist(apiArtists);
          });
        })
      )
  }

  private mapApiArtistToArtist(artistApi: ArtistApi): Artist {
    return {
      id: artistApi.id,
      name: artistApi.name,
      description: artistApi.description,
      photo: artistApi.photo,
      albums: artistApi.albums
    }
  }

  private mapArtistToApiArtist(artist: Artist): ArtistApi {
    return {
      id: artist.id,
      name: artist.name,
      description: artist.description,
      photo: artist.photo,
      albums: artist.albums
    }
  }
}
