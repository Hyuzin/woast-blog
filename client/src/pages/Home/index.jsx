import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import Post from "../../components/ui/Post";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/posts${cat}`
        );
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  return (
    <section>
      <div className="grid grid-cols-2 gap-5 px-5 pb-10 md:grid-cols-3">
        {posts.map((post) => (
          <Post
            key={post.id}
            img={`/upload/${post.img}`}
            id={post.id}
            title={post.title}
            author={post.username}
          >
            {getText(post.desc)}
          </Post>
        ))}
      </div>
      <div className="flex justify-center gap-10">
        <Button>&larr; previous</Button>
        <Button>next &rarr;</Button>
      </div>
    </section>
  );
};
