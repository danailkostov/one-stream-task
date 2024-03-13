import { NativeSelect } from "@mantine/core";
import { useMoviesStore } from "../store";

const LanguageSelect = () => {
  const changeMoviesLanguage = useMoviesStore(
    (state) => state.changeMoviesLanguage
  );
  const movies = useMoviesStore((state) => state.movieList);

  return (
    <NativeSelect
      maw={130}
      label="Language"
      data={["English", "French", "Bulgarian"]}
      onChange={(event) => changeMoviesLanguage(movies, event.target.value)}
    />
  );
};

export default LanguageSelect;
