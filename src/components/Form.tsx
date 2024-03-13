import { Button, Checkbox, FileInput, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import FormAutocomplete from "./FormAutocomplete";
import { useMoviesStore } from "../store";
import { MovieType as Movie, FormValuesType as FormValues } from "./types";

const Form = () => {
  const setMovieCheckboxes = useMoviesStore(
    (state) => state.setMovieCheckboxes
  );
  const movieCheckboxes = useMoviesStore((state) => state.movieCheckboxes);
  const moviesList = useMoviesStore((state) => state.movieList);
  const setMoviesList = useMoviesStore((state) => state.setMovieList);
  const fetchMovie = useMoviesStore((state) => state.fetchMovies);
  const saveMoviesList = useMoviesStore((state) => state.saveMoviesList);

  const form = useForm({
    initialValues: {
      selectedMovies: [],
    },
  });

  const handleSubmit = async (movies: FormValues) => {
    if (!moviesList.length) {
      setMoviesList([]);
      movies.selectedMovies.map((movie: Movie) => {
        if (!movie.checked) return;
        fetchMovie(movie.title);
      });
    } else {
      saveMoviesList(moviesList);
    }
  };

  const handleUploadingFile = (file: File | null) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const movieList = content.split("\n").map((movie) => movie.trim());
      setMovieCheckboxes(movieList);
      movieList.map((movie, index) =>
        form.setFieldValue(`selectedMovies.${index}`, {
          title: movie,
          checked: true,
          id: index,
        })
      );
    };
    reader.readAsText(file as Blob);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      {!moviesList.length && (
        <>
          <FileInput
            placeholder="Upload Text File"
            accept=".txt"
            onChange={handleUploadingFile}
          />
          {movieCheckboxes.map((movie: string, index) => (
            <Checkbox
              mt="md"
              key={index}
              defaultChecked
              label={movie}
              onChange={(event) =>
                form.setFieldValue(`selectedMovies.${index}`, {
                  title: movie,
                  checked: event.target.checked,
                  id: index,
                })
              }
            />
          ))}
        </>
      )}
      {!!moviesList.length && <FormAutocomplete />}

      <Group justify="flex-end" mt="md" my="md">
        <Button type="submit" disabled={!movieCheckboxes.length}>
          {moviesList.length ? "Save" : "Search"}
        </Button>
      </Group>
    </form>
  );
};

export default Form;
