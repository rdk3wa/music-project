import {Observable} from "rxjs";
import {Type} from "./type";
import {Album} from "./album";

export interface Music {
  id: number;
  title: string;
  year: number;
  duration: string;
  file: string;
  type: Type;
  album: Album;
}

export interface PaginatedMusics {
  musics: Music[];
  total: number;
  currentPage: number;
}

export interface MusicApiInterface {
  paginate(page: number): Observable<PaginatedMusics>;
}

export interface MusicApi {
  id: number;
  title: string;
  year: number;
  duration: string;
  file: string;
  type: Type;
  album: Album;
}

export interface MusicsResponse {
  'hydra:member': MusicApi[];
  'hydra:totalItems': number;
}
