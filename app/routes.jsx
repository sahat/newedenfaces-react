var React = require('react');
var Router = require('react-router');

var App = require('./components/App.jsx');
var Home = require('./components/Home.jsx');
var Stats = require('./components/Stats.jsx');
var Character = require('./components/Character.jsx');
var CharacterList = require('./components/CharacterList.jsx');
var AddCharacter = require('./components/AddCharacter.jsx');

var Route = Router.Route;

module.exports = (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/stats' handler={Stats} />
    <Route path='/characters/:id' handler={Character} />
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
    <Route path='/shame' handler={CharacterList} />
    <Route path='/add' handler={AddCharacter} />
  </Route>
);