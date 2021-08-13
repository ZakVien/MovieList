import { useMutation, useQueryClient } from 'react-query'

interface RemoveFromUserListArguments {
  listId: string,
  movieId: string;
  userSessionId: string;
}

async function fetchRemoveFromUserList(args: RemoveFromUserListArguments): Promise<void> {
  const { listId, movieId, userSessionId } = args;
  const url = new URL(`https://api.themoviedb.org/3/list/${listId}/remove_item`);
  url.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");
  url.searchParams.append("session_id", userSessionId);

  await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      media_id: movieId,
    }),
  });
}

export default function useAddToList(args: RemoveFromUserListArguments){
  const queryClient = useQueryClient();
  return useMutation<void, Error, RemoveFromUserListArguments>(() => fetchRemoveFromUserList(args), {onSuccess: () => {
    queryClient.invalidateQueries("user-list");
  }});
}