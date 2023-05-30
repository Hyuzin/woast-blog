import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Other } from "./Other";
import HTMLReactParser from 'html-react-parser'

const DetailBlog = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/posts/${postId}`
        );
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/posts/${postId}`, {
        withCredentials: true,
        credentials: "include",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(post.img)

  return (
    <section className="flex flex-row gap-5">
      <div className="flex flex-col gap-5 w-[70%]">
        <div className="flex flex-row items-center gap-5">
          <h1 className="font-medium"> {post.title} </h1>
          <span className="text-sm text-gray-400">
            | author - {post.username}{" "}
          </span>
          {currentUser?.username === post.username && (
            <>
              <Link to={`/create-blog?edit=2`} state={post}>edit</Link>
              <button onClick={handleDelete}>delete</button>
            </>
          )}
        </div>
        <div className="w-full h-[400px] ">
          <img
            src={`/upload/${post.img}`}
            alt="image"
            className="object-cover w-full h-full rounded"
          />
        </div>
        <div className="flex flex-col gap-5 text-lg">{HTMLReactParser(`${post.desc}`)}</div>
      </div>
      <Other cat={post.cat}/>
    </section>
  );
};

export default DetailBlog;
