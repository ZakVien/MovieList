import { Meta } from "@storybook/react/types-6-0";
import MovieLists from "./MovieLists";
import { mockLists } from "../data";

const meta: Meta = {
  title: "MovieLists",
  component: MovieLists,
};
export default Meta;

export const simple = () => (
  <MovieLists lists={mockLists} userSessionId={"123"} />
);
