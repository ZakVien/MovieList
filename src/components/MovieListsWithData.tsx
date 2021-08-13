import React, { ReactElement } from "react";
import MovieLists from "./MovieLists";
import useLists from "../hooks/useLists";

interface MovieListsWithDataProps {
  userSessionId: string;
}

export default function MovieListsWithData(
  props: MovieListsWithDataProps
): ReactElement {
  const { userSessionId } = props;
  const { data: lists = [] } = useLists(userSessionId);

  return <MovieLists lists={lists} userSessionId={userSessionId} />;
}
