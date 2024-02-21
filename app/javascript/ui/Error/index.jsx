import React from "react";

function Error({ message }) {
  if (!message) {
    return <></>;
  }

  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}

export default Error;
