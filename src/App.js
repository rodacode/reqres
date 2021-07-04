import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import List from './pages/List'
import PageNotFound from './pages/PageNotFound'
import Error500Page from './pages/Error500Page'

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Router>
          <Box d="flex" m="4" flexDirection="row" flexWrap="wrap" justifyContent="flex-end" alignItems="center">
            <ColorModeSwitcher />
          </Box>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/list">
              <List />
            </Route>
            <Route exact path="/error500">
              <Error500Page />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
