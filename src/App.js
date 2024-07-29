import "./App.css";
import React, { Component, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
const News = lazy(() => import("./components/News"));
export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<News category="top" />} />
              <Route path="/business" element={<News category="business" />} />
              <Route
                path="/entertainment"
                element={<News category="entertainment" />}
              />
              <Route path="/science" element={<News category="science" />} />
              <Route path="/sports" element={<News category="sports" />} />
              <Route path="/health" element={<News category="health" />} />
              <Route
                path="/technology"
                element={<News category="technology" />}
              />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </>
    );
  }
}
