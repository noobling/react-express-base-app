import React, { useState, useEffect, useContext, ReactNode } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext<Auth0ContextData>({
  isAuthenticated: false,
  user: {},
  loading: false,
  popupOpen: false,
  loginWithPopup: () => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: () => {},
  loginWithRedirect: () => Promise.resolve(),
  getTokenSilently: () => Promise.resolve('placeholder'),
  getTokenWithPopup: () => {},
  logout: () => {}
});
export const useAuth0 = () => useContext(Auth0Context);

interface Auth0ProviderProps {
  children: ReactNode;
  onRedirectCallback: Function;
  options: Auth0ClientOptions;
}

export interface Auth0ContextData {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: Function;
  handleRedirectCallback: Function;
  getIdTokenClaims: Function;
  loginWithRedirect: (
    options?: RedirectLoginOptions | undefined
  ) => Promise<void>;
  getTokenSilently: () => Promise<any>;
  getTokenWithPopup: Function;
  logout: (options?: LogoutOptions) => void;
}

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  options
}: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(
        options as Auth0ClientOptions
      );
      setAuth0Client(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
  }, [onRedirectCallback, options]);

  // Can't do much if auth0 client didn't init
  if (!auth0Client) return null;

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (options?: getIdTokenClaimsOptions) =>
          auth0Client.getIdTokenClaims(options),
        loginWithRedirect: (options?: RedirectLoginOptions) =>
          auth0Client.loginWithRedirect(options),
        getTokenSilently: (options?: GetTokenSilentlyOptions) =>
          auth0Client.getTokenSilently(options),
        getTokenWithPopup: (options?: GetTokenWithPopupOptions) =>
          auth0Client.getTokenWithPopup(options),
        logout: (options?: LogoutOptions) => auth0Client.logout(options)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
