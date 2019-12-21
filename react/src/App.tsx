import { Container } from '@material-ui/core';
import React, { Suspense, lazy } from 'react';
import { Route, Router, Switch } from 'react-router';
import { useAuth0 } from './authService';
import Footer from './core/Footer';
import Navigation from './core/Navigation';
import PrivateRoute from './core/PrivateRoute';
import history from './utils/history';
import ErrorHandler from './core/ErrorHandler';

const Feed = lazy(() => import('./pages/Feed'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));

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
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {isAuthenticated ? (
                <PrivateRoute path="/" exact component={Feed} />
              ) : (
                <Route path="/" exact component={Home}></Route>
              )}
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Suspense>
        </Container>
        <Footer />
      </Router>
      <ErrorHandler />
    </>
  );
};

export default App;
