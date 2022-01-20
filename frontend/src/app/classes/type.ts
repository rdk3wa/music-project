export interface Type {
  id: number;
  name: string;
}

export interface TypeApi {
  id: number;
  name: string;
}

export interface TypesResponse {
  'hydra:member': TypeApi[];
  'hydra:totalItems': number;
}

