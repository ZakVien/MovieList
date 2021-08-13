import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { MovieListObj } from "../types";
import useRemoveFromList from "../hooks/useRemoveFromList";
import { useEffect, useState } from "react";

export interface MovieListProps {
  list: MovieListObj;
  userSessionId: string;
}

export default function MovieList(props: MovieListProps) {
  const { list, userSessionId } = props;
  const [selectedList, setSelectedList] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [remove, setRemove] = useState(false);

  const mutation = useRemoveFromList({
    listId: selectedList,
    movieId: selectedMovie,
    userSessionId: userSessionId,
  });

  const handleRemoveClick = (listId: string, movieId: string) => {
    setSelectedList(listId);
    setSelectedMovie(movieId);
    setRemove(true);
  };

  useEffect(() => {
    if (remove) {
      mutation.mutate({
        listId: selectedList,
        movieId: selectedMovie,
        userSessionId: userSessionId,
      });
      setRemove(false);
    }
  }, [mutation, remove, selectedList, selectedMovie, userSessionId]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            component={Link}
            to="/lists"
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6">{list.name}</Typography>
        </Toolbar>
      </AppBar>
      <List>
        {list.movies.map((movie) => (
          <ListItem button key={movie.id}>
            <ListItemText
              primary={movie.title}
              secondary={`${movie.rating} | ${movie.runTime}`}
            />
            <ListItemSecondaryAction>
              <Button
                color="secondary"
                onClick={() => handleRemoveClick(list.id, movie.id)}
              >
                Remove from List
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
