export interface PerfumeDupe {
  dupeBrand: string;
  dupeName: string;
  concentration: string;
  price?: number;
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  concentration: string;
  season?: string;
  price?: number;
  rating?: number;
  dupes?: PerfumeDupe[];
  gender?: string;
  notes?: string[];
  longevity?: string;
  sillage?: string;
  releaseYear?: number;
}

