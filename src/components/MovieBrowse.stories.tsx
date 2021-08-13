import { Meta } from "@storybook/react";
import MovieBrowse, { Movie } from "./MovieBrowse";
import { MovieListObj } from "../types";

const meta: Meta = {
  title: "MovieBrowse",
  component: MovieBrowse,
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

const lists: MovieListObj[] = [
  {
    id: "123456789",
    name: "List Title 1",
    movies: movies,
  },
  {
    id: "123456",
    name: "List Title 2",
    movies: movies,
  },
];

export const simple = () => (
  <MovieBrowse movies={movies} lists={lists} userSessionId={"hash"} />
);
