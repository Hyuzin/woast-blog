import { Input } from "./Input";
import PropTypes from 'prop-types'

export const Upload = ({previewImage, handleImageChange}) => {
  
  // const [src, setSrc] = useState("");
  return (
    <div>
      <div className="relative w-full mx-auto h-[200px] group ">
        {!previewImage && (
          <div className="group-hover:bg-gray-400 transition-colors w-full h-full flex items-center justify-center bg-gray-300 border-[2px] border-dashed group-hover:border-gray-700 border-gray-400 rounded text-xl font-medium text-gray-600">
            UPLOAD IMAGE
          </div>
        )}
        {previewImage && (
          <div className="flex items-center justify-center w-full h-full bg-black rounded">
            <img
              src={previewImage}
              alt="Upload"
              className="absolute object-cover w-full h-full transition-opacity rounded group-hover:opacity-75"
            />
            <span className="relative text-xl font-semibold text-white transition-opacity opacity-0 group-hover:opacity-100">
              CHANGE IMAGE
            </span>
          </div>
        )}
        <Input
          type="file"
          className="absolute inset-0 opacity-0"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

Upload.propTypes = {
  previewImage: PropTypes.string,
  handleImageChange: PropTypes.func,
}
