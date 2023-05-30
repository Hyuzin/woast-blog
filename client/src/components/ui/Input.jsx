import PropTypes from "prop-types";

export const Input = ({
  className = "appearance-none focus:outline-none",
  ...rest
}) => {
  return <input className={className} {...rest} />;
};

Input.propTypes = {
  className: PropTypes.string,
};
