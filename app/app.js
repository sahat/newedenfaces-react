var React = require('react');
var Router = require('react-router');

var App = require('./components/App.jsx');
var Home = require('./components/Home.jsx');
var Navbar = require('./components/Navbar.jsx');
var Footer = require('./components/Footer.jsx');
var CharacterList = require('./components/CharacterList.jsx');
var AddCharacter = require('./components/AddCharacter.jsx');
var Stats = require('./components/Stats.jsx');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route path='/' handler={App}>
    <Route name='home' path='/' handler={Home} />
    <Route name='stats' handler={Stats} />
    <Route name='top' handler={CharacterList}>
      <Route path=':race' handler={CharacterList}>
        <Route path=':bloodline' handler={CharacterList} />
      </Route>
    </Route>
    <Route name='female' path='top/:race/:bloodline' handler={CharacterList} />
    <Route name='male' path='top/:race/:bloodline' handler={CharacterList} />
    <Route name='add' handler={AddCharacter} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
