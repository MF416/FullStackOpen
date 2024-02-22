import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button 
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          onClick={toggleVisibility}
          >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button 
          className="inline-block shrink-0 rounded-md border border-gray-500 bg-gray-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-500 focus:outline-none focus:ring active:text-gray-500"
          onClick={toggleVisibility}
          >cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
