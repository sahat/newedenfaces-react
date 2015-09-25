import React from 'react';
import {RouteHandler} from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <RouteHandler {...this.props}/>
        <Footer />
      </div>
    );
  }
}

export default App;
