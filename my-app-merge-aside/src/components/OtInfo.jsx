// FILE: src/components/OtInfo.jsx
import React from "react";

const OtInfo = ({ texts }) => {
  return (
    <div>
      <h2>{texts.title}</h2>
      <p>{texts.body}</p>
    </div>
  );
};

export default OtInfo;
