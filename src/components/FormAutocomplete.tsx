import { Autocomplete, AutocompleteProps, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMoviesStore } from "../store";
import { SEARCH_MOVIE } from "../constants";
import useFetch from "../hooks/useFetch";
import { MovieType as Movie } from "./types";
import { useDebouncedValue } from "@mantine/hooks";

const FormAutocomplete = () => {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [dropdownMovieObjects, setDropdownMovieObjects] = useState<Movie[]>([]);
  const setMoviesList = useMoviesStore((state) => state.setMovieList);

  const url = `${SEARCH_MOVIE}${debounced}&include_adult=false&language=en-US&page=1`;

  const { data, loading } = useFetch(url, "GET", true);

  useEffect(() => {
    if (!loading && debounced && data) {
      const { results } = data as { results: Movie[] };
      if (results.length) {
        setDropdownOptions(
          results.map(
            (item: Movie) => `${item.title || item.name}-${item.id.toString()}`
          )
        );
        setDropdownMovieObjects(results);
      }
    }
  }, [debounced, data, loading]);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    const [movieTitle, movieId] = option.value.split("-");
    const handleRenderOption = (id: string) => {
      const result = dropdownMovieObjects.filter(
        (item: Movie) => item.id.toString() === id
      );

      setMoviesList(result);
    };

    return (
      <Group gap="sm" onClick={() => handleRenderOption(movieId)}>
        <div>
          <Text size="sm">{movieTitle}</Text>
        </div>
      </Group>
    );
  };

  return (
    <Autocomplete
      mt="md"
      data={dropdownOptions}
      comboboxProps={{ zIndex: 1000 }}
      value={value}
      placeholder="Search and Add a movie to the list"
      onChange={(value) => setValue(value.split("-")[0])}
      renderOption={renderAutocompleteOption}
    />
  );
};

export default FormAutocomplete;
