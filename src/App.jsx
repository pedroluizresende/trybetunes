import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import styles from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={ styles.app }>
        <Switch>
          <Route exact path="/trybetunes" component={ Login } />
          <Route exact path="/trybetunes/search" component={ Search } />
          <Route exact path="/trybetunes/album/:id" component={ Album } />
          <Route exact path="/trybetunes/favorites" component={ Favorites } />
          <Route exact path="/trybetunes/profile" component={ Profile } />
          <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
          <NotFound />

        </Switch>
      </div>
    );
  }
}

export default App;
