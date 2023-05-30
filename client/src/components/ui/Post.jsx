import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Post = ({ title, author, children, id, img }) => {
  const desc = children.substring(0, 140);

  const homeRoute = useLocation().pathname === '/';

  return (
    <div
      className={`${
        homeRoute ? "hover:scale-105" : ""
      } overflow-hidden transition-transform duration-300 rounded shadow-lg`}
    >
      <div className="w-full h-[200px] overflow-hidden">
        <img className="object-cover w-full h-full" src={img} alt="" />
      </div>
      <div className="flex flex-col gap-2 px-6 py-4 ">
        <div className="text-xl font-semibold"> {title} </div>
        {homeRoute && (
          <>
            <div className="text-gray-500 text-sm font-[300]">
              author - <span className="text-black "> {author}. </span>
            </div>
            <p className="text-base text-gray-700">{desc}...</p>
          </>
        )}
        <Link to={`/detail-blog/${id}`} className="hover:underline">
          read more.
        </Link>
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.number,
  img: PropTypes.string,
};

export default Post;
