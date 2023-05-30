import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../../components/ui/Post";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export const Other = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/posts/?cat=${cat}`
        );
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [cat]);
  return (
    <>
      <div className="w-[30%] flex flex-col gap-6">
        <h1 className="text-2xl font-medium">Other post you may like.</h1>
        {posts.filter(post => post.id != postId).map((post) => (
          <Post
            key={post.id}
            img={`/upload/${post.img}`}
            id={post.id}
            title={post.title}
          >
            {post.desc}
          </Post>
        ))}
      </div>
    </>
  );
};

Other.propTypes = {
  cat: PropTypes.string,
};
