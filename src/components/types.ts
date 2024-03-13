export type MovieType = {
  title: string;
  id: number;
  checked?: boolean;
  name?: string;
  genre_ids?: number[];
};

export type GenreType = {
  id: number;
  name: string;
};

export type GenresType = {
  genres: GenreType[];
};

export type FormValuesType = {
  selectedMovies: never[];
};
