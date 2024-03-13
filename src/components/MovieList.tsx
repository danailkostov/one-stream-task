import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Grid, GridCol } from "@mantine/core";
import { useMoviesStore } from "../store";
import MovieCard from "./MovieCard";
import { MovieType as Movie } from "./types";

const MovieList = () => {
  const movies = useMoviesStore((state) => state.movieList);
  const reorderMovies = useMoviesStore((state) => state.reorderMovies);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    const shallowMovies = [...movies];
    const draggedMovie = shallowMovies[source.index];
    console.log(shallowMovies);

    shallowMovies.splice(source.index, 1);
    shallowMovies.splice(destination.index, 0, draggedMovie);
    console.log(shallowMovies);

    reorderMovies(shallowMovies);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="vertical">
        {(provided) => (
          <Grid {...provided.droppableProps} ref={provided.innerRef}>
            {movies.map((movie: Movie, index) => (
              <Draggable
                draggableId={`${movie.id}`}
                index={index}
                key={`${movie.id}`}
              >
                {(provided) => (
                  <GridCol
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <MovieCard
                      key={index}
                      id={movie.id}
                      title={movie.name || movie.title}
                    />
                  </GridCol>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MovieList;
