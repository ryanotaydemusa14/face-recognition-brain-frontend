import React from "react";
import "./ImageLinkForms.css";

const ImageLinkForms = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="text f4">
        {`FACE RECOGNITION BRAIN`}
      </p>
      <div className="center pa2">
        <div className="form w-60 pa3 br3">
          <input className="f4 w-80" type="text" onChange={onInputChange} />
          <button
            className="light-gray pv2 ph3 bg-navy ba b--blue grow hover-bg-navy hover-white"
            onClick={onButtonSubmit}
          >
            DETECT FACE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForms;
