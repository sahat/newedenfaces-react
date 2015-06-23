import React from 'react';
import {Route, NotFoundRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import AddCharacter from './components/AddCharacter';
import NotFound from './components/404';

export default (
  <Route handler={App}>
    <NotFoundRoute handler={NotFound}/>
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