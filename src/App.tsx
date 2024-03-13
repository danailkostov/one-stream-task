import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { GENRES_URL } from "./constants";
import { useMoviesStore } from "./store";

import MainContent from "./layout/MainContent";

const App = () => {
  const { data } = useFetch(GENRES_URL);
  const setGenres = useMoviesStore((state) => state.setGenres);

  useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data, setGenres]);

  return (
    <MantineProvider>
      <MainContent />
    </MantineProvider>
  );
};

export default App;
