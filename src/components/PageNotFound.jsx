import React from "react";
export default function PageNotFound() {
  return (
    <>
      <div className="container text-center d-flex justify-content-center align-items-center flex-column" style={{minHeight:'80vh'}}>
        <h1>ERROR 404!</h1>
        <p>Your Page was Not Found Here!</p>
        <span><a href='/'>GO TO MAIN PAGE!</a></span>
      </div>
    </>
  );
}
