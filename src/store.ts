import { create } from "zustand";
import { SEARCH_MOVIE } from "./constants";
import { DEFAULT_OPTIONS } from "./hooks/useFetch";
import { MovieType as Movie, GenresType as Genres } from "./components/types";

const languageMap: { [key: string]: string } = {
  English: "en-US",
  French: "fr-FR",
  Bulgarian: "bg-BG",
};

type MoviesStore = {
  movieList: Movie[];
  movieCheckboxes: string[];
  genres: { [key: string]: number };
  setGenres: (data: Genres) => void;
  setMovieCheckboxes: (data: string[]) => void;
  setMovieList: (data: Movie[]) => void;
  fetchMovies: (movie: string) => Promise<void>;
  saveMoviesList: (movies: Movie[]) => Promise<void>;
  reorderMovies: (movies: Movie[]) => void;
  deleteMovie: (id: number) => void;
  filterMoviesByGenre: (genreID: number) => void;
  changeMoviesLanguage: (movies: Movie[], language: string) => void;
};

export const useMoviesStore = create<MoviesStore>((set, get) => ({
  movieList: [],
  movieCheckboxes: [],
  genres: {},
  setGenres: (data) => {
    set((state) => ({
      genres: data.genres.reduce((prev, curr) => {
        return { ...prev, [curr.name]: curr.id };
      }, {}),
    }));
  },
  setMovieCheckboxes: (data) => {
    set((state) => ({
      movieCheckboxes: data,
    }));
  },
  setMovieList: (data) => {
    set((state) => ({
      movieList: [...state.movieList, ...data],
    }));
  },
  fetchMovies: async (movie) => {
    const url = `${SEARCH_MOVIE}${movie}&include_adult=false&language=en-US&page=1`;
    const response = await fetch(url, DEFAULT_OPTIONS);
    const data = await response.json();
    set((state) => ({
      movieList: [...state.movieList, data.results[0]],
    }));
  },
  saveMoviesList: async (movies) => {
    const url = "https://dummyjson.com/posts/add";
    const response = await fetch(url, {
      ...DEFAULT_OPTIONS,
      method: "POST",
      body: JSON.stringify(movies),
    });
    const data = await response.json();
    return data;
    // TODO: When we have API for that we can update moviesList state.
  },
  reorderMovies: (movies) => {
    set((state) => ({
      movieList: movies,
    }));
  },
  deleteMovie: (id) => {
    set((state) => ({
      movieList: state.movieList.filter((movie: Movie) => movie.id !== id),
    }));
  },
  filterMoviesByGenre: (genreID) => {
    set((state) => ({
      movieList: state.movieList.filter((movie: Movie) =>
        movie.genre_ids?.includes(genreID)
      ),
    }));
  },
  changeMoviesLanguage: async (movies, language) => {
    const languageCode = languageMap[language] || "en-US";
    const urls = movies.map(
      (movie: Movie) =>
        `https://api.themoviedb.org/3/movie/${movie.id}?language=${languageCode}`
    );
    const promises = urls.map((url: string) =>
      fetch(url, DEFAULT_OPTIONS).then((response) => response.json())
    );
    const data = await Promise.all(promises);

    set((state) => ({
      movieList: data,
    }));
  },
}));
