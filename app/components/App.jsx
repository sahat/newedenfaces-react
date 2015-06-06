var React = require('react');
var Router = require('react-router');

var Navbar = require('./Navbar');
var Footer = require('./Footer');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <html>
      <head>
        <meta charSet='utf-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <title>New Eden Faces</title>
        <link rel='shortcut icon' href='/favicon.png'/>
        <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900'/>
        <link rel='stylesheet' href='/css/main.css'/>
      </head>
      <body>
        <Navbar />
        <RouteHandler />
        <Footer />
        <script src='/socket.io/socket.io.js'></script>
        <script src='/js/vendor.js'></script>
        <script src='/js/bundle-vendor.js'></script>
        <script src='/js/bundle.js'></script>
      </body>
      </html>
    );
  }
});

module.exports = App;