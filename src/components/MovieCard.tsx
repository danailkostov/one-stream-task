import { ActionIcon, Card, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useMoviesStore } from "../store";

type MovieCardProps = {
  id: number;
  title: string;
};

const MovieCard = ({ title, id }: MovieCardProps) => {
  const deleteMovie = useMoviesStore((state) => state.deleteMovie);

  return (
    <Card withBorder shadow="sm" padding="lg">
      <Group justify="space-between">
        {title}
        <ActionIcon
          variant="light"
          color="red"
          aria-label="remove movie"
          onClick={() => deleteMovie(id)}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default MovieCard;
