import { Injectable } from '@angular/core';
import {Music, MusicApi, MusicApiInterface, MusicsResponse, PaginatedMusics} from "../classes/music";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MusicService implements MusicApiInterface {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Music[]> {
    return this.http
      .get<MusicsResponse>("http://localhost:3000/api/music")
      .pipe(
        map((response) => response['hydra:member']),
        map((apiMusics) => {
          return apiMusics.map((apiMusics) => {
            return this.mapApiMusicToMusic(apiMusics);
          })
        })
      );
  }

  public find(id: number): Observable<Music> {
    return this.http
      .get<MusicApi>("http://localhost:3000/api/music/" + id)
      .pipe(
        map((apiMusic) => {
          return this.mapApiMusicToMusic(apiMusic);
        })
      );
  }

  public create(music: Music): Observable<Music> {
    const musicApi = this.mapMusicToApiMusic(music);

    return this.http.post<MusicApi>("http://localhost:3000/api/music", musicApi)
      .pipe(
        map((apiMusic) => this.mapApiMusicToMusic(apiMusic))
      );
  }

  public paginate(page: number): Observable<PaginatedMusics> {
    return this.http
      .get<MusicsResponse>("http://localhost:3000/api/music?page=" + page)
      .pipe(
        map((musicResponse) => {
          const pagination: PaginatedMusics = {
            musics: musicResponse["hydra:member"]
              .map((apiMusic) => this.mapApiMusicToMusic(apiMusic)),
            total: musicResponse["hydra:totalItems"],
            currentPage: page
          }
          return pagination
        })
      );
  }

  public search(search: string): Observable<Music[]> {
    return this.http
      .get<MusicsResponse>("http://localhost:3000/api/music/search?q=" + search)
      .pipe(
        map((response) => response['hydra:member']),
        map((apiMusics) => {
          return apiMusics.map((apiMusics) => {
            return this.mapApiMusicToMusic(apiMusics);
          });
        })

      )
  }

  private mapApiMusicToMusic(musicApi: MusicApi): Music {
    return {
      id: musicApi.id,
      title: musicApi.title,
      year: musicApi.year,
      duration: musicApi.duration,
      file: musicApi.file,
      type: musicApi.type,
      album: musicApi.album
    }
  }

  private mapMusicToApiMusic(music: Music): MusicApi {
    return {
      id: music.id,
      title: music.title,
      year: music.year,
      duration: music.duration,
      file: music.file,
      type: music.type,
      album: music.album
    }
  }
}
