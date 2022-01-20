import {Observable} from "rxjs";
import {Music} from "./music";
import {Artist} from "./artist";

export interface Album {
  id: number;
  title: string;
  duration: string;
  nb_music: number;
  cover: string;
  artist: Artist;
  musics: Music[];
}

export interface PaginatedAlbums {
  albums: Album[];
  total: number;
  currentPage: number;
}

export interface AlbumApi {
  id: number;
  title: string;
  duration: string;
  nbMusic: number;
  cover: string;
  artist: Artist;
  musics: Music[];
}

export interface AlbumApiInterface {
  paginate(page: number): Observable<PaginatedAlbums>;
}

export interface AlbumsResponse {
  'hydra:member': AlbumApi[];
  'hydra:totalItems': number;
}
