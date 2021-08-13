import { MovieListObj } from '../types';
import { useQuery } from 'react-query';

interface ListAPIResponse {
  id: string,
  name: string
}

async function fetchUserLists (userSessionId: string): Promise<MovieListObj[]> {
  // Request 1 - Get account ID
  const accountUrl = new URL("https://api.themoviedb.org/3/account");
  accountUrl.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");
  accountUrl.searchParams.append("session_id", userSessionId)

  const response = await fetch(accountUrl.href);
  const account = await response.json();

  // Request 2 - Get lists for the account ID
  const listsUrl = new URL(`https://api.themoviedb.org/3/account/${account.id}/lists`);
  listsUrl.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");
  listsUrl.searchParams.append("session_id", userSessionId)

  const listsResponse = await fetch(listsUrl.href);
  const listsResponseObj = await listsResponse.json();

  const lists = listsResponseObj.results.map((list: ListAPIResponse) => {
    return {
      id: list.id,
      name: list.name,
      movies: []
    }
  })
  return lists;
}

export default function useLists(userSessionId: string) {
  return useQuery<MovieListObj[], Error>("user-lists", () => fetchUserLists(userSessionId));
}