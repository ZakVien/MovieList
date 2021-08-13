import { useMutation, useQueryClient } from 'react-query'

interface DeleteListArgs {
  listId: string,
  userSessionId: string;
}

async function fetchDeleteList(args: DeleteListArgs): Promise<void> {
  const { listId, userSessionId } = args;
  const url = new URL(`https://api.themoviedb.org/3/list/${listId}`);
  url.searchParams.append("api_key", "56cadb8bb24ffc3ea1179620c8bbae8f");
  url.searchParams.append("session_id", userSessionId);
  
  
  await fetch(url.href, {
    method: "DELETE",
  });
}

export default function useDeleteList(args: DeleteListArgs){
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteListArgs>(() => fetchDeleteList(args), {onSuccess: () => {
    queryClient.invalidateQueries("user-lists");
  }});
}