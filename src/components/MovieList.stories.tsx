import { Meta } from "@storybook/react/types-6-0";
import MovieList from "./MovieList";
import { Movie, MovieListObj } from "../types";

const meta: Meta = {
  title: "MovieList",
  component: MovieList,
};
export default meta;

const movies: Movie[] = [
  {
    id: "1",
    title: "Airplane",
    rating: "PG",
    runTime: "1hr 28min",
  },
  {
    id: "2",
    title: "Scary Movie",
    rating: "PG-13",
    runTime: "1hr 47min",
  },
  {
    id: "3",
    title: "Saving Private Ryan",
    rating: "R",
    runTime: "3hr 52min",
  },
  {
    id: "4",
    title: "Lord of the Rings",
    rating: "R",
    runTime: "2hr 7min",
  },
];

const list: MovieListObj = {
  id: "555",
  name: "My List",
  movies: movies,
};

export const simple = () => <MovieList list={list} userSessionId={"123"} />;
