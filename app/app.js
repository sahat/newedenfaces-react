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
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/stats' handler={Stats} />
    <Route path='/top' handler={CharacterList}>
      <Route path=':race' handler={CharacterList}>
        <Route path=':bloodline' handler={CharacterList} />
      </Route>
    </Route>
    <Route path='/female' handler={CharacterList}>
      <Route path=':race' handler={CharacterList}>
        <Route path=':bloodline' handler={CharacterList} />
      </Route>
    </Route>
    <Route path='/male' handler={CharacterList}>
      <Route path=':race' handler={CharacterList}>
        <Route path=':bloodline' handler={CharacterList} />
      </Route>
    </Route>
    <Route path='/add' handler={AddCharacter} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
