import { Analytics } from "@vercel/analytics/react";
import { Suspense, lazy } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Modelo1 from "./pages/modelo-1.tsx";

// Carregado sob demanda: a 404 quase nunca é vista (o site tem uma única
// rota real, "/"), então não vale trazer ui/button + ui/card pro bundle
// principal só por causa dela.
const NotFound = lazy(() => import("@/pages/NotFound"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Modelo1} />
      <Route>
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Router />
        <Analytics />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
