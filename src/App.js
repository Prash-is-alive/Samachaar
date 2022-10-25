import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Route,
} from "react-router-dom";
import Footer from './components/Footer';
export default class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Route exact path='/'>
          <News category="top" />
        </Route>
        <Route path='/business'>
          <News category="business" />
        </Route>
        <Route path='/entertainment'>
          <News category="entertainment" />
        </Route>
        <Route path='/technology'>
          <News category="technology" />
        </Route>
        <Route path='/health'>
          <News category="health" />
        </Route>
        <Route path='/science'>
          <News category="science" />
        </Route>
        <Route path='/sports'>
          <News category="sports" />
        </Route>
        <Footer/>
      </>
    )
  }
}


