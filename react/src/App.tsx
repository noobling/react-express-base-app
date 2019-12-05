import { Container } from '@material-ui/core';
import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { useAuth0 } from './authService';
import Footer from './core/Footer';
import Navigation from './core/Navigation';
import PrivateRoute from './core/PrivateRoute';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Profile from './pages/Profile';
import history from './utils/history';
import ErrorHandler from './core/ErrorHandler';

const App: React.FC = () => {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router history={history}>
        <Navigation />

        <Container maxWidth="lg">
          <Switch>
            {isAuthenticated ? (
              <PrivateRoute path="/" exact component={Feed} />
            ) : (
              <Route path="/" exact component={Home}></Route>
            )}
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
        <Footer />
      </Router>
      <ErrorHandler />
    </>
  );
};

export default App;
