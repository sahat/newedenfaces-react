import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import AddCharacter from './components/AddCharacter';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/stats' handler={Stats} />
    <Route path='/characters/:id' handler={Character} />
    <Route path='/add' handler={AddCharacter} />
    <Route path=':category' handler={CharacterList}>
      <Route path=':race' handler={CharacterList}>
        <Route path=':bloodline' handler={CharacterList} />
      </Route>
    </Route>
  </Route>
);
