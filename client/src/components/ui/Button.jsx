import PropTypes from "prop-types";

const Button = ({
  children = "button",
  className = "hover:bg-black hover:text-white transition-colors border-[1px] rounded px-2 border-black py-1",
  onClick,
  ...rest
}) => {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
