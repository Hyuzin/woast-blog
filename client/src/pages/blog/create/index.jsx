import JoditEditor from "jodit-react";
import { useContext, useRef, useState } from "react";
import { Input } from "../../../components/ui/Input";
import { editorConfig } from "./editorConfig";
import { Upload } from "../../../components/ui/Upload";
import { AuthContext } from "../../../context/authContext";
import Button from "../../../components/ui/Button";
import moment from "moment";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const state = useLocation().state;
  const [content, setContent] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const { currentUser } = useContext(AuthContext);

  const editor = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFile(event.target.files[0]);
      };
      reader.readAsDataURL(file);
    } else {
      state
        ? setPreviewImage(`/upload/${state?.img}`)
        : setPreviewImage(null)
    }
  };

  const category = [
    { id: 1, name: "tech", label: "Tech" },
    { id: 2, name: "health", label: "Health & Fitness" },
    { id: 3, name: "lifestyle", label: "Lifestyle" },
    { id: 4, name: "finance", label: "Finance" },
    { id: 5, name: "education", label: "Education" },
    { id: 6, name: "travel", label: "Travel & Adventure" },
    { id: 7, name: "parenting", label: "Parenting" },
    { id: 8, name: "arts", label: "Arts & Culture" },
    { id: 9, name: "food", label: "Food & Cooking" },
    { id: 10, name: "inspiration", label: "Inspiration" },
    { id: 11, name: "news", label: "News & Politics" },
    { id: 12, name: "environment", label: "Environment" },
    { id: 13, name: "science", label: "Science & Tech" },
    { id: 14, name: "career", label: "Career" },
    { id: 15, name: "film", label: "Film & Entertainment" },
  ];

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "https://woast-blog-production.up.railway.app/api/upload",
        formData
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `https://woast-blog-production.up.railway.app/api/posts/${state.id}`,
            {
              title,
              desc: content,
              cat,
              img: file ? imgUrl : state?.img || '',
            },
            { withCredentials: true, credentials: "include" }
          )
        : await axios.post(
            `https://woast-blog-production.up.railway.app/api/posts/`,
            {
              title,
              desc: content,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true, credentials: "include" }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="flex flex-row gap-4">
      <div className="flex flex-col gap-4 w-[70%]">
        <div className="text-2xl font-medium text-center font-poppins">
          Create Blog Post
        </div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="input title here.."
          className="text-2xl font-normal text-center appearance-none focus:outline-none"
        />
        <div className="text-center text-gray-500 text-md">
          Author - <span className="text-black">{currentUser?.username}</span>.
        </div>
        <JoditEditor
          ref={editor}
          value={content}
          config={editorConfig}
          onBlur={(newContent) => setContent(newContent)}
        />
        <div className="p-4 mb-2 bg-white shadow-lg">
          <span className="text-2xl">Category</span>
          <div className="flex flex-wrap gap-2 py-3">
            {category.map((cats) => (
              <div key={cats.id} className="flex flex-row gap-2">
                <input
                  type="radio"
                  name="cats"
                  checked={cat === cats.name}
                  value={cats.name}
                  id={cats.name}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={cats.name}>{cats.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[30%] h-full mt-[135px] ">
        <Upload
          previewImage={
            state
              ? previewImage
                ? previewImage
                : `/upload/${state.img}`
              : previewImage
          }
          handleImageChange={handleImageChange}
        />

        <div className="p-3 py-4 mt-2 bg-white shadow-lg">
          <span className="text-2xl font-medium ">Publish</span>
          <div className="flex flex-col gap-3 pt-2 text-md">
            <span className="font-medium text-gray-700">
              status: <span className="font-normal text-black">draft</span>
            </span>
            <span className="font-medium text-gray-700">
              visibility: <span className="font-normal text-black">public</span>
            </span>
            <div className="flex flex-row justify-between">
              <Button>Save as draft</Button>
              <Button onClick={handleClick}>Publish</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateBlog;
