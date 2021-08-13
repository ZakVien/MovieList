import MovieList from "./MovieList";
import { useParams } from "react-router-dom";
import useList from "../hooks/useList";

interface MovieListURLParams {
  id: string;
}
interface MovieListWithDataProps {
  userSessionId: string;
}

export default function MovieListWithData(props: MovieListWithDataProps) {
  const { id } = useParams<MovieListURLParams>();
  const { userSessionId } = props;
  const { data: list } = useList(id);

  if (list == null || list.movies.length === 0) {
    return (
      <p>You don't have any movies in this list or this list is private.</p>
    );
  }

  return <MovieList list={list} userSessionId={userSessionId} />;
}
