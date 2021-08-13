import { Movie } from "./components/MovieBrowse";

export const movies: Movie[] = [
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
  {
    id: "5",
    title: "Twilight",
    rating: "PG-13",
    runTime: "2hr 59min",
  },
];

export const mockLists = [
  {
    id: "1",
    name: "Want to Watch",
    movies: movies/*["1", "2"]*/,
  },
  {
    id: "2",
    name: "Watched - Hated",
    movies: movies/*["3"]*/,
  },
  {
    id: "3",
    name: "Watched - Meh",
    movies: movies/*["4", "2"]*/,
  },
  {
    id: "4",
    name: "Watched - Loved",
    movies: movies/*["5"]*/,
  },
];
