export const FormInput = ({...props}) => {
  return (
    <input
      {...props}
      className="appearance-none bg-gray-100  hover:shadow rounded w-[250px] py-2 px-4 text-gray-700 leading-tight outline-none transition-all duration-200 focus:shadow focus:bg-white"
    />
  );
};
