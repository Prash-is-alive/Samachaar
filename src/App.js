import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News pageSize={10} category="general" />} />
        </Routes>
        <Routes>
          <Route exact path='/business' element={<News pageSize={10} category="business" />} />
        </Routes>
        <Routes>
          <Route exact path='/entertainment' element={<News pageSize={10} category="entertainment" />} />
        </Routes>
        <Routes>
          <Route exact path='/health' element={<News pageSize={10} category="health" />} />
        </Routes>
        <Routes>
          <Route exact path='/science' element={<News pageSize={10} category="science" />} />
        </Routes>
        <Routes>
          <Route exact path='/sports' element={<News pageSize={10} category="sports" />} />
        </Routes>
        <Routes>
          <Route exact path='/technology' element={<News pageSize={10} category="technology" />} />
        </Routes>
      </>
    )
  }
}


