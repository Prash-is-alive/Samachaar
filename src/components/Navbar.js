import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar sticky-top navbar-expand-lg bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand d-md-none d-inline" to="/">
              <i className="bi bi-newspaper"></i> Samachaar
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto text-md-center text-left">
                <li className="nav-item">
                  <NavLink className={"nav-link"} to="/science">
                    <i className="bi bi-radioactive" /> Science
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to="/health">
                    <i className="bi bi-hospital" /> Health
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to="/technology">
                    <i className="bi bi-cpu" /> Technology
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to="/business">
                    <i className="bi bi-briefcase" /> Business
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to="/sports">
                    <i className="bi bi-1-circle" /> Sports
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={"nav-link"} to="/entertainment">
                    <i className="bi bi-laptop" /> Entertainment
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
