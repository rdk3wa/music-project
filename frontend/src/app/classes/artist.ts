import {Observable} from "rxjs";

export interface Artist {
  id: number;
  name: string;
  description: string;
  photo: string;
  albums?: any[];
}

export interface PaginatedArtists {
  artists: Artist[];
  total: number;
  currentPage: number;
}

export interface ArtistApi {
  id: number;
  name: string;
  description: string;
  photo: string;
  albums?: any[];
}

export interface ArtistApiInterface {
  paginate(page: number): Observable<PaginatedArtists>;
}

export interface ArtistsResponse {
  'hydra:member': ArtistApi[];
  'hydra:totalItems': number;
}
