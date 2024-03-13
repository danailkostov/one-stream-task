import { Box, Container, Flex } from "@mantine/core";
import GenreSelect from "../components/GenreSelect";
import LanguageSelect from "../components/LanguageSelect";
import MovieList from "../components/MovieList";
import Form from "../components/Form";
import { useMoviesStore } from "../store";

const MainContent = () => {
  const movies = useMoviesStore((state) => state.movieList);

  return (
    <Container size="xs" mt={250}>
      <Box mx="auto">
        {!!movies.length && (
          <>
            <Flex justify="space-between">
              <GenreSelect />
              <LanguageSelect />
            </Flex>
          </>
        )}
        <Form />
      </Box>
      <MovieList />
    </Container>
  );
};

export default MainContent;
