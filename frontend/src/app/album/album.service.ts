import { Injectable } from '@angular/core';
import {Album, AlbumApi, AlbumApiInterface, AlbumsResponse, PaginatedAlbums} from "../classes/album";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Artist, ArtistApi} from "../classes/artist";

@Injectable({
  providedIn: 'root'
})
export class AlbumService implements AlbumApiInterface {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Album[]> {
    return this.http
      .get<AlbumsResponse>("http://localhost:3000/api/albums")
      .pipe(
        map((response) => response['hydra:member']),
        map((apiAlbums) => {
          return apiAlbums.map((apiAlbums) => {
            return this.mapApiAlbumToAlbum(apiAlbums);
          })
        })
      );
  }

  public find(id: number): Observable<Album> {
    return this.http
      .get<AlbumApi>("http://localhost:3000/api/albums/" + id)
      .pipe(
        map((apiAlbum) => {
          return this.mapApiAlbumToAlbum(apiAlbum);
        })
      );
  }

  public create(album: Album): Observable<Album> {
    const albumApi = this.mapAlbumToApiAlbum(album);

    return this.http.post<AlbumApi>("http://localhost:3000/api/albums", albumApi)
      .pipe(
        map((apiAlbum) => this.mapApiAlbumToAlbum(apiAlbum))
      );
  }

  public paginate(page: number): Observable<PaginatedAlbums> {
    return this.http
      .get<AlbumsResponse>("http://localhost:3000/api/albums?page=" + page)
      .pipe(
        map((albumResponse) => {
          const pagination: PaginatedAlbums = {
            albums: albumResponse["hydra:member"]
              .map((apiAlbum) => this.mapApiAlbumToAlbum(apiAlbum)),
            total: albumResponse["hydra:totalItems"],
            currentPage: page
          }
          return pagination
        })
      );
  }

  public search(search: string): Observable<Album[]> {
    return this.http
      .get<AlbumsResponse>("http://localhost:3000/api/album/search?q=" + search)
      .pipe(
        map((response) => response['hydra:member']),
        map((apiAlbums) => {
          return apiAlbums.map((apiAlbums) => {
            return this.mapApiAlbumToAlbum(apiAlbums);
          });
        })

      )
  }

  private mapApiAlbumToAlbum(albumApi: AlbumApi): Album {
    return {
      id: albumApi.id,
      title: albumApi.title,
      duration: albumApi.duration,
      nb_music: albumApi.nbMusic,
      cover: albumApi.cover,
      artist: albumApi.artist,
      musics: albumApi.musics
    }
  }

  private mapAlbumToApiAlbum(album: Album): AlbumApi {
    return {
      id: album.id,
      title: album.title,
      duration: album.duration,
      nbMusic: album.nb_music,
      cover: album.cover,
      artist: album.artist,
      musics: album.musics
    }
  }

}
