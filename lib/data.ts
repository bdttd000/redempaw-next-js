export interface Post {
  id: string;
  title: string;
  desc: string;
}

let posts: Post[] = [
  {
    id: "f082af07-3d5d-4b56-b7f9-9d098af4c050",
    title: "Title of first example",
    desc: "Description fo first example",
  },
  {
    id: "e6caec4e-31c3-40b6-87c3-bc96c60d0fbb",
    title: "Title of second example",
    desc: "Description fo second example",
  },
  {
    id: "75589047-13a6-41e4-a0e0-eefe504bc5ab",
    title: "Title of third example",
    desc: "Description fo third example",
  },
];

export const getPosts = () => posts;

export const getPostById = (id: string) => {
  return posts.find((post) => post.id === id);
};
