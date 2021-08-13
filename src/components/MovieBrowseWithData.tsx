import React, { ReactElement } from "react";
import MovieBrowse from "./MovieBrowse";
import usePopularMovies from "../hooks/usePopularMovies";
import useLists from "../hooks/useLists";

interface MovieBrowseWithDataProps {
  userSessionId: string;
}
export default function MovieBrowseWithData(
  props: MovieBrowseWithDataProps
): ReactElement {
  const { userSessionId } = props;
  const { data: lists = [] } = useLists(userSessionId);
  const { data: movies = [], error, isLoading } = usePopularMovies();

  if (error != null) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (movies == null || movies.length === 0) {
    return <p>No movies</p>;
  }

  return (
    <MovieBrowse movies={movies} lists={lists} userSessionId={userSessionId} />
  );
}
