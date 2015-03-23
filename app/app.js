var React = require('react');
var Router = require('react-router');

var App = require('./components/App.jsx');
var Navbar = require('./components/Navbar.jsx');
var CharacterList = require('./components/CharacterList.jsx');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
  render: function() {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">app</Link></li>
            <li><Link to="nav">nav</Link></li>
            <li><Link to="top">top</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='nav' handler={Navbar}/>
    <Route name='top' handler={CharacterList}/>
    <DefaultRoute handler={App}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
