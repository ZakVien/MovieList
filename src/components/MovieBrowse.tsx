import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { AppBar, Toolbar } from "@material-ui/core";
import { MovieListObj } from "../types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import useAddToList from "../hooks/useAddToList";

export interface Movie {
  id: string;
  title: string;
  rating: string;
  runTime: string;
}

interface MovieBrowseProps {
  movies: Movie[];
  lists: MovieListObj[];
  userSessionId: string;
}
export interface DialogProps {
  open: boolean;
  selectedMovie: string;
  onClose: (value: string) => void;
  lists: MovieListObj[];
  userSessionId: string;
}

function OpenDialog(props: DialogProps) {
  const { onClose, selectedMovie, open, lists, userSessionId } = props;
  const [selectedList, setSelectedList] = useState("");
  const [remove, setRemove] = useState(false);

  const mutation = useAddToList({
    listId: selectedList,
    movieId: selectedMovie,
    userSessionId: userSessionId,
  });

  // Wait for state to change
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

  const handleClose = () => {
    onClose(selectedList);
    onClose(selectedMovie);
  };

  const handleListItemClick = (listId: string) => {
    onClose(listId);
    setSelectedList(listId);
    setRemove(true);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose a list</DialogTitle>
      <List>
        {lists.map((list) => (
          <ListItem
            button
            onClick={() => handleListItemClick(list.id)}
            key={list.id}
          >
            <ListItemText primary={list.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function MovieBrowse(props: MovieBrowseProps) {
  const { movies, lists, userSessionId } = props;

  const [open, setOpen] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState("1");

  const handleItemClick = (movie: Movie) => {
    alert(movie.title);
  };

  const handleClickOpen = (movieId: string) => {
    setOpen(true);
    setSelectedMovie(movieId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Browse</Typography>
        </Toolbar>
      </AppBar>
      <List component="nav" aria-label="browse-movies">
        {movies.map((movie) => (
          <ListItem
            button
            key={movie.id}
            onClick={() => handleItemClick(movie)}
          >
            <ListItemText
              primary={movie.title}
              secondary={`${movie.rating} | ${movie.runTime}`}
            />
            <ListItemSecondaryAction>
              <Button color="primary" onClick={() => handleClickOpen(movie.id)}>
                Add to List
              </Button>
              <OpenDialog
                selectedMovie={selectedMovie}
                open={open}
                onClose={handleClose}
                lists={lists}
                userSessionId={userSessionId}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
