import "./App.css";
import React, { Component, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";
const News = lazy(() => import("./components/News"));
export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Suspense fallback={<div>loading...</div>} />
        <Route exact path="/">
          <News category="top" />
        </Route>
        <Route exact path="/business">
          <News category="business" />
        </Route>
        <Route exact path="/entertainment">
          <News category="entertainment" />
        </Route>
        <Route exact path="/technology">
          <News category="technology" />
        </Route>
        <Route exact path="/health">
          <News category="health" />
        </Route>
        <Route exact path="/science">
          <News category="science" />
        </Route>
        <Route exact path="/sports">
          <News category="sports" />
        </Route>
        <Footer />
      </>
    );
  }
}
