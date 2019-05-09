import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {imageUrl && (
          <img
            id="inputImage"
            src={imageUrl}
            alt="upload pic"
            width="500px"
            height="auto"
          />
        )}
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            left: box.leftCol,
            right: box.rightCol,
            bottom: box.bottomRow
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
