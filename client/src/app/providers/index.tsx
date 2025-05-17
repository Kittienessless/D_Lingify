import { createContext, FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider } from "entities/theme";
import { Fallback } from "shared/ui/fallback";
import Store from "app/store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface State {
  store: Store;
}
const store = new Store();

export const UserContext = createContext<State>({
  store,
});
interface IProviders {
  /** Content that will be wrapped by providers. */
  readonly children: JSX.Element;
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <GoogleOAuthProvider clientId='828518137348-jb6pvrgo4cl86ddi102kiitdg52137ca.apps.googleusercontent.com'>
        <ThemeProvider>
          <UserContext.Provider value={{ store }}>
            {children}
          </UserContext.Provider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
};
