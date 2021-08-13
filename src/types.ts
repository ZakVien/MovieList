export interface MovieListObj {
  id: string;
  name: string;
  movies: Movie[];
}

export interface Movie {
  id: string;
  title: string;
  rating: string;
  runTime: string;
}