"use client"
import React, {useState, useEffect} from 'react';
import { AxiomPosts, Post } from '@/lib/data';
import { PrintEndpoint } from '@/components'
import { api } from '@/lib/api';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    api.get<AxiomPosts>('/api/example').then((response) => {
      console.log(response.data);
      setPosts(response.data.posts)
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <main>
      {
        posts ? posts.map(post => {
          return (
            <PrintEndpoint
            id={post.id}
            title={post.title}
            desc={post.desc}
            />
          )
        }) : ''
      }
    </main>
  )
}
