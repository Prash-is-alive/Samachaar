import React, { Component } from "react";
export class Spinner extends Component {
  render() {
    return (
      <div className="container d-flex justify-content-around flex-wrap align-items-end">
        <div
          className="card my-3"
          aria-hidden={true}
          style={{ width: "18rem" }}
        >
          <svg
            className="bd-placeholder-img card-img-top"
            width="100%"
            height="180"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#868e96"></rect>
          </svg>
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
            <button
              tabIndex="-1"
              className="btn btn-primary disabled placeholder col-6 readBtn"
            ></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
