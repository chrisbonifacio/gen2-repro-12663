"use client";

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";

import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";

Amplify.configure(config);

const client = generateClient<Schema>();

type CommunityPost = Schema["CommunityPost"];

export default function Home() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);

  const createPost = async (): Promise<CommunityPost> => {
    const { data: posts } = await client.models.CommunityPost.create({
      pictures: ["value 1", "value 2"],
    });

    console.log(posts);

    return posts;
  };

  const listPosts = async (): Promise<CommunityPost[]> => {
    const { data: posts } = await client.models.CommunityPost.list({
      selectionSet: ["id", "createdAt", "pictures", "updatedAt"],
    });

    console.log(posts);

    return posts;
  };

  useEffect(() => {
    listPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <button
        className="bg-purple-600 p-2 rounded-sm text-white font-semibold hover:text-black hover:bg-purple-300 ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110"
        onClick={createPost}
      >
        Create Post
      </button>
      <div className="mt-8">
        <h3 className="text-2xl">
          <strong>Posts</strong>
        </h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <pre>{JSON.stringify(post.pictures, null, 2)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
