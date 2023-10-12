import { Post, getPostById, getPosts } from '@/lib/data';
import { PrintEndpoint } from '@/components'

export default function Home() {
  const posts: Post[] = getPosts();
  const post = getPostById('f082af07-3d5d-4b56-b7f9-9d098af4c050') as Post;

  return (
    <main className="overflow-hidden">
      {
        posts.map(post => {
          return (
            <PrintEndpoint
            id={post.id}
            title={post.title}
            desc={post.desc}
            />
          )
        }) 
      }
      <PrintEndpoint
        id={post.id}
        title={post.title}
        desc={post.desc}
      />
    </main>
  )
}
