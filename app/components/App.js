import React from 'react';
import {RouteHandler} from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;