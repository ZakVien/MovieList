import { useQuery } from 'react-query';
import { Movie, MovieListObj } from './../types';

interface MovieData {
  id: string;
  title: string;
}
interface MovieRelease {
  certification: string;
  iso_3166_1: string;
  primary: boolean;
  release_date: string;
}
interface MovieReleases {
  countries: MovieRelease[];
}
interface SingleMovieResponse {
  id: string;
  releases: MovieReleases;
  runtime: number;
  title: string;
}


async function fetchMovie(firstFetchMovieData: MovieData) {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${firstFetchMovieData.id}`
  );
  url.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");
  url.searchParams.append("append_to_response", "releases");
  const response = await fetch(url.href);
  const responseObj: SingleMovieResponse = await response.json();
  const unitedStatesRelease = responseObj.releases.countries.find(
    (release) => release.iso_3166_1 === "US"
  );
  let rating = "Not Rated";  
  if (unitedStatesRelease != null && unitedStatesRelease.certification !== "") {
    rating = unitedStatesRelease.certification;
  }
  const runTimeHours = Math.floor(responseObj.runtime / 60)
  const runTimeMins = responseObj.runtime % 60
  return {
    id: responseObj.id,
    rating,
    runTime: `${runTimeHours}h ${runTimeMins}m`,
    title: responseObj.title,
  } as Movie;
}

async function fetchUserList (userListId: string): Promise<MovieListObj> {
  const listUrl = new URL(`https://api.themoviedb.org/3/list/${userListId}`);
  listUrl.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");

  const response = await fetch(listUrl.href);
  const responseObj  = await response.json();
  
  // Return if private or invalid list 
  // to prevent additional attempts & continuous console errors
  if (responseObj.status_code === 34){
    return {
      id: "",
      name: "",
      movies: [],
    }
  }
  
  const movies = await Promise.all<Movie>(responseObj.items.map(fetchMovie));

  const userList = {
      id: responseObj.id,
      name: responseObj.name,
      movies: movies,
    }

  return userList;
}

export default function useList(userListId: string) {
  return useQuery<MovieListObj, Error>("user-list", () => fetchUserList(userListId));
}
