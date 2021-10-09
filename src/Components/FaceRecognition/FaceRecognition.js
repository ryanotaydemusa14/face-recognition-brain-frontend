import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div>
      <div className="">
        {" "}
        <img id="pic" className="image" src={imageURL} alt="" />
        <div className="box" style={{ height: box.h }}>
          {/* <div className="sample"></div> */}

          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
  
};

export default FaceRecognition;
