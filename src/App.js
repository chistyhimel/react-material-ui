import { ThemeProvider } from "@material-ui/styles";
import Header from "./components/Header";
import theme from "./theme";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Switch>
            <Route exact component={() => <div>Home</div>} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
