import { NativeSelect } from "@mantine/core";
import { useMoviesStore } from "../store";

const GenreSelect = () => {
  const genres = useMoviesStore((state) => state.genres);
  const filterMoviesByGenre = useMoviesStore(
    (state) => state.filterMoviesByGenre
  );

  return (
    <NativeSelect
      maw={130}
      label="Filter"
      data={Object.getOwnPropertyNames(genres)}
      onChange={(event) => filterMoviesByGenre(genres[event.target.value])}
    />
  );
};

export default GenreSelect;
