import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { MovieListObj } from "../types";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  ListItemSecondaryAction,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import useDeleteList from "../hooks/useDeleteList";

interface MovieListProps {
  lists: MovieListObj[];
  userSessionId: string;
}

export default function MovieLists(props: MovieListProps) {
  const { lists, userSessionId } = props;
  const [selectedList, setSelectedList] = useState("");
  const [remove, setRemove] = useState(false);

  const mutation = useDeleteList({
    listId: selectedList,
    userSessionId: userSessionId,
  });

  const handleDeleteClick = (listId: string) => {
    setSelectedList(listId);
    setRemove(true);
  };

  useEffect(() => {
    if (remove) {
      mutation.mutate({
        listId: selectedList,
        userSessionId: userSessionId,
      });
      setRemove(false);
    }
  }, [mutation, remove, selectedList, userSessionId]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Lists</Typography>
        </Toolbar>
      </AppBar>
      <List component="nav" aria-label="movie lists">
        {lists.map((list) => {
          return (
            <ListItem
              button
              component={Link}
              to={`/lists/${list.id}`}
              key={list.id}
            >
              <ListItemText primary={list.name} />
              <ListItemSecondaryAction>
                <Button
                  color="secondary"
                  onClick={() => handleDeleteClick(list.id)}
                >
                  Delete List
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
